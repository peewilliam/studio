import sql from 'mssql';
import 'dotenv/config'; // Ensure .env variables are loaded

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER!, // The exclamation mark asserts that DB_SERVER is not undefined
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Assuming DB_ENCRYPT is 'true' or 'false' in .env
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', // Same assumption
    connectTimeout: 30000, // Optional: 30 seconds
    requestTimeout: 30000, // Optional: 30 seconds
  },
  pool: {
    max: 10, // Max number of connections in the pool
    min: 0,  // Min number of connections in the pool
    idleTimeoutMillis: 30000 // How long a connection is idle before being released
  }
};

let poolPromise: Promise<sql.ConnectionPool>;

const getConnectionPool = (): Promise<sql.ConnectionPool> => {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then(pool => {
        console.log('✅ SQL Server conectado');
        return pool;
      })
      .catch(err => {
        console.error('❌ Conexão com SQL Server falhou', err);
        // Exit the process or handle reconnection strategy if necessary
        // For now, we'll rethrow to prevent the app from starting with a bad DB connection.
        // Or, allow app to start and retry connection on first query.
        // For this setup, let's allow the app to start and log the error.
        // The promise will be rejected, and subsequent attempts to get a connection will fail until it's resolved.
        // Consider a retry mechanism or health check endpoint.
        return Promise.reject(err); 
      });
  }
  return poolPromise;
};

// Immediately try to connect on module load
getConnectionPool();


export { sql, getConnectionPool };
