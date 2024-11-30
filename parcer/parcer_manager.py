from parcer import main


urls = [
    'https://travel.yandex.ru/hotels/krasnodar/marton-palace/',
    'https://travel.yandex.ru/hotels/krasnodar/marton-palermo/',
    'https://travel.yandex.ru/hotels/krasnodar/ibis/',
    'https://travel.yandex.ru/hotels/krasnodar/marton-milan/',
    'https://travel.yandex.ru/hotels/krasnodar/golden-tulip-krasnodar/',
    'https://travel.yandex.ru/hotels/krasnodar/d-otel/',
    'https://travel.yandex.ru/hotels/krasnodar/carat-by-undersun/',
    'https://travel.yandex.ru/hotels/krasnodar/marton-lion/',
    'https://travel.yandex.ru/hotels/krasnodar/triumf/',
    'https://travel.yandex.ru/hotels/krasnodar/amici-grand-hotel/',
    'https://travel.yandex.ru/hotels/krasnodar/labirint/',

]

for url in urls:
    main(url)
