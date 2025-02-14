 // Import the function

const testEmail = async () => {
  const response = await sendEmail({
    email: "user@example.com", // ✅ Replace with your test email
    subject: "Test Email from Resend & Gmail SMTP",
    message: "<h1>Hello!</h1><p>This is a test email.</p>",
  });

  console.log(response);
};

testEmail();
