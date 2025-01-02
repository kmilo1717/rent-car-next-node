
const rentService = require('../services/rentService');

const getRents = async (req, res) => {
    const rents = await rentService.getRents();
    res.json(rents);
};

const getMetrics = async (req, res) => {
    const { date } = req.params;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    const metrics = await rentService.getMetrics(date);
    res.json(metrics);
};

module.exports = {
    getRents,
    getMetrics
};