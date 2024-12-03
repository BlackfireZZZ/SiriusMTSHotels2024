from application.models import Hotel
from application import db
from flask import Blueprint, request
from app import MapsClient


hotel_blueprint = Blueprint('hotel', __name__)


@hotel_blueprint.route('/create', methods=['POST'])
def create_hotel():
    data = request.json
    name = data['name']
    address = data['address']
    lon, lat = MapsClient.find_coordinates_by_address(address)
    rooms = data['rooms']
    stars = data['stars']
    new_hotel = Hotel(name, address, lon, lat, rooms, stars)
    db.session.add(new_hotel)
    db.session.commit()
    return new_hotel.to_dict()
