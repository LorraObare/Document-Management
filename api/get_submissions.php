<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "db.php";

try {
    $stmt = $pdo->query("SELECT * FROM client_service_requests ORDER BY id DESC");
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $requests
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Fetch failed: " . $e->getMessage()
    ]);
}
