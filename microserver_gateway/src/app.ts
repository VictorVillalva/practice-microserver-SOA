import express from 'express';
import {Signale} from 'signale';
import proxy from "express-http-proxy";

const app = express()
const signale = new Signale()

app.use(express.json)

app.use('/api/v1/orders',proxy('http://localhost:8081'));
app.use('/api/v1/stock',proxy('http://localhost:8082'));
const PORT = 8080

app.listen(PORT,()=>{
    signale.success("Server on line in port: ", PORT)
})