const pool = require('../db');

class ContactModel {
    static async initializeDatabase() {
        const query = `
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INT PRIMARY KEY AUTO_INCREMENT,
                fullName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                country VARCHAR(100),
                phone VARCHAR(20),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.execute(query);
        console.log("Tabla 'contact_submissions' verificada o creada correctamente.");
    }

    static async saveSubmission({ fullName, email, country, phone, message }) {
        await ContactModel.initializeDatabase(); // Verifica la tabla antes de insertar datos
        const query = `
            INSERT INTO contact_submissions (fullName, email, country, phone, message, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        await pool.execute(query, [fullName, email, country || null, phone || null, message]);
    }

    static async getDailySubmissions() {
        await ContactModel.initializeDatabase(); // Asegura la tabla antes de consultar
        const query = `
            SELECT COUNT(*) AS conteo
            FROM contact_submissions
            WHERE DATE(created_at) = CURDATE()
        `;
        const [rows] = await pool.execute(query);
        return rows[0].conteo;
    }
}

module.exports = ContactModel;