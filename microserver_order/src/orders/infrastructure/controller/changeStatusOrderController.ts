import {Request, Response} from "express";
import {ChangeStatusOrderUseCase} from "../../application/useCase/changeStatusOrderUseCase";
import {RabbitMQ} from "../service/rabbitMQ";
import {OrderProduct} from "../../domain/entity/orderProduct";

export class ChangeStatusOrderController{
    constructor(readonly useCase:ChangeStatusOrderUseCase, readonly mqtt:RabbitMQ) {}

    async run(req:Request,res:Response){
        try {
            const id = req.params.id
            const {status} = req.body
            const order = await this.useCase.run(id,status)
            if (order){
                if (status=="Enviado"){
                    const orderProduct = await this.useCase.runView(id)
                    await this.mqtt.sendToQueue(orderProduct)
                }
                return res.status(201).send({
                    status:"Success",
                    data:order,
                    message:"Estatus de orden cambiada!"
                })
            }
            return res.status(417).send({
                status:"error",
                data:[],
                message:"Error al cambiar estatus de orden!!"
            })
        }catch (e) {
            console.log("Error de request",e)
            return res.status(400).send({
                message:"ERROR!!",
                error:e
            })
        }
    }
}