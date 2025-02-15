import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using Gmail's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail SMTP service
  auth: {
    user: 'eyosiasbin123@gmail.com', // Your Gmail address
    pass: 'kuai rhpj cmxz bfvc', // The app password you generated
  },
});

// Modify sendWelcomeEmail to accept fullName
export const sendWelcomeEmail = async (email: string, fullName: string) => {
  const mailOptions = {
    from: 'eyosiasbin123@gmail.com', // Sender email
    to: email, // Recipient email
    subject: 'Welcome to Our Service!',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
            }
            p {
              font-size: 16px;
              color: #333333;
            }
            .button {
              background-color: #4CAF50;
              color: white;
              padding: 15px 25px;
              text-align: center;
              display: inline-block;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Our Service, ${fullName}!</h1>
            <p>Thank you for signing up. We're excited to have you on board!</p>
            <p>To get started, click the button below and explore all our features:</p>
            <a href="auto-book-five.vercel.app" class="button">Go to Dashboard</a>
            <div class="footer">
              <p>If you didn't sign up, please ignore this email.</p>
              <p>Best regards,<br/>Your Service Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};
