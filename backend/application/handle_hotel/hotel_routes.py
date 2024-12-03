from application.models import Hotel
from application import db
from flask import Blueprint, request

from application.yandex_maps.geocode import get_location

hotel_blueprint = Blueprint('hotel', __name__)


@hotel_blueprint.route('/create', methods=['POST'])
def create_hotel():
    data = request.json
    name = data['name']
    address = data['address']
    lon, lat = get_location(address)
    rooms = data['rooms']
    stars = data['stars']
    new_hotel = Hotel(name, address, lon, lat, rooms, stars)
    db.session.add(new_hotel)
    db.session.commit()
    return new_hotel.to_dict()






