from flask import request, jsonify
from application import app
from application.parsing import parser


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200


@app.route('/parse', methods=['POST'])
def parse():
    data = request.json
    url = data['url']
    return jsonify(parser.parse(url).to_dict())
