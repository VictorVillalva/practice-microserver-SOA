from abc import ABC, abstractmethod
from products.domain.entity.product import Products
from typing import List
class ProductsInterface(ABC):

    @abstractmethod
    def get_products(self) -> list[Products]:
        pass

    @abstractmethod
    def add_product(self, product: Products) -> Products:
        pass

    @abstractmethod
    def remove_product(self, product_id: int) -> None:
        pass

    @abstractmethod
    def reduce_stock(self, product_id:str, units:int) -> None:
        pass