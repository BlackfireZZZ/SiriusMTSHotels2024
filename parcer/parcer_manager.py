from parcer import main


urls = [
    'https://travel.yandex.ru/hotels/tver/gaid-park/',
    'https://travel.yandex.ru/hotels/tver/isaevskii/',
    'https://travel.yandex.ru/hotels/tver/orion/',
    'https://travel.yandex.ru/hotels/tver/gubernator/',
    'https://travel.yandex.ru/hotels/tver/kristall-palas/',
    'https://travel.yandex.ru/hotels/tver/sitara/',
    'https://travel.yandex.ru/hotels/tver/seliger/',
    'https://travel.yandex.ru/hotels/tver/golden-plaza/',
    'https://travel.yandex.ru/hotels/tver/otel-tver/',
    'https://travel.yandex.ru/hotels/tver/oktiabrskaia/',
    'https://travel.yandex.ru/hotels/tver/calypso/',
    'https://travel.yandex.ru/hotels/tver-oblast/kolyba/',
    'https://travel.yandex.ru/hotels/tver-oblast/sanni-leik/',

]

for url in urls:
    main(url)
