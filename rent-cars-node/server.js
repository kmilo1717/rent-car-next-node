const app = require('./src/app');
const port = process.env.PORT || 4000;
const db = require('./src/config/db');


db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida con éxito');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
