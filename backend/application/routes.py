from flask import request, jsonify
from application import app


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200