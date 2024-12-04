import uuid
from application import db
from datetime import datetime


class Service(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    hotel_id = db.Column(db.String(36), db.ForeignKey('hotel.id'), nullable=False)

    def __init__(self, name: str, hotel_id: str):
        self.name = name
        self.hotel_id = hotel_id

    def to_dict(self):
        """Возвращает сервис в виде словаря."""
        return {
            "id": self.id,
            "name": self.name
        }


class Hotel(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    lon = db.Column(db.Float, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    rooms = db.Column(db.Integer, nullable=False, default=1)
    description_type = db.Column(db.String(100), nullable=True, default="")
    description = db.Column(db.Text, nullable=True)
    services = db.relationship('Service', backref='hotel', cascade='all, delete-orphan', lazy='dynamic')
    conversation_id = db.Column(db.String(36), db.ForeignKey('conversation.id'), nullable=False)

    def __init__(self, name: str, address: str, lon: float, lat: float, rooms: int,
                 conversation_id: str, description_type: str = "", description: str = None):
        self.name = name
        self.address = address
        self.lon = lon
        self.lat = lat
        self.rooms = rooms
        self.description_type = description_type
        self.description = description
        self.conversation_id = conversation_id

    def get_services(self):
        """Возвращает все сервисы в отеле в виде словаря."""
        return {
            "services": [
                service.to_dict() for service in self.services
            ]
        }

    def clean_services(self):
        """Удаляет все сервисы в отеле."""
        for service in self.services:
            db.session.delete(service)
        db.session.commit()

    def to_dict(self):
        """Возвращает отель в виде словаря."""
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "lon": self.lon,
            "lat": self.lat,
            "rooms": self.rooms,
            "services": self.get_services(),
            "description": self.description,
            "description_type": self.description_type,
            "conversation_id": self.conversation_id
        }


class Conversation(db.Model):
    def __init__(self, id: str):
        self.id = id

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
