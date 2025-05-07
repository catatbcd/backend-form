const ContactModel = require('../models/contactModel');
const EmailService = require('../services/emailService');

exports.submitForm = async (req, res) => {
    const { fullName, email, country, phone, message } = req.body;
    if (!fullName || !email || !message) {
        return res.status(400).json({ mensaje: "Campos obligatorios faltantes" });
    }
    try {
        await ContactModel.saveSubmission({ fullName, email, country, phone, message });
        await EmailService.sendUserConfirmation(email, fullName);
        await EmailService.sendAdminNotification(req.body);
        res.status(201).json({ mensaje: "Formulario recibido correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};

exports.getDailyMetrics = async (req, res) => {
    try {
        const count = await ContactModel.getDailySubmissions();
        res.json({ conteo: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};