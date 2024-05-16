import {Request, Response} from "express";
import {GetOrderUseCase} from "../../application/useCase/getOrderUseCase";

export class GetOrderController {
    constructor(readonly useCase:GetOrderUseCase) {}

    async run(req:Request,res:Response){
        try {
            const orders = await this.useCase.run()
            if (orders){
                return res.status(201).send({
                    status:"Success",
                    data:orders,
                    message:"Orden obtenida!"
                })
            }
            return res.status(417).send({
                status:"Error",
                data:[],
                message:"Error al obtener orden!"
            })
        }catch (e) {

            console.log("Error de request",e)
            return res.status(400).send({
                message:"ERROR!",
                error:e
            })
        }
    }
}