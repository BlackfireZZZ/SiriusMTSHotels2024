import requests
from typing import List

url = 'https://rfz2vp-188-170-214-41.ru.tuna.am'


def apply(hotel_name: str, address: str, count_rooms: int, style: str, comment: str, services: List[str] = []) -> str:
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
        "hotel_services": services
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(new_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return f"Произошла ошибка при запросе: {e}"


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
        return f"Произошла ошибка при запросе: {e}"
