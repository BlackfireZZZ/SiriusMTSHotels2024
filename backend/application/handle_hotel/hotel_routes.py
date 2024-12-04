from flask import Blueprint, request, jsonify
from application.LLM.LLM import apply
from application.models import Hotel, Service
from application import db
from app import MapsClient
from typing import List

from application.schemas import SiteInfo

hotel_blueprint = Blueprint('hotel', __name__)


@hotel_blueprint.route('/create', methods=['POST'])
def create():
    data = request.json
    name = data['name']
    address = data['address']
    rooms = data['rooms']
    services = data['services']
    comment = data['comment']
    lon, lat = MapsClient.get_coordinates_by_address(address)
    hotel = Hotel.query.get(lon=lon, lat=lat)
    if hotel is None:
        dict_hotel = create_hotel(name, address, rooms, services, lon, lat)
    else:
        dict_hotel = update_hotel(hotel.id, name, address, rooms, services)
    info = SiteInfo(name, address, lon, lat, comment, rooms, services)
    answer = apply(info, None)  # TODO context 
    return jsonify({
        'hotel': dict_hotel,
        'answer': answer
    })


def create_hotel(name: str, address: str, rooms: int, services: List[str], lon: float, lat: float):
    new_hotel = Hotel(name, address, lon, lat, rooms)
    db.session.add(new_hotel)
    for service in services:
        new_service = Service(service, new_hotel.id)
        db.session.add(new_service)
    db.session.commit()
    return new_hotel.to_dict()


def update_hotel(id: str, name: str, address: str, rooms: int, services: List[str]):
    hotel = Hotel.query.get(id)
    if hotel is None:
        return None
    hotel.name = name
    hotel.address = address
    hotel.rooms = rooms
    db.session.commit()
    hotel.clean_services()
    for service in services:
        new_service = Service(service, hotel.id)
        db.session.add(new_service)
    db.session.commit()
    return hotel.to_dict()
