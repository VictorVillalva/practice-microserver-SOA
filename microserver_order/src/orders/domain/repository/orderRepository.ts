import {Order} from "../entity/order";
import {OrderProduct} from "../entity/orderProduct";

export interface OrderRepository{
    create(
        productId:string,
        units:number,
        total:number,
        date:Date,
        status:string
    ):Promise<Order|null>
    changeStatus(id:string, status:string):Promise<Order|null>
    getAll():Promise<Order[]|null>
    getOrderProducts(orderId:string):Promise<OrderProduct|null>
}