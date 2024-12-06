import React, { useEffect, useState } from "react";
import "../Forms.css";
import "../TextStyleSelector.css"
import axios from "axios";
import base_url from "../config";
import Cookies from "js-cookie";
import VoiceToText from "./VoiceToText";
import AddFile from "./AddFile";
import Stage3 from "./Stage3";
import Stage5 from "./Stage5";
import ChatWithModel from "./ChatWithModel";

const Form = ({ formRef }) => {
    // const [stage, setStage] = useState(+Cookies.get("stage") || 1);
    const [stage, setStage] = useState(1);
    const [hasHotel, setHasHotel] = useState(null);
    const [hotelLink, setHotelLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState(1);
    const [description, setDescription] = useState("");
    const [hotelInfo, setHotelInfo] = useState({
        name: "",
        address: "",
        rooms: "",
        comment: "",
        style: "formal",
        services: [], // Новый массив для хранения списка услуг
        files: [], // Новый список для фото
    });
    const [fileError, setFileError] = useState("");

    const [errorMessage, setErrorMessage] = useState("");



    const handleStyleChange = (event) => {
        const newStyle = event.target.value;
        setHotelInfo((prev) => ({...prev, style: newStyle}));
    };

    const handleFileAdd = (event) => {
        const newFile = event.target.files[0];
        if (!newFile) return;

        if (hotelInfo.files.length >= 10) {
            setFileError("Максимум 10 файлов.");
            return;
        }

        setHotelInfo((prevInfo) => ({
            ...prevInfo,
            files: [...prevInfo.files, newFile],
        }));

        setFileError(""); // Очистить ошибку, если файл успешно добавлен
    };

    const handleFileRemove = (index) => {
        setFileError("");
        setHotelInfo((prevInfo) => ({
            ...prevInfo,
            files: prevInfo.files.filter((_, i) => i !== index),
        }));
    };


    let text;
    if (stage === 1) {
        text = 'Есть ли у вас отель, размещенный на других сайтах?';
    } else if (stage === 2 && hasHotel) {
        text = 'Пожалуйста, укажите ссылку на ваш отель';
    } else if (stage === 3) {
        text = 'Выберите стиль описания отеля';
    } else if (stage === 4) {
        text = 'Добавьте фото вашего отеля'
    } else if (stage === 5) {
        text = 'Заполните информацию о вашем отеле';
    } else if (stage === 6) {
        text = 'Внесите правки в описание отеля';
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
            const allowedDomains = ["https://ostrovok.ru/"];

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
                Cookies.set("stage", stage, {expires: 7});
            } catch (error) {
                setErrorMessage("Не удалось получить данные: " + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setStage((prev) => prev + 1);
            Cookies.set("stage", stage, {expires: 7});
        }
    };


    const handlePrevStage = () => {
        setStage((prevStage) => (prevStage === 3 ? 1 : prevStage - 1));
        Cookies.set("stage", stage, {expires: 7});
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
                return '40vw'; // Минимальная высота для stage 4
            case 5:
                return '60vw'; // Минимальная высота для stage 4
            case 6:
                return '40vw';
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
                                                    {loading && (
                                                        <div>
                                                            Ожидаем ответ от сервера{".".repeat(dots)}
                                                        </div>
                                                    )}
                                                    <button onClick={handlePrevStage} className="prev-button"
                                                            style={{width: '40%'}}>Назад
                                                    </button>
                                                    <button onClick={handleNextStage}
                                                            className="prev-button green-button">Отправить
                                                    </button>
                                                </div>
                                            )}
                                            {stage === 3 && (
                                                <Stage3 hotelInfo={hotelInfo} handleStyleChange={handleStyleChange}
                                                handlePrevStage={handlePrevStage} handleNextStage={handleNextStage}/>
                                            )}

                                            {stage === 4 && (
                                                <AddFile hotelInfo={hotelInfo} onFileAdd={handleFileAdd}
                                                         onFileRemove={handleFileRemove} fileError={fileError}
                                                         handlePrevStage={handlePrevStage} handleNextStage={handleNextStage}
                                                />
                                            )}

                                            {stage === 5 && (
                                                <Stage5 handlePrevStage={handlePrevStage} errorMessage={errorMessage}
                                                setErrorMessage={setErrorMessage} hotelInfo={hotelInfo}
                                                setHotelInfo={setHotelInfo} loading={loading} setLoading={setLoading}
                                                dots={dots} hasHotel={hasHotel} setDescription={setDescription}
                                                />
                                            )}
                                            {stage === 6 && (
                                                <ChatWithModel errorMessage={errorMessage} setErrorMessage={setErrorMessage}
                                                               loading={loading} setLoading={setLoading}
                                                               description={description} setDescription={setDescription}
                                                               dots={dots}/>
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

