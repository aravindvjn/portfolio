'use server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendEmail = async (email: string, content: string) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER!,
            to: process.env.RECIEVER_EMAIL_USER!,
            subject: "Mail via Protfolio",
            html: `<div>
            <h3>Mail via Portfolio</h3>
            <p><strong>From:</strong> ${email}</p>
             <p><strong>Message:</strong> ${content}</p>
            </div>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true, message: "Email sent successfully! Aravind will reach you ASAP." };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email." };
    }
};

export default sendEmail;

