from flask import Flask, render_template, request
import threading

from mq_service import listener

devices = {}
listener_thread = threading.Thread(target=lambda: listener(devices), daemon=True)
listener_thread.start()


app = Flask(__name__)

# index page
@app.route('/')
def index():
  return render_template('index.html', devices=devices)


@app.route('/rerun')
def rerun():
  port = request.args.get('port')
  print(port)
  return f'<iframe src="https://app.rerun.io/version/0.22.0/index.html?url=ws://localhost:{port}" style="border-style: none;width: 100%; height: 100%;"></iframe>'

app.run(port=8000)
