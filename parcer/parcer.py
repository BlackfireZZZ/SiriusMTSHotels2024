import time
from typing import List

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import csv


def click_negative_reviews_button(driver: webdriver):
    wait = WebDriverWait(driver, 10)

    try:
        # Шаг 1: Найти и нажать на кнопку, открывающую выпадающий список
        dropdown_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-qa="trigger"]')))
        dropdown_button.click()
        print("Выпадающий список открыт.")
        time.sleep(1)  # Небольшая пауза, чтобы дать время на рендеринг

        # Шаг 2: Дождаться появления выпадающего списка
        options_popup = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.QBZ4D.TsNTx')))

        # Шаг 3: Найти и кликнуть по кнопке "Сначала отрицательные"
        negative_reviews_button = options_popup.find_element(By.CSS_SELECTOR,
                                                             'button[data-index="2"][data-qa="byRatingAsc-option"]')
        negative_reviews_button.click()
        print("Кнопка 'Сначала отрицательные' нажата.")

    except Exception as e:
        print(f"Ошибка при нажатии на кнопку 'Сначала отрицательные': {e}")


# Функция для настройки драйвера
def setup_driver():
    options = Options()
    options.add_argument('--headless')  # запуск в фоновом режиме
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver


def parse_reviews(driver: webdriver, url: str, num: int, filename='reviews.csv'):
    driver.get(url)

    click_negative_reviews_button(driver)
    wait = WebDriverWait(driver, 20)

    # Нажимаем на кнопку "Еще отзывы", чтобы загрузить больше отзывов
    for i in range(num):
        try:
            load_more_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'div.ZfjL0 > button.Kw61r.FXx4u.iLk5Q')))
            load_more_button.click()
            time.sleep(2)  # Ждем некоторое время после нажатия
        except Exception as e:
            print(f"Не удалось нажать на кнопку 'Еще отзывы' или кнопка больше не доступна: {e}")
            break

    parent_container = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'qEMqC')))

    # Находим все отзывы внутри этого родительского контейнера
    review_elements = parent_container.find_elements(By.CLASS_NAME, 'root._9HnyE.esfDh.xa7LR')
    print(f'Количество найденных отзывов: {len(review_elements)}')

    for element in review_elements:
        try:
            profile_section = element.find_element(By.CLASS_NAME, 'l3aLW.ouyGq.sTBaV')
        except Exception as e:
            print(f"Ошибка при получении секции профиля: {e}")
            continue

        try:
            profile = profile_section.find_element(By.CLASS_NAME, 'Qmk1o')
        except Exception as e:
            print(f"Ошибка при получении профиля: {e}")
            continue

        try:
            starlist = profile.find_element(By.CLASS_NAME, 'Ia-4D.qiRU-.tzdr8')
        except Exception as e:
            print(f"Ошибка при получении списка звейтов: {e}")
            continue

        try:
            stars = starlist.find_elements(By.CLASS_NAME, 'LFBXk.KN22d')
            mark = sum([1 for star in stars if star.get_attribute('aria-selected') == 'true'])
        except Exception as e:
            print(f"Ошибка при получении оценки: {e}")
            continue

        try:
            text_div = element.find_element(By.CLASS_NAME, 'RYSdb')
        except Exception as e:
            print(f"Ошибка при получении текста: {e}")
            continue

        try:
            # Находим текст отзыва
            text_element = text_div.find_element(By.CLASS_NAME, '_1m7jk.TQ2-5.b9-76')
            text = text_element.text
        except Exception as e:
            text = "Текст отзыва не найден"
            print(f"Ошибка при получении текста: {e}")

        review = [text, mark]
        save_review_to_csv(review, filename)

    return


def save_review_to_csv(review: List, filename='reviews.csv'):
    with open(filename, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(review)


# Функция для записи в CSV файл
def save_reviews_to_csv(reviews: List, filename='reviews.csv'):
    # Если файл не существует, создаем его с заголовками
    try:
        with open(filename, mode='x', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['text', 'mark'])  # Заголовки колонок
    except FileExistsError:
        pass  # Файл уже существует

    # Записываем данные в файл
    with open(filename, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        for review in reviews:
            writer.writerow(review)


def main():
    url = 'https://travel.yandex.ru/hotels/moscow/khilton-moskva-leningradskaia/'
    driver = setup_driver()
    num = 115  # Количество загрузок новых отзывов

    try:
        parse_reviews(driver, url, num=num, filename='reviews.csv')
    finally:
        driver.quit()


if __name__ == '__main__':
    main()
