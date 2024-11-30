import React, { useEffect, useState } from "react";
import "../Forms.css";
import axios from "axios";
import base_url from "../config";

const Form = ({ formRef }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState(1);
    const [error, setError] = useState('');

    // Effect for updating loading animation
    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setDots((prevDots) => (prevDots % 3) + 1);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [loading]);

    // Function to handle file upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Set the selected file
        if (selectedFile) {
            // Проверяем, является ли файл .csv
            if (selectedFile.type !== 'text/csv') {
                setError('Пожалуйста, загрузите файл формата .csv');
                setFile(null); // Сбрасываем файл
            } else {
                setError(''); // Сбрасываем ошибку, если файл корректный
                setFile(selectedFile);
            }
        }

    };

    const handleFileRemove = () => {
        setFile(null); // Очищаем состояние файла
    };

    function simulateServerResponse() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Server response");
            }, 2000); // Задержка в 2 секунды
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // sleep 3 seconds
        simulateServerResponse().then(() => {
            setLoading(false)
            setResponse([3, 3, 1, 0, 0]);
        })


        // try {
        //     let result;
        //
        //     if (file) {
        //         // Если файл существует, используем FormData и multipart/form-data
        //         const formData = new FormData();
        //         formData.append('file', file);
        //
        //         const url = base_url + '/model/upload'; // URL для загрузки файла
        //         result = await axios.post(url, formData, {
        //             headers: { 'Content-Type': 'multipart/form-data' },
        //             responseType: 'blob', // Для загрузки файла ожидаем Blob
        //         });
        //
        //         // Получаем заголовок Content-Disposition для извлечения имени файла
        //         const contentDisposition = result.headers['content-disposition'];
        //         let fileName = 'downloaded_file.csv';
        //         if (contentDisposition) {
        //             const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        //             if (fileNameMatch && fileNameMatch.length > 1) {
        //                 fileName = fileNameMatch[1];
        //             }
        //         }
        //
        //         // Создаем ссылку для скачивания файла
        //         const urlBlob = window.URL.createObjectURL(new Blob([result.data]));
        //         const link = document.createElement('a');
        //         link.href = urlBlob;
        //         link.setAttribute('download', fileName); // Имя файла для скачивания
        //         document.body.appendChild(link);
        //         link.click();
        //         link.remove();
        //         window.URL.revokeObjectURL(urlBlob); // Освобождаем память
        //
        //     } else {
        //         // Если отправляем текст, используем application/json
        //         if (!text) {
        //             setError('Пожалуйста, введите текстовый запрос.');
        //             return;
        //         }
        //
        //         const url = base_url + '/model/apply'; // URL для обработки текста
        //         result = await axios.post(url, { text: text }, {
        //             headers: { 'Content-Type': 'application/json' },
        //         });
        //
        //         // Обработка ответа с текстом (например, список)
        //         setResponse(result.data); // Ожидаемый ответ как список или данные
        //     }
        //
        // } catch (error) {
        //     console.error("Ошибка при отправке POST-запроса:", error);
        // } finally {
        //     setLoading(false);
        //     setText(''); // Сброс текстового поля
        //     setFile(null); // Сброс файла
        //     setError(''); // Сброс сообщения об ошибке
        // }
    };



    return (
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
                                        style={{ position: "relative", display: "inline-block" }}
                                        className="split-unit lqd-words"
                                    >
                                        <span className="split-inner"> Попробуйте прямо сейчас</span>
                                    </div>
                                </h4>
                            </div>
                            <div className="ld-fancy-heading ld_fancy_heading_634d4b2e43f1a">
                                <p className="ld-fh-element lqd-highlight-underline lqd-highlight-grow-left text-decoration-default">
                                    Испытайте модель, которая поможет легко пронализировать отызвы на ваш курс
                                </p>
                            </div>
                            <div
                                id="ld_cf7_634d4b2e4430b"
                                className="lqd-contact-form lqd-contact-form-inputs-md lqd-contact-form-inputs-filled lqd-contact-form-inputs-round lqd-contact-form-button-lg lqd-contact-form-button-circle ld_cf7_634d4b2e4430b vc_custom_1599654723861"
                            >
                                <div role="form" className="wpcf7" id="wpcf7-f75-p5-o1">
                                    <form
                                        onSubmit={handleSubmit}
                                        method="post"
                                        className="wpcf7-form init"
                                        noValidate="novalidate"
                                    >
                                        <div className="row">
                                            <div className="col-md-9 mb-4">
                                                  <span className="wpcf7-form-control-wrap" data-name="textarea-312">
                                                    <textarea
                                                        onChange={(e) => setText(e.target.value)}
                                                        name="textarea-312"
                                                        cols={10}
                                                        rows={5}
                                                        className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                                                        aria-required="true"
                                                        aria-invalid="false"
                                                        placeholder="Отзыв"
                                                        style={{marginBottom: "5px"}}
                                                    />
                                                  </span>
                                            </div>

                                            <div
                                                className="col-md-3 mb-4"
                                                style={{display: "flex", alignItems: "center", flexDirection: "column"}}
                                            >
                                                <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                                                    <div
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'scale(0.95)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'scale(1)';
                                                        }}
                                                    >
                                                        <a
                                                            style={{
                                                                display: "inline-block",
                                                                padding: "12px",
                                                                borderRadius: "10px",
                                                                border: "2px solid black", // Черная обводка
                                                                color: "black", // Черный текст
                                                                backgroundColor: "white", // Белый фон
                                                                textDecoration: "none",
                                                                textAlign: "center",
                                                                width: "70%",
                                                                marginRight: "10px",
                                                            }}
                                                        >
                                                            Загрузить файл
                                                        </a>
                                                    </div>
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    style={{display: "none"}} // Hidden input
                                                />

                                                {file && (
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginTop: "10px",
                                                        maxWidth: "70%"
                                                    }}>
                                                        <p
                                                            style={{
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                marginRight: "10px",
                                                                flex: "1",
                                                            }}
                                                        >
                                                            {file.name}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={handleFileRemove}
                                                            style={{
                                                                backgroundColor: "transparent",
                                                                border: "none",
                                                                cursor: "pointer",
                                                                color: "red",
                                                                fontSize: "16px",
                                                            }}
                                                        >
                                                            &times; {/* Крестик */}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {error && (
                                            <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>
                                        )}
                                        <input
                                            type="submit"
                                            value="Отправить"
                                            className="wpcf7-form-control has-spinner wpcf7-submit"
                                            style={{
                                                borderRadius: "50px",
                                                padding: "10px 20px",
                                                position: "relative",
                                                bottom: "10px",
                                                left: "10px",
                                                margin: "5px",
                                                width: "20%",
                                            }}
                                        />
                                        <div className="wpcf7-response-output" aria-hidden="true"/>
                                    </form>


                                    {/* Display categories if response is received */}
                                    {response && (
                                        <div className="category-results">
                                            <h6 style={{color: "black", fontWeight: "bold"}}>Полученный результат:</h6>
                                            <div className="checkbox-group" style={{padding: "0px 0px 0px 10px"}}>
                                                {['Практика', 'Теория', 'Преподаватель', 'Технологии', 'Релевантность'].map((field, index) => (
                                                    <div
                                                        className="category-container"
                                                        key={field}
                                                        style={{
                                                            borderColor: response[index] === 3 ? '#218838' : response[index] === 1 ? '#c82333' : response[index] === 2 ? '#5a6268' : '#2d2d2d',
                                                            backgroundColor: response[index] === 3 ? '#28a745' : response[index] === 1 ? '#dc3545' : response[index] === 2 ? '#6c757d': '#ffffff',
                                                            color: response[index] === 0 ? '#2d2d2d' : '#ffffff',
                                                            borderWidth: '2px',
                                                            borderRadius: '15px',
                                                            marginBottom: '5px',
                                                            width: '180px',
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                padding: '10px',
                                                                margin: '0px',
                                                                cursor: 'pointer',
                                                                width: '100%',
                                                            }}>
                                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;

