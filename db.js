const mysql = require('mysql2'); // Si usas PostgreSQL: const { Pool } = require('pg');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000 // Aumentar el tiempo de espera a 10 segundos

});

// Verificar la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err.message);
    } else {
        console.log("Conexión a la base de datos establecida correctamente.");
        connection.release();
    }
});

module.exports = pool.promise();