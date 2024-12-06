import requests
from bs4 import BeautifulSoup
import json


def get_html(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                      'AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/117.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Ошибка при запросе страницы: {response.status_code}")


def parse_hotel_name(soup):
    name_div = soup.find('div', class_='HotelHeader_nameWrapper__3xNRH')
    if name_div:
        h1 = name_div.find('h1', class_='HotelHeader_name__hWIU0')
        if h1:
            return h1.text.strip()
    return "Название не найдено"


def parse_address(soup):
    address_div = soup.find('div', class_='HotelHeader_addressContainer___TpgQ')
    if address_div:
        button = address_div.find('button', class_='Link_link___BpEA HotelHeader_address__j9_PA')
        if button:
            return button.text.strip()
    return "Адрес не найден"


def parse_amenities(soup):
    amenities_div = soup.find('div', class_='Amenities_list__pYDjd')
    amenities = []
    if amenities_div:
        groups = amenities_div.find_all('div', class_='Amenities_group__X5Qd7')
        for group in groups:
            header = group.find('h3', class_='Amenities_groupTitle__aDVIi')
            if header:
                group_name = header.text.strip()
                ul = group.find('ul', class_='Amenities_groupAmenities__jeJSS')
                if ul:
                    items = ul.find_all('li', class_='Amenities_groupAmenity__NXWsV')
                    for item in items:
                        amenity = item.find('div', class_='Amenities_amenityName__a_l1_')
                        if amenity:
                            amenities.append(amenity.text.strip())
    return amenities


def parse_description(soup):
    description_blocks = soup.find_all('div', class_='About_description__KONG6')
    full_description = ""
    for block in description_blocks:
        paragraphs = block.find_all('p')  # Извлекаем параграфы из каждого блока
        block_text = ' '.join(p.get_text(strip=True) for p in paragraphs)
        full_description += block_text + "\n\n"  # Разделяем блоки пустой строкой
    return full_description.strip() if full_description else "Описание не найдено"


def parse_reviews(soup):
    review_blocks = soup.find_all('div', class_='Review_description__ZQWh4')
    reviews = []
    for block in review_blocks:
        paragraphs = block.find_all('p')  # Извлекаем параграфы из каждого отзыва
        review_text = ' '.join(p.get_text(strip=True) for p in paragraphs)
        if review_text:
            reviews.append(review_text.strip())
    return reviews


def main(url: str):
    try:
        html = get_html(url)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Парсинг названия отеля
        hotel_name = parse_hotel_name(soup)
        print(f"Название отеля: {hotel_name}\n")
        
        # Парсинг адреса
        address = parse_address(soup)
        print(f"Адрес: {address}\n")
        
        # Парсинг услуг
        amenities = parse_amenities(soup)
        
        # Парсинг описания
        description = parse_description(soup)
        
        # Парсинг отзывов
        reviews = parse_reviews(soup)
        
        # Сохранение данных в JSON файл
        data = {
            "hotel_name": hotel_name,
            "address": address,
            "services": amenities,
            "description": description,
            "reviews": reviews
        }
        return data
    
    except Exception as e:
        return {
            "hotel_name": "",
            "address": "",
            "services": [],
            "description": "",
            "reviews": []
        }

