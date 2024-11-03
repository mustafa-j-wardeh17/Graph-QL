import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";


export const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            min: 3,
            max: 20
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    //other options
})