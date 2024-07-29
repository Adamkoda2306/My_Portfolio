<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Collect form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$description = htmlspecialchars($_POST['description']);

// Email settings
$to = 'adam.koda2306@gmail.com'; // Replace with your email address
$subject = 'Message from ' . $name;
$message = "Name: $name\nEmail: $email\n\nMessage:\n$description";
$headers = "From: $email\r\n";

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo 'Success';
} else {
    echo 'Failure';
}
?>
