import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: "postgres"
    }
)

// sequelize.sync: to see if the models (tables) is found in db if not found create it 
// force: delete all data from db(reset) then make new db
// alter: if i edit db after create it for example create a password property for user table then it will edit the previous data inside user table and add password property on it

// user{name,email,id}
// after alter all data will have these properties
// user{name,email,id,password}
sequelize.sync({ force: false, alter: true })

    (
        async () => {
            try {
                await sequelize.authenticate();
                console.log("Connection has been established successfully")
            } catch (error) {
                console.log("Unable to connect to database", error)
            }
        })();


export {
    sequelize
}