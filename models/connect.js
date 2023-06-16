const {createPool} = require('mysql2/promise');

const pool = createPool({
  host: 'YOUR_CLOUD_SQL_IP_ADDRESS',
  user: 'YOUR_CLOUD_SQL_USER',
  password: 'YOUR_CLOUD_SQL_PASSWORD',
  database: 'YOUR_DATABASE',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Gagal terhubung ke Cloud SQL:', err);
    return;
  }
  console.log('Terhubung ke Cloud SQL:');
  connection.release();
});

module.exports = pool;
