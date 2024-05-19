import pika
import json
from products.infrastructure.repository.mysql_product_repository import ProductRepository

def update_stock(product_id, units):
    repository = ProductRepository()
    try:
        product = repository.reduce_stock(product_id, units)
        print(f"Stock actualizado -  {product_id}: {units} unidades menos")
    except ValueError as e:
        print(f"Error al actualizar el stock: {e}")

def callback(ch, method, properties, body):
    print(" [x] Recibe %r" % body)
    message = json.loads(body)
    product_id = message['productid']
    units = message['units']
    update_stock(product_id, units)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def start():
    # Configurar la conexión a RabbitMQ
    rabbitmq_url = 'amqp://admin:admin@localhost:5672/'
    params = pika.URLParameters(rabbitmq_url)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    queue = 'ordenes_enviadas'

    # Asegurarse de que la cola existe
    channel.queue_declare(queue=queue, durable=True)

    # Configurar el consumidor
    channel.basic_consume(queue=queue, on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()