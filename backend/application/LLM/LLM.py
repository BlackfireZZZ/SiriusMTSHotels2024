import requests
from typing import List

url = 'https://kpg6mo-188-170-214-41.ru.tuna.am'

description = 'Отель Kostas — ваш идеальный выбор для пребывания в сердце культурной столицы Санкт-Петербурга. Располагаясь всего в шаге от великолепных достопримечательностей, таких как Государственный музей городской скульптуры и Православная духовная академия, отель предлагает 42 комфортабельных номера, идеально подходящие для деловых и семейных поездок. Вокруг отеля вы найдете множество исторических и культурных заведений, включая музеи, церкви и памятники, что делает ваше пребывание здесь не только приятным, но и информативным. Отличный выбор для тех, кто стремится погрузиться в атмосферу города, от его глубоких исторических корней до современных культурологических инициатив.Особое внимание стоит уделить уникальному сервису отеля, который включает в себя температурный контроль для гостей, обеспечивающий идеальные условия для отдыха, независимо от погоды. Отель Kostas — не просто место для ночлега, а полноценное приключение в мире культуры и истории Санкт-Петербурга.'


def apply(hotel_name: str, address: str, count_rooms: int, style: str, comment: str, services: List[str] = [],
          reviews: List[str] = []) -> str:
    """
    Отправляет запрос на сервер для генерации описания отеля и возвращает результат.

    Args:
        hotel_name (str): Название отеля.
        address (str): Адрес отеля.
        count_rooms (int): Количество комнат в отеле.
        style (str): Стиль текста.
        comment (str): Комментарий пользователя.
        services (List[str], optional): Список сервисов отеля. По умолчанию пустой список.

    Returns:
        str: Сгенерированное описание отеля.
    """
    new_url = f'{url}/apply'

    payload = {
        "hotel_name": hotel_name,
        "address": address,
        "count_rooms": count_rooms,
        "style": style,
        "comment": comment,
        "hotel_services": services,
        "reviews": reviews
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(new_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return description


def correct(context: List) -> str:
    new_url = f'{url}/correct'

    payload = {
        "context": context
    }

    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(new_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return description
