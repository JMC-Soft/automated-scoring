from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_wrold():
    return "hello world"
