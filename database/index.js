import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost', // Allow for flexibility in host configuration
        dialect: "postgres"
    }
);

// Synchronize models with the database
// force: false - prevents data loss by keeping existing tables
// alter: true - updates tables to match the latest models without dropping data
sequelize.sync({ force: false, alter: true })
    .then(() => console.log("Database synchronized"))
    .catch((error) => console.log("Error synchronizing database", error));

// Authenticate the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
})();

export { sequelize };
