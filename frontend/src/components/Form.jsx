import React, { useEffect, useState } from "react";
import "../Forms.css";
import axios from "axios";
import base_url from "../config";

const Form = ({ formRef }) => {
    const [stage, setStage] = useState(1);
    const [hasHotel, setHasHotel] = useState(null);
    const [hotelLink, setHotelLink] = useState("");
    const [hotelInfo, setHotelInfo] = useState({
        name: "",
        stars: "",
        address: "",
        rooms: "",
        comment: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    let text;
    if (stage === 1) {
        text = 'Есть ли у вас отель, размещенный на других сайтах?';
    } else if (stage === 2 && hasHotel) {
        text = 'Пожалуйста, укажите ссылку на ваш отель';
    } else if (stage === 3) {
        text = 'Заполните информацию о вашем отеле';
    }

    const handleNextStage = () => {

        if (stage === 2) {
            // Очистка ошибки
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
        }

        // Если валидация прошла, увеличиваем стадию
        setStage((prevStage) => prevStage + 1);
    };

    const handlePrevStage = () => {
        setStage((prevStage) => (prevStage === 3 ? 1 : prevStage - 1));
    };
    const handleHotelInfoChange = (e) => {
        const { name, value } = e.target;
        setHotelInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Collected data:", { hasHotel, hotelLink, hotelInfo });
        alert("Данные отправлены!");
    };

    // Функция для расчета минимальной высоты в зависимости от stage
    const getMinHeight = () => {
        switch (stage) {
            case 1:
                return '30vw'; // Минимальная высота для stage 1
            case 2:
                return '30vw'; // Минимальная высота для stage 2
            case 3:
                return '50vw'; // Минимальная высота для stage 3
        }
    };





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
                                        style={{ transform: "translate3d(0px, -18.7745px, 0px)" }}
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
                                                    style={{width: '100%', /* Занимает всю ширину родительского элемента */
                                                        display: 'flex', /* Делаем контейнер flex-контейнером */
                                                        justifyContent: 'center'/* Выравниваем содержимое по центру по горизонтали */
                                                    }}
                                                >
                                                    <button onClick={() => {
                                                        setHasHotel(true);
                                                        handleNextStage();
                                                    }}
                                                            className="prev-button"
                                                    >
                                                        Да
                                                    </button>
                                                    <button onClick={() => {
                                                        setHasHotel(false);
                                                        setStage(3);
                                                    }}
                                                            className="prev-button"
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
                                                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                                                    <button onClick={handleNextStage} className="prev-button green-button">Отправить</button>
                                                    <button onClick={handlePrevStage} className="prev-button"
                                                    style={{width: '40%'}}>Назад</button>

                                                </div>
                                            )}

                                            {stage === 3 && (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-container">
                                                        <div className="form-left" style={{width: '650px'}}>
                                                            <div className="form-row">
                                                                <div>
                                                                    <label>
                                                                        Название:
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            value={hotelInfo.name}
                                                                            onChange={handleHotelInfoChange}
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label>
                                                                        Количество звезд:
                                                                        <input
                                                                            type="number"
                                                                            name="stars"
                                                                            value={hotelInfo.stars}
                                                                            min="1"
                                                                            max="5"
                                                                            onChange={handleHotelInfoChange}
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
                                                                <div>
                                                                    <label>
                                                                        Количество номеров:
                                                                        <input
                                                                            type="number"
                                                                            name="rooms"
                                                                            min="1"
                                                                            max="1000"
                                                                            value={hotelInfo.rooms}
                                                                            onChange={handleHotelInfoChange}
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-right">
                                                            <span className="wpcf7-form-control-wrap" data-name="textarea-312">
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
                                                                    placeholder="Добавьте ваше описание"
                                                                    value={hotelInfo.comment}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
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
                                                        }}
                                                    />
                                                    {hasHotel !== null && <button onClick={handlePrevStage}
                                                                                  className="wpcf7-form-control has-spinner wpcf7-submit prev-button"
                                                    style={{width: "20%"}}>
                                                        Назад
                                                    </button>}
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
