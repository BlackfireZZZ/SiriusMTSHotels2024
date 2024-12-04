from typing import List


class SiteInfo:
    def __init__(self, name: str, address: str, lon: float, lat: float, comment: str, rooms: int, services: List[str]):
        self.name = name
        self.address = address
        self.lon = lon
        self.lat = lat
        self.comment = comment
        self.rooms = rooms
        self.services = services


class ParserInfo:
    def __init__(self, name: str, address: str, services: List[str]):
        self.name = name
        self.address = address
        self.services = services

    def to_dict(self):
        return {
            "name": self.name,
            "address": self.address,
            "services": self.services
        }
