import express from "express";
import {Signale} from "signale";
import {orderRoute} from "./orders/infrastructure/route/orderRoute";

const app = express()
const signale = new Signale()

app.use(express.json())
app.use(orderRoute)
const PORT = 8080

app.listen(PORT, () =>{
    signale.success("Servidor conectado en el puerto : ", `{PORT}`)
})