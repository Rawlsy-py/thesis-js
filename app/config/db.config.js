module.exports = {
    HOST: process.env.DATABASE_RUL,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DATABASE,
    PORT: process.env.PORT,
    dialect: "postgres",
    pool: {
        max: 22,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};