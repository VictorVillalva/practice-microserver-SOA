import {Request, Response} from "express";
import {CreateOrderUseCase} from "../../application/useCase/createOrderUseCase";

export class CreateOrderController {
    constructor(readonly useCase:CreateOrderUseCase) {}

    async run(req:Request, res:Response){
        try{

            const {total,date,status} = req.body
            const order = await this.useCase.run(total,date,status)

            if (order){
                return res.status(201).send({
                    status:"Success",
                    data:order,
                    message:"Orden creada!"
                })
            }
            return res.status(417).send({
                status:"error",
                data:[],
                message:"Error al crear orden!"
            })
        }catch (e){
            console.log("Error de request ", e)
            return res.status(400).send({
                message:"ERROR!!",
                error:e
            })
        }
    }
}