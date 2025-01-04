const app = require('./src/app');
const port = process.env.PORT || 4000;
const db = require('./src/config/db');

const startServer = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Conexión a la base de datos establecida con éxito');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error conectando a la base de datos:', err.message);
    process.exit(1);
  }
};

startServer();
