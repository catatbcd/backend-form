const mysql = require('mysql2'); // Si usas PostgreSQL: const { Pool } = require('pg');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000 // Aumentar el tiempo de espera a 10 segundos

});

// Verificar la conexi�n
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error de conexi�n a la base de datos:", err.message);
    } else {
        console.log("Conexi�n a la base de datos establecida correctamente.");
        connection.release();
    }
});

module.exports = pool.promise();