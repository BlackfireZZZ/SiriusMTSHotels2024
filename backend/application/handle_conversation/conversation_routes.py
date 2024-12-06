from application.models import Conversation, Message
from application import db
from flask import Blueprint, request, jsonify
from application.LLM.LLM import apply, correct

conversation_blueprint = Blueprint('conversation', __name__)


@conversation_blueprint.route('/create', methods=['POST'])
def create_conversation():
    session_id = request.cookies.get('session')
    conversation = Conversation.query.get(session_id)
    if conversation is not None:
        return jsonify(conversation.to_dict())
    new_conversation = Conversation(id=session_id)
    db.session.add(new_conversation)
    db.session.commit()
    return jsonify(new_conversation.to_dict())


@conversation_blueprint.route('/add_message', methods=['POST'])
def add_message():
    data = request.json
    conversation_id = request.cookies.get('session')
    conversation = Conversation.query.get(conversation_id)
    text = data['comment']
    new_message = Message(text, '1', conversation_id)   # 1 - автор - пользователь
    db.session.add(new_message)
    db.session.commit()
    context = conversation.get_conversation()
    new_description = correct(context)
    bot_message = Message(new_description, '0', conversation_id)  # 0 - автор - бот
    db.session.add(bot_message)
    db.session.commit()
    return jsonify(
        {
            'description': new_description
        }
    )


@conversation_blueprint.route('/get_messages')
def get_conversation():
    conversation_id = request.cookies.get('session')
    conversation = Conversation.query.get(conversation_id)
    return conversation.get_conversation()








