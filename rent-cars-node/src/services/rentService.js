const db = require('../config/db');

const getRents = async () => {
  const query = 'SELECT c.cedula, c.nombre, a.fecha, a.tiempo_dias, a.saldo, ca.placa, ca.marca FROM alquiler a JOIN cliente c ON a.cliente_cedula = c.cedula JOIN carro ca ON a.carro_placa = ca.placa;';
  const [rows] = await db.query(query);
  return rows;
};

const getMetrics = async (date) => {

  const dayQuery = `SELECT COUNT(*) as day_count FROM alquiler WHERE DATE(fecha) = '${date}';`;
  const monthQuery = `SELECT COUNT(*) as month_count FROM alquiler WHERE MONTH(fecha) = MONTH('${date}') AND YEAR(fecha) = YEAR('${date}');`;
  const [dayRows] = await db.query(dayQuery);
  const [monthRows] = await db.query(monthQuery);
  const data = {
    day_count: dayRows[0].day_count,
    month_count: monthRows[0].month_count,
  }
  return data;
};

module.exports = {
    getRents,
    getMetrics
};