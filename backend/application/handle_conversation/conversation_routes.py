from application.models import Conversation, Message
from application import db
from flask import Blueprint, request


conversation_blueprint = Blueprint('conversation', __name__)


@conversation_blueprint.route('/create', methods=['POST'])
def create_conversation():
    data = request.json
    id = data['id']
    new_conversation = Conversation(id=id)
    db.session.add(new_conversation)
    db.session.commit()
    return new_conversation.to_dict()


@conversation_blueprint.route('/<conversation_id>/add_message', methods=['POST'])
def add_message(conversation_id):
    data = request.json
    text = data['text']
    author = data['author']
    new_message = Message(text, author, conversation_id)
    db.session.add(new_message)
    db.session.commit()
    return new_message.to_dict()


@conversation_blueprint.route('/<conversation_id>/get_messages')
def get_conversation(conversation_id):
    conversation = Conversation.query.get(conversation_id)
    return conversation.get_conversation()








