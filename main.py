from flask import Flask, render_template, request
import threading
import subprocess

from mq_service import listener


# def start_rerun():
#   subprocess.run(['rerun', '--serve-web'])

# rerun_thread = threading.Thread(target=start_rerun, daemon=True)
# rerun_thread.start()

devices = []
listener_thread = threading.Thread(target=lambda: listener(devices), daemon=True)
listener_thread.start()


app = Flask(__name__)

# index page
@app.route('/')
def index():
  return render_template('index.html', devices=devices)


@app.route('/rerun')
def rerun():
  device_id = request.args.get('device_id')
  return f'<iframe src="https://app.rerun.io/version/0.22.0/index.html?url=ws://localhost:9877&recording_id={device_id}" style="border-style: none;width: 100%; height: 100%;"></iframe>'

app.run()