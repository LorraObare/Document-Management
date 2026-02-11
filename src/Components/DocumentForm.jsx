import React, { useEffect, useState } from "react";

function DocumentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    id_number: "",
    service: "",
    service_type: "",
    comment: ""
  });

  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch submissions from backend
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get_submissions.php");
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data);
      } else {
        setError("Failed to load submissions.");
      }
    } catch (err) {
      setError("Server error while fetching submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const services = { /* keep your full services object exactly as is */ };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const serialNumber = `SER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const submission = {
      ...formData,
      serial_number: serialNumber
    };

    try {
      const response = await fetch("/api/submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      });

      const result = await response.json();

      if (result.success) {
        alert("Form submitted successfully.");

        setFormData({
          name: "",
          phone: "",
          id_number: "",
          service: "",
          service_type: "",
          comment: ""
        });

        fetchSubmissions(); // 🔹 refresh table
      } else {
        setError(result.message || "Submission failed.");
      }
    } catch (err) {
      setError("Error submitting form.");
    }
  };

  return (
    <div className="document-form-container">
      <form className="document-form" onSubmit={handleSubmit}>
        <h2>Document Submission Form</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />

        <label>Client Phone Number</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
        />

        <label>Client ID Number</label>
        <input
          type="text"
          value={formData.id_number}
          onChange={(e) =>
            setFormData({ ...formData, id_number: e.target.value })
          }
          required
        />

        <label>Select Service</label>
        <select
          value={formData.service}
          onChange={(e) =>
            setFormData({
              ...formData,
              service: e.target.value,
              service_type: ""
            })
          }
          required
        >
          <option value="">Select a service</option>
          {Object.entries(services).map(([key, service]) => (
            <option key={key} value={key}>
              {service.label}
            </option>
          ))}
        </select>

        {formData.service &&
          services[formData.service]?.types && (
            <>
              <label>Select Type</label>
              <select
                value={formData.service_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service_type: e.target.value
                  })
                }
                required
              >
                <option value="">Select a type</option>
                {Object.entries(
                  services[formData.service].types
                ).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.label}
                  </option>
                ))}
              </select>
            </>
          )}

        <label>Comment</label>
        <textarea
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>

      <h2>Client Submissions</h2>

      <input
        type="text"
        placeholder="Search by Name, Serial or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading submissions...</p>}

      <table className="submissions-table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.serial_number}</td>
                <td>{item.name}</td>
                <td>{item.id_number}</td>
                <td>
                  <button onClick={() => setExpandedClientId(item.id)}>
                    View
                  </button>
                </td>
              </tr>

              {expandedClientId === item.id && (
                <tr>
                  <td colSpan="4">
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Service:</strong> {item.service}</p>
                    <p><strong>Service Type:</strong> {item.service_type}</p>
                    <p><strong>Comment:</strong> {item.comment}</p>
                    <button onClick={() => setExpandedClientId(null)}>
                      Close
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentForm;
