import pika
import json
import config
import threading
from rerun_service import init
import queue


def message_callback(ch, method, properties, body, message_queues, device_threads, devices):
  message_json = json.loads(body)

  device_id = message_json['device_id']
  if device_id not in devices:
    devices.append(device_id)

  if device_id not in device_threads:
    message_queues[device_id] = queue.Queue()
    device_threads[device_id] = threading.Thread(target=lambda: init(device_id, message_queues[device_id]), daemon=True)

    device_threads[device_id].start()

  message_queues[device_id].put(message_json)



def listener(devices):

  message_queues = {}
  device_threads = {}

  connection = pika.BlockingConnection(pika.URLParameters(config.rabbit_mq_url))
  channel = connection.channel()

  channel.basic_consume(queue='AIManager',
                        auto_ack=True,
                        on_message_callback=
                        lambda ch, method, properties, body:
                        message_callback(ch, method, properties, body, message_queues, device_threads, devices))

  print('Started pika listener')
  channel.start_consuming()
