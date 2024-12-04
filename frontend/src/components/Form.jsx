import React, { useEffect, useState } from "react";
import "../Forms.css";
import "../TextStyleSelector.css"
import axios from "axios";
import base_url from "../config";

const Form = ({ formRef }) => {
    const [stage, setStage] = useState(1);
    const [hasHotel, setHasHotel] = useState(null);
    const [hotelLink, setHotelLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState(1);
    const [hotelInfo, setHotelInfo] = useState({
        name: "",
        address: "",
        rooms: "",
        comment: "",
        style: "formal",
        services: [], // Новый массив для хранения списка услуг
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [serviceError, setServiceError] = useState(""); // Состояние для ошибки услуг

    const exampleText = {
        formal: "We cordially invite you to partake in our exquisite event, designed to leave an indelible mark upon your esteemed experience.",
        neutral: "Join us for an event that promises to be both enjoyable and memorable.",
        informal: "Hey, come hang out with us! It's going to be fun, promise!",
    };

    const handleStyleChange = (event) => {
        const newStyle = event.target.value;
        setHotelInfo((prev) => ({...prev, style: newStyle}));
    };

    let text;
    if (stage === 1) {
        text = 'Есть ли у вас отель, размещенный на других сайтах?';
    } else if (stage === 2 && hasHotel) {
        text = 'Пожалуйста, укажите ссылку на ваш отель';
    } else if (stage === 3) {
        text = 'Выберите стиль описания отеля';
    } else if (stage === 4) {
        text = 'Заполните информацию о вашем отеле';
    }

    const handleNextStage = async () => {
        if (stage === 2) {
            setErrorMessage("");

            // Проверка, что ссылка начинается с https://
            if (!hotelLink.startsWith("https://")) {
                setErrorMessage("Некорректная ссылка");
                return;
            }

            // Список разрешённых доменов
            const allowedDomains = ["https://travel.yandex.ru/"];

            // Проверка, входит ли домен в список доступных
            if (!allowedDomains.some((domain) => hotelLink.startsWith(domain))) {
                setErrorMessage("Мы не можем получить информацию с этого сайта");
                return;
            }

            // Отправка запроса на сервер
            setLoading(true);
            try {
                const response = await fetch(`${base_url}/parse`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({url: hotelLink}),
                });

                if (!response.ok) {
                    setErrorMessage("Ошибка при получении данных с сервера");
                    return;
                }

                const data = await response.json();

                // Обновляем информацию об отеле
                setHotelInfo((prev) => ({
                    ...prev,
                    name: data.name,
                    address: data.address,
                    services: data.services,
                }));

                // Переход к следующему этапу
                setStage((prev) => prev + 1);
            } catch (error) {
                setErrorMessage("Не удалось получить данные: " + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setStage((prev) => prev + 1);
        }
    };


    const handlePrevStage = () => {
        setStage((prevStage) => (prevStage === 3 ? 1 : prevStage - 1));
    };
    const handleHotelInfoChange = (e) => {
        const {name, value} = e.target;
        setHotelInfo((prevInfo) => ({...prevInfo, [name]: value}));
    };

    // Функция добавления услуги
    const addService = () => {
        // Проверяем, есть ли пустая услуга
        if (hotelInfo.services.length > 0 && hotelInfo.services[hotelInfo.services.length - 1] === "") {
            setServiceError("Пустая услуга");
            return;
        }

        // Убираем ошибку и добавляем новую пустую услугу
        setServiceError("");
        setHotelInfo((prevInfo) => ({
            ...prevInfo,
            services: [...prevInfo.services, ""],
        }));
    };


// Функция удаления услуги по индексу
    const removeService = (index) => {
        setHotelInfo((prevInfo) => ({
            ...prevInfo,
            services: prevInfo.services.filter((_, i) => i !== index), // Удаляем услугу
        }));
    };

// Функция обновления текста услуги
    const updateService = (index, value) => {
        setHotelInfo((prevInfo) => {
            const updatedServices = [...prevInfo.services];
            updatedServices[index] = value; // Обновляем текст услуги
            return {...prevInfo, services: updatedServices};
        });
    };


    const handleSubmit = async (e) => {
        setErrorMessage("");
        e.preventDefault(); // Предотвращает перезагрузку страницы

        const requestData = {
            name: hotelInfo.name,
            address: hotelInfo.address,
            rooms: hotelInfo.rooms,
            services: hotelInfo.services, // Услуги передаются как массив
            comment: hotelInfo.comment,
        };

        // Отправка запроса на сервер
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/hotel/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                setErrorMessage("Не удалось создать/обновить отель");
            }

            const data = await response.json();

            // Обработка успешного ответа
            console.log("Ответ от сервера:", data);
        } catch (error) {
            // Обработка ошибок
            setErrorMessage("Не удалось создать/обновить отель: " + error.message);
        } finally {
            setLoading(false);
        }
    };


    // Функция для расчета минимальной высоты в зависимости от stage
    const getMinHeight = () => {
        switch (stage) {
            case 1:
                return '30vw'; // Минимальная высота для stage 1
            case 2:
                return '30vw'; // Минимальная высота для stage 2
            case 3:
                return '40vw'; // Минимальная высота для stage 3
            case 4:
                return '60vw'; // Минимальная высота для stage 4
        }
    };

    useEffect(() => {
        if (!loading) return;

        const interval = setInterval(() => {
            setDots((prev) => (prev === 3 ? 1 : prev + 1));
        }, 700);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <section className="vc_row liquid-row-responsive-634d4b2e4273d liquid-row-shadowbox-634d4b2e42751"
                 style={{
                     marginBottom: '20px',
                     minHeight: getMinHeight(),
                 }}>
            <div
                className="ld-container container"
                style={{
                    position: "relative",
                    height: "100%",
                }}
            >
                <div className="row ld-row ld-row-outer">
                    <div className="wpb_column vc_column_container vc_col-sm-12 liquid-column-634d4b2e42856">
                        <div className="vc_column-inner">
                            <div className="wpb_wrapper">
                                <div
                                    id="ld_images_group_element_634d4b2e42909"
                                    className="lqd-imggrp-single ld_images_group_element_634d4b2e42909"
                                >
                                    <div
                                        className="lqd-imggrp-img-container"
                                        data-parallax="true"
                                        data-parallax-from='{"y":25}'
                                        data-parallax-to='{"y":-80}'
                                        data-parallax-options='{"overflowHidden":false,"ease":"linear","start":"top bottom"}'
                                        style={{transform: "translate3d(0px, -18.7745px, 0px)"}}
                                    >
                                        <figure className="loaded">
                                            <img
                                                src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/01/dots-1.svg"
                                                className="attachment-full size-full"
                                                alt=""
                                                loading="lazy"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="z-index-2 pull-down-column wpb_column vc_column_container vc_col-sm-12 liquid-column-634d4b2e43776 liquid-column-responsive-634d4b2e43778 vc_col-has-fill"
                        data-parallax="true"
                        data-parallax-from='{"y":-90}'
                        data-parallax-to='{"y":35}'
                        data-parallax-options='{"ease":"linear","start":"top bottom"}'
                    >
                        <div
                            className="vc_column-inner  vc_custom_1599657780294"
                            style={{
                                borderRadius: "0px 0px 15px 15px",
                                transform: "translate3d(0px, -62.4625px, 0px)",
                            }}
                        >
                            <div className="wpb_wrapper">
                                <div
                                    ref={formRef}
                                    className="ld-fancy-heading mask-text ld_fancy_heading_634d4b2e43890"
                                >
                                    <h4
                                        className="ld-fh-element lqd-highlight-underline lqd-highlight-grow-left text-decoration-default lqd-split-words ca-initvalues-applied lqd-animations-done split-text-applied"
                                        data-split-text="true"
                                        data-split-options='{"type":"words"}'
                                        data-custom-animations="true"
                                        data-ca-options='{"triggerHandler":"inview","animationTarget":".lqd-words > .split-inner","duration":"1000","delay":"120","ease":"power4.out","direction":"forward","initValues":{"y":70},"animations":{"y":0}}'
                                    >
                                        <div
                                            style={{position: "relative", display: "inline-block"}}
                                            className="split-unit lqd-words"
                                        >
                                            <span className="split-inner">{text}</span>
                                        </div>
                                    </h4>
                                </div>
                                <div
                                    id="ld_cf7_634d4b2e4430b"
                                    className="lqd-contact-form lqd-contact-form-inputs-md lqd-contact-form-inputs-filled lqd-contact-form-inputs-round lqd-contact-form-button-lg lqd-contact-form-button-circle ld_cf7_634d4b2e4430b vc_custom_1599654723861"
                                >
                                    <div role="form" className="wpcf7" id="wpcf7-f75-p5-o1">
                                        <div className="form-container">
                                            {stage === 1 && (
                                                <div
                                                    style={{
                                                        width: '100%', /* Занимает всю ширину родительского элемента */
                                                        display: 'flex', /* Делаем контейнер flex-контейнером */
                                                        justifyContent: 'center'/* Выравниваем содержимое по центру по горизонтали */
                                                    }}
                                                >
                                                    <button onClick={() => {
                                                        setHasHotel(true);
                                                        handleNextStage();
                                                    }}
                                                            className="prev-button"
                                                            style={{width: '80px'}}
                                                    >
                                                        Да
                                                    </button>
                                                    <button onClick={() => {
                                                        setHasHotel(false);
                                                        setStage(3);
                                                    }}
                                                            className="prev-button"
                                                            style={{width: '80px'}}
                                                    >
                                                        Нет
                                                    </button>
                                                </div>
                                            )}

                                            {stage === 2 && hasHotel && (
                                                <div>
                                                    <input
                                                        type="url"
                                                        placeholder="Введите ссылку"
                                                        value={hotelLink}
                                                        onChange={(e) => setHotelLink(e.target.value)}
                                                    />
                                                    {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                                                    <button onClick={handlePrevStage} className="prev-button"
                                                            style={{width: '40%'}}>Назад
                                                    </button>
                                                    <button onClick={handleNextStage}
                                                            className="prev-button green-button">Отправить
                                                    </button>
                                                </div>
                                            )}
                                            {stage === 3 && (
                                                <div className="text-style-selector">
                                                    <div className="content">
                                                        {/* Левая часть с чекбоксами */}
                                                        <div className="options">
                                                            <div className="option">
                                                                <input
                                                                    type="radio"
                                                                    name="textStyle"
                                                                    id="formalStyle"
                                                                    value="formal"
                                                                    onChange={handleStyleChange}
                                                                    defaultChecked
                                                                />
                                                                <label htmlFor="formalStyle">Официальный</label>
                                                            </div>
                                                            <div className="option">
                                                                <input
                                                                    type="radio"
                                                                    name="textStyle"
                                                                    id="neutralStyle"
                                                                    value="neutral"
                                                                    onChange={handleStyleChange}
                                                                />
                                                                <label htmlFor="neutralStyle">Нейтральный</label>
                                                            </div>
                                                            <div className="option">
                                                                <input
                                                                    type="radio"
                                                                    name="textStyle"
                                                                    id="informalStyle"
                                                                    value="informal"
                                                                    onChange={handleStyleChange}
                                                                />
                                                                <label htmlFor="informalStyle">Неформальный</label>
                                                            </div>
                                                        </div>

                                                        {/* Правая часть с текстом */}
                                                        <div className="example-text">
                                                            <p>{exampleText[hotelInfo.style]}</p>
                                                        </div>
                                                    </div>

                                                    {/* Кнопки */}
                                                    <div className="buttons">
                                                        <button
                                                            onClick={handlePrevStage}
                                                            className="prev-button text-style-button"
                                                            style={{width: "100px"}}
                                                        >
                                                            Назад
                                                        </button>
                                                        <button
                                                            onClick={handleNextStage}
                                                            className="prev-button text-style-button"
                                                            style={{width: "100px"}}
                                                        >
                                                            Далее
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {stage === 4 && (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-container">
                                                        <div className="form-left" style={{width: '900px'}}>
                                                            <div className="form-row">
                                                                <div style={{width: '100%'}}>
                                                                    <label style={{width: '100%'}}>
                                                                        Название:
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            value={hotelInfo.name}
                                                                            onChange={handleHotelInfoChange}
                                                                            style={{width: '100%'}}
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-row">
                                                                <div>
                                                                    <label>
                                                                        Адрес:
                                                                        <input
                                                                            type="text"
                                                                            name="address"
                                                                            value={hotelInfo.address}
                                                                            onChange={handleHotelInfoChange}
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                                <div style={{width: '100px'}}>
                                                                    <label style={{width: '100%'}}>
                                                                        Количество номеров:
                                                                        <input
                                                                            type="number"
                                                                            name="rooms"
                                                                            min="1"
                                                                            max="1000"
                                                                            value={hotelInfo.rooms}
                                                                            onChange={handleHotelInfoChange}
                                                                            style={{width: '100%'}}
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <span className="wpcf7-form-control-wrap"
                                                                  data-name="textarea-312">
                                                                <p>
                                                                    Дополнительная информация
                                                                </p>
                                                                <textarea
                                                                    onChange={(e) =>
                                                                        setHotelInfo((prevInfo) => ({
                                                                            ...prevInfo,
                                                                            comment: e.target.value,
                                                                        }))
                                                                    }
                                                                    name="textarea-312"
                                                                    cols={10}
                                                                    rows={5}
                                                                    className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                                                                    aria-required="true"
                                                                    aria-invalid="false"
                                                                    placeholder="Ваш комментарий"
                                                                    value={hotelInfo.comment}
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="form-right">

                                                            <div>
                                                                <p>Услуги отеля</p>
                                                                <div className="services-container">
                                                                    {hotelInfo.services.map((service, index) => (
                                                                        <div key={index} className="service-item">
                                                                            {/* Поле ввода для услуги */}
                                                                            <input
                                                                                type="text"
                                                                                value={service}
                                                                                onChange={(e) => updateService(index, e.target.value)}
                                                                                placeholder="Введите услугу"
                                                                            />
                                                                            {/* Кнопка удаления услуги */}
                                                                            <button
                                                                                type="button"
                                                                                className="delete-button"
                                                                                onClick={() => removeService(index)}
                                                                            >
                                                                                x
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {/* Кнопка добавления новой услуги */}
                                                                <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "10px"
                                                                }}>
                                                                    <button type="button" className="service-button"
                                                                            onClick={addService}>
                                                                        +
                                                                    </button>
                                                                    {serviceError && <span
                                                                        className="error-message">{serviceError}</span>}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                                                    {loading && (
                                                            <div>
                                                                Ожидаем ответ от сервера{".".repeat(dots)}
                                                            </div>
                                                    )}
                                                    {hasHotel !== null && <button onClick={handlePrevStage}
                                                                                  className="wpcf7-form-control has-spinner wpcf7-submit prev-button"
                                                                                  style={{width: "20%"}}>
                                                        Назад
                                                    </button>}
                                                    <input
                                                        type="submit"
                                                        value="Отправить"
                                                        className="wpcf7-form-control has-spinner wpcf7-submit"
                                                        style={{
                                                            backgroundColor: "#ff0032ff",
                                                            borderColor: "#ff0032ff",
                                                            borderRadius: "50px",
                                                            padding: "10px 20px",
                                                            position: "relative",
                                                            bottom: "10px",
                                                            left: "10px",
                                                            top: "20px",
                                                            margin: "5px",
                                                            width: "20%",
                                                            height: '60px'
                                                        }}
                                                    />
                                                </form>

                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form;

