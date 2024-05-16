import {OrderRepository} from "../../domain/repository/orderRepository";

export class GetOrderUseCase{
    constructor(readonly repository:OrderRepository) {}

    async run(){
        try {
            return await this.repository.getAll()
        }catch (e) {
            console.log('Error -> ', e)
            return null;
        }
    }
}