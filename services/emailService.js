const nodemailer = require('nodemailer');
class EmailService {
    static async sendUserConfirmation(email, fullName) {
        const transporter = EmailService.createTransporter();
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Confirmación de envío",
            text: `Hola ${fullName}, tu formulario ha sido recibido correctamente.`,
        };

        await transporter.sendMail(mailOptions);
    }

    static async sendAdminNotification(data) {
        const transporter = EmailService.createTransporter();
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "Nuevo formulario recibido",
            text: `Se ha recibido un nuevo formulario de contacto:\n\n${JSON.stringify(data, null, 2)}`,
        };

        await transporter.sendMail(mailOptions);
    }

    static createTransporter() {
        return nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
}

module.exports = EmailService;