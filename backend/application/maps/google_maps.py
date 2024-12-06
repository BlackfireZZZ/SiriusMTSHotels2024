import os
from typing import List, Tuple
import googlemaps

from application.config import Config

from typing import Optional


class TravelRoutePoint:
    def __init__(self, latitude: float, longitude: float):
        self.latitude = latitude
        self.longitude = longitude

    def __repr__(self):
        return f"TravelRoutePoint(latitude={self.latitude}, longitude={self.longitude})"

    def to_tuple(self):
        """Возвращает точку маршрута как кортеж (широта, долгота)."""
        return (self.latitude, self.longitude)


class TravelPlace:
    def __init__(self, name: str, address: str, rating: float, user_ratings_total: int, location: TravelRoutePoint,
                 place_type: str = None, reviews_count: int = 0):
        self.name = name
        self.address = address
        self.rating = rating
        self.user_ratings_total = user_ratings_total
        self.location = location
        self.place_type = place_type  # новый атрибут для типа места
        self.reviews_count = reviews_count  # новый атрибут для количества отзывов

    def __repr__(self):
        return f"TravelPlace(name={self.name}, address={self.address}, rating={self.rating}, " \
               f"user_ratings_total={self.user_ratings_total}, location={self.location}, " \
               f"place_type={self.place_type}, reviews_count={self.reviews_count})"


class GoogleMaps:
    INTERESTED_TYPES = (
        'museum',
        'cafe',
        'restaurant',
        'tourist_attraction',
        'lodging'
    )
    INTERESTED_TYPES_NAMES = {
        'museum': 'museum',
        'cafe': 'food',
        'restaurant': 'food',
        'tourist_attraction': 'attraction',
        'lodging': 'hotel',
    }

    def __init__(self, api_key: str):
        self.gmaps = googlemaps.Client(key=Config.API_KEY)

    def find_coordinates_by_address(self, address: str) -> Optional[Tuple[float, float]]:
        """
        Получает координаты (широту и долготу) по адресу на русском языке.

        :param address: Адрес для геокодирования (например, "Москва, Красная площадь").
        :return: Кортеж (широта, долгота), если адрес найден, иначе None.
        """
        geocode_result = self.gmaps.geocode(address, language='ru')

        if geocode_result:
            # Получаем координаты из первого результата
            location = geocode_result[0]['geometry']['location']
            longitude = location['lng']
            latitude = location['lat']
            return longitude, latitude
        return None

    def find_nearest(self, latitude: float, longitude: float, my_type: str or List[str], radius: int = 1000) -> List[TravelPlace]:
        places_result = self.gmaps.places_nearby(
            location=(latitude, longitude),
            radius=radius,
            type=my_type,
            language='ru'
        )
        places = []
        if 'results' in places_result:
            for place in places_result['results']:
                place_info = TravelPlace(
                    name=place.get('name'),
                    address=place.get('vicinity'),
                    rating=place.get('rating', 0.0),
                    user_ratings_total=place.get('user_ratings_total', 0),
                    location=TravelRoutePoint(
                        latitude=place.get('geometry', {}).get('location', {}).get('lat'),
                        longitude=place.get('geometry', {}).get('location', {}).get('lng')
                    ),
                    place_type=place.get('types', [])[0] if place.get('types') else None,  # сохраняем тип места
                    reviews_count=place.get('user_ratings_total', 0)  # сохраняем количество отзывов
                )
                places.append(place_info)
        return places


# Пример использования
if __name__ == '__main__':
    gmaps_client = GoogleMaps(Config.API_KEY)

    # lon, lat = gmaps_client.find_coordinates_by_address('Мясницкая улица, 14/2с1')
    # print(lon, lat)
    # Пример поиска ближайших кафе
    nearest_places = gmaps_client.find_nearest(latitude=55.760600, longitude=37.631825,
                                               my_type=['museum', 'tourist_attraction'])
    nearest_places.sort(key=lambda x: x.rating + x.reviews_count // 1000, reverse=True)
    for place in nearest_places:
        print(f"Place Name: {place.name}, Address: {place.address}, Rating: {place.rating},"
              f" User Ratings Total: {place.user_ratings_total}, Place Type: {place.place_type},"
              f" Reviews Count: {place.reviews_count}")
