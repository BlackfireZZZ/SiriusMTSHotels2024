import uuid
from application import db
from datetime import datetime


class Hotel(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    lon = db.Column(db.Float, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    rooms = db.Column(db.Integer, nullable=False, default=1)
    stars = db.Column(db.Integer, nullable=False, default=1)

    def to_dict(self):
        """Возвращает отель в виде словаря."""
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "lon": self.lon,
            "lat": self.lat,
            "rooms": self.rooms,
            "stars": self.stars
        }


class Conversation(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    messages = db.relationship('Message', backref='conversation', lazy=True)

    def get_conversation(self):
        """Возвращает все сообщения в этой беседе в виде словаря, отсортированные по timestamp."""
        return {
            "conversation_id": self.id,
            "messages": [
                message.to_dict() for message in sorted(self.messages, key=lambda x: x.timestamp)
            ]
        }

    def to_dict(self):
        """Возвращает беседу в виде словаря."""
        return {
            "conversation_id": self.id
        }


class Message(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    text = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(36), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    conversation_id = db.Column(db.String(36), db.ForeignKey('conversation.id'), nullable=False)

    def __init__(self, text, author, conversation_id):
        self.text = text
        self.author = author
        self.conversation_id = conversation_id

    def to_dict(self):
        """Возвращает сообщение в виде словаря."""
        return {
            "id": self.id,
            "text": self.text,
            "author": self.author,
            "timestamp": self.timestamp.isoformat(),
            "conversation_id": self.conversation_id
        }
