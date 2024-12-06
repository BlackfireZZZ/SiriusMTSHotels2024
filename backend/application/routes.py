import requests
from flask import request, jsonify
from application import app
from application.parsing.ostorovok_parsing import main
from application.SBER_VOICE import main as get_token
import json


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200


@app.route('/parse', methods=['POST'])
def parse():
    data = request.json
    url = data['url']
    parsed_data = main(url)

    response = app.response_class(
            response=json.dumps(parsed_data, ensure_ascii=False),
            status=200,
            mimetype='application/json'
        )
    return response


@app.route('/speech_to_text', methods=['POST'])
def synthesize():
    try:
        text = request.json['text']
        token = get_token()
        # Синтез текста в речь
        synth_url = "https://smartspeech.sber.ru/rest/v1/text:synthesize?format=wav16&voice=May_24000"
        synth_headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/text",
        }

        synth_response = requests.post(synth_url, headers=synth_headers, data=text.encode('utf-8'), verify=False)
        if synth_response.status_code != 200:
            return jsonify({"error": "Failed to synthesize speech", "details": synth_response.text}), synth_response.status_code

        # Возвращаем сгенерированный аудиофайл
        return synth_response.content, 200, {
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'attachment; filename="out.wav"'
        }

    except Exception as e:
        app.logger.error(e)
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
