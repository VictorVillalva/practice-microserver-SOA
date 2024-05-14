import express from 'express';
import {Signale} from "signale";

const app = express();
const signale = new Signale();

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hola');
});
app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})