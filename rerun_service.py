import rerun as rr
import queue
from collections import defaultdict
import socket


def log(message_json, objects_cache):
  snapshot_time = message_json['timestamp'] / 1000000
  rr.set_time_seconds("stable_time", snapshot_time)

  for object_type, objects_id in objects_cache.items():
    for object_id in objects_id:

      rr.log(f"vehicles/{object_type}/{object_id}", rr.Clear(recursive=True))

  objects_cache.clear()


  for detected_object in message_json['objects']:

    objects_cache[detected_object['type']].append(detected_object['object_id'])

    box_centers = [detected_object['latitude']*1000, detected_object['longitude']*1000, 0.3]
    color = (0, 255, 0) if detected_object['type'] == 'car' else (255, 0, 0)

    rr.log(
      f"vehicles/{detected_object['type']}/{detected_object['object_id']}",
      rr.Points3D(radii=0.02, positions=box_centers, colors=[color]))


def init(device_id, message_queue: queue, devices):

  rr.new_recording(device_id, recording_id=device_id, spawn=False, make_thread_default=True)
  sock_ws = socket.socket()
  sock_ws.bind(('localhost', 0))
  sock_ws_name = sock_ws.getsockname()[1]
  sock_ws.close()
  print(sock_ws_name)

  devices[device_id] = sock_ws_name

  rr.serve_web(web_port=0, ws_port=sock_ws_name, open_browser=False)

  print('initialized rerun')
  objects_cache = defaultdict(list)

  while True:
    log(message_queue.get(), objects_cache)
    message_queue.task_done()
