from flask import Blueprint, request, jsonify
from application.LLM.LLM import apply
from application.models import Hotel, Service, Conversation, Message
from application import db
from application import MapsClient
from typing import List

from application.schemas import SiteInfo

hotel_blueprint = Blueprint('hotel', __name__)


@hotel_blueprint.route('/create', methods=['POST'])
def create():
    session_id = request.cookies.get('session')
    conversation = Conversation.query.get(session_id)
    data = request.json
    name = data['name']
    address = data['address']
    rooms = data['rooms']
    services = data['services']
    comment = data['comment']
    description_type = data['description_type']
    #lon, lat = MapsClient.find_coordinates_by_address(address)
    lon, lat = 10, 20
    hotel = Hotel.query.filter_by(lon=lon, lat=lat).first()
    if hotel is None:
        dict_hotel = create_hotel(name, address, rooms, services, lon, lat, description_type, session_id)
    else:
        dict_hotel = update_hotel(hotel.id, name, address, rooms, services, session_id)
    info = SiteInfo(name, address, lon, lat, comment, rooms, services)
    description = apply(info, conversation.get_conversation())
    bot_message = Message(description, '0', session_id)
    db.session.add(bot_message)
    dict_hotel['description'] = description
    hotel = Hotel.query.filter_by(lon=lon, lat=lat).first()
    hotel.description = description
    db.session.commit()
    return jsonify({
        'hotel': dict_hotel,
        'description': description
    })


def create_hotel(name: str, address: str, rooms: int, services: List[str], lon: float, lat: float,
                 description_type: str, session_id: str):
    new_hotel = Hotel(name, address, lon, lat, rooms, session_id, description_type)
    db.session.add(new_hotel)
    db.session.commit()
    for service in services:
        new_service = Service(service, new_hotel.id)
        db.session.add(new_service)
    db.session.commit()
    return new_hotel.to_dict()


def update_hotel(id: str, name: str, address: str, rooms: int, services: List[str], session_id: str):
    hotel = Hotel.query.get(id)
    if hotel is None:
        return None
    hotel.name = name
    hotel.address = address
    hotel.rooms = rooms
    hotel.conversation_id = session_id
    db.session.commit()
    hotel.clean_services()
    for service in services:
        new_service = Service(service, hotel.id)
        db.session.add(new_service)
    db.session.commit()
    return hotel.to_dict()
