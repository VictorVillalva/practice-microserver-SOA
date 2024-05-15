import {Signale} from "signale";
import dotenv from "dotenv";
import mysql from "mysql2/promise";


const signale = new Signale()
dotenv.config()

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
}

const pool = mysql.createPool(config);

export async function query(sql : string, params : any[]){
    try{
        const conect = await pool.getConnection();
        signale.success("Conexion a la BD existosa!!")
        const result = await conect.execute(sql,params);
        conect.release()
        return result
    }catch (error){
        signale.error(error);
        return null;
    }
}