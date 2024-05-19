import { Order } from "../../domain/entity/order";
import {query} from "../../../database/mysql";
import {OrderRepository} from "../../domain/repository/orderRepository";
import {OrderProduct} from "../../domain/entity/orderProduct";


export class MysqlOrderRepository implements OrderRepository {

    async generateId(){
        try {
            let result
            do{
                const namePrefix = "order"
                const randomNumbers = Array.from({ length: 8 }, () =>
                    Math.floor(Math.random() * 10));
                result = '';
                for (let i = 0; i < 4; i++) {
                    result += randomNumbers[i] + namePrefix[i] + randomNumbers[i+1];
                }}while ( await this.getOrder(result))

            return result;
        }catch (e){
            console.log("Error en repository: \n",e)
            return null;
        }
    }

    async getOrder(id:string){
        const sql = "SELECT * FROM orders WHERE id = ? AND deleted_at IS NULL"
        const params:any[]=[id]
        try {
            const [result]:any = await query(sql,params)
            const order = result[0]
            return new Order(order.id,order.total,order.date,order.status,order.deleted_at)
        }catch (e) {
            console.log("Error en repository: \n",e)
            return null;
        }
    }

    async create(productId:string,units:number, total: number, date: Date, status: string): Promise<Order | null> {
        const id = await this.generateId()
        if (id!=undefined) {
            const sql = "INSERT INTO orders(id,total,date,status) VALUES(?,?,?,?)"
            const params: any[] = [id, total, date, status]
            try {
                const [result]: any = await query(sql, params)
                if (result) {
                    const sql = "INSERT INTO orders_products(order_id,product_id,units,price) VALUES (?,?,?,?)"
                    const params:any[]=[id,productId,units,total]
                    const [result]:any=await query(sql,params)
                    return this.getOrder(id)
                }
            } catch (e) {
                console.log("Error en repository: \n",e)
                return null;
            }
        }
        return null
    }
    async changeStatus(id: string, status:string): Promise<Order | null> {
        const sql = "UPDATE orders SET status = ? WHERE id=? AND deleted_at IS NULL"
        const params: any[] = [status,id]
        try {
            const [result]:any = await query(sql,params)
            if (result){
                return await this.getOrder(id)
            }
            return null;
        }catch (e) {
            console.log("Error en repository: \n",e)
            return null;
        }
    }
    async getAll(): Promise<Order[] | null> {
        const sql = "SELECT * FROM orders WHERE deleted_at IS NULL"
        try {
            const [result]:any = await query(sql,[])
            return result.map((orderData:any)=>
                new Order(
                    orderData.id,
                    orderData.total,
                    orderData.date,
                    orderData.status,
                    orderData.deleted_at
                )
            )
        }catch (e) {
            console.log("Error en repository: \n",e)
            return null;
        }

    }

    async getOrderProducts(orderId:string){
        try {
            const sql="SELECT * FROM orders_products WHERE order_id=? AND deleted_at IS NULL"
            const params:any[]=[orderId]
            const [results]:any=await query(sql,params)
            if (results){
                const result =results[0]
                return new OrderProduct(orderId,result.product_id,result.units,result.price,null)
            }else{
                return null;
            }
        }catch (e) {
            console.log("Error en repository: \n",e)
            return null;
        }
    }

}