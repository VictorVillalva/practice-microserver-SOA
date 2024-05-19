import {OrderRepository} from "../../domain/repository/orderRepository";

export class CreateOrderUseCase {
    constructor(readonly repository:OrderRepository) {}

    async run(productId:string, units:number, total:number, date:Date, status:string){
        try {
            return await this.repository.create(productId,units,total,date,status)
        }catch (e) {
            console.log('Error -> ', e)
            return null;
        }
    }
}