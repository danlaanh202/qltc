module.exports = {
  HOST: "localhost",
  PORT: "1433",
  USER: "danlaanh202",
  PASSWORD: "danlaanh202",
  DB: "QLTC",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
