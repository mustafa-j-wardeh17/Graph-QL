import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";


export const Todo = sequelize.define("Todo", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})