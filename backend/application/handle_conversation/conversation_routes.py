from application.models import Conversation, Message
from application import db
from flask import Blueprint, request, jsonify, current_app
from application.LLM.LLM import apply, correct
import json


conversation_blueprint = Blueprint('conversation', __name__)


@conversation_blueprint.route('/create', methods=['POST'])
def create_conversation():
    conversation_id = request.cookies.get('session')
    conversation = db.session.query(Conversation).filter_by(id=conversation_id).first()
    if conversation is not None:
        return jsonify(conversation.to_dict())
    new_conversation = Conversation(id=conversation_id)
    db.session.add(new_conversation)
    db.session.commit()
    return jsonify(new_conversation.to_dict())


@conversation_blueprint.route('/add_message', methods=['POST'])
def add_message():
    data = request.json
    conversation_id = request.cookies.get('session')
    conversation = db.session.query(Conversation).filter_by(id=conversation_id).first()
    text = data['comment']
    new_message = Message(text, '1', conversation_id)   # 1 - автор - пользователь
    db.session.add(new_message)
    db.session.commit()
    context = conversation.get_conversation()
    new_description = correct(context)
    bot_message = Message(new_description, '0', conversation_id)  # 0 - автор - бот
    db.session.add(bot_message)
    db.session.commit()

    response_data = {
            'description': new_description
    }
    response = current_app.response_class(
                response=json.dumps(response_data, ensure_ascii=False),
                status=200,
                mimetype='application/json'
            )
    return response


@conversation_blueprint.route('/get_messages')
def get_conversation():
    conversation_id = request.cookies.get('session')
    conversation = db.session.query(Conversation).filter_by(id=conversation_id).first()
    return conversation.get_conversation()








