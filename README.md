NTSA Document Management System (DMS)

This Document Management System (DMS) was developed by the attachment team at the National Transport and Safety Authority (NTSA) to improve the handling, tracking, and communication of client-submitted documents during service processing.


Project Overview

The system is designed to:
- Digitize the process of recording client details and submitted documents.
- Improve transparency in how documents are handled across departments.
- Enable faster communication with clients through SMS notifications.
- Provide an organized, searchable, and traceable database of all submissions.


System Logic

The interface consists of:

1️⃣Document Submission Form
- Allows staff to enter client details.
- Enables checklisting of submitted documents.
- Each submission is assigned a unique serial number automatically.
- The form stores the data in a MySQL database upon submission.

2️⃣Live Submission Table (Bottom Section)
- Automatically displays all recent submissions from the database.
- Each row includes key client information and a View button.

🔍Detailed View (On Clicking "View")
- Opens a full view of the client’s submission and document list.
- Displays checkboxes to track document handling stages:
  - ✅ Submitted – always checked by default when data is recorded.
  - 🟡 In-review – manually checked when the department is reviewing.
  - ✅ Processed– manually checked when the service is completed.
  - ✅Collected- manually checked when the client collects documents 
These checkboxes help departments coordinate and track progress for every record.

COMMUNICATION LOGIC 

- When a document is submitted and routed, the system sends an SMS notification to the client.
- The SMS informs the client of:
  - Successful submission.
  - Estimated processing time.
  - Where their request is in the process.

This enhances communication and reduces unnecessary follow-ups or delays.

Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React + Vite       |
| Backend     | PHP|
| Database    | MySQL              |
| Notifications | SMS API |


 FEATURES SUMMARY
-Client document submission form with auto-generated serial number.
-Table view of all recent submissions.
-Expandable view for updating document handling progress.
-Status tracking checkboxes (Submitted, In-review, Processed).
-SMS notification to client for updates.
-Search and trace documents easily from the database.
-Permanent storage of all records in MySQL for future reference.

SYSTEM IMPACT 
This DMS ensures:
-Improved traceability of client records.
-Smoother inter-departmental coordination.
-Enhanced client experience through real-time notifications.
-Reduced chances of document loss or miscommunication.

<h1>My Contribution & System Improvements</h1>

<p>After forking this project, I revisited the NTSA Document Management System independently with the goal of deepening my understanding of full-stack system design and improving key functional and structural aspects of the application.</p>

<h1>The following enhancements and refactors were undertaken.</h1>

<h1>1️⃣ Backend Logic Refactor</h1>
<p>- Reviewed and refactored PHP backend logic to improve readability, maintainability, and separation of concerns.</br>
- Reduced tightly coupled logic between request handling, database access, and response generation.</br>
- Improved request validation to ensure cleaner and more predictable API behavior.</p>

<h1>2️⃣ Improved Database Schema Explanation</h1>
<p>- Documented the database structure more clearly, explaining the purpose of each table and key fields.</br>
- Clarified relationships between client records, document submissions, and processing status tracking.</br>
- Improved naming consistency to make the schema easier to understand and extend.</p>

<h1>3️⃣ UI Logic & Status Flow Improvements</h1>
<p>- Cleaned up React component structure to remove duplicate or test-only code.</br>
- Improved clarity of document status progression (Submitted → In Review → Processed → Collected).</br>
- Ensured UI state reflects backend data more accurately and consistently.</br>
- Removed development-only markers and test messages once functionality was confirmed.</p>

<h1>4️⃣ Enhanced Error Handling</h1>
<p>- Added clearer error handling on both frontend and backend.</br>
- Improved user-facing error messages for failed submissions or invalid inputs.</br>
- Ensured API errors return structured and meaningful responses.</p>

<h1>5️⃣ API Design & Documentation</h1>
<p>- Defined clearer API endpoints for document submission, retrieval, and status updates.</br>
- Began documenting API behavior, expected payloads, and response formats.</br>
- Improved readiness for future integrations and scalability.</p>

<h1>Purpose of These Improvements</h1>
<p>These changes aim to transition the system from a functional prototype into a more maintainable, well-documented, and extensible application, while serving as a learning platform for deeper understanding of real-world full-stack development.</p>




