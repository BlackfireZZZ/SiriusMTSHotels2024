import React, {useState} from "react";
import VoiceToText from "./VoiceToText";
import base_url from "../config";
import Cookies from "js-cookie";

const Stage5 = ({ handlePrevStage, hotelInfo, setHotelInfo, errorMessage, setErrorMessage,
    loading, setLoading, stage, setStage, dots, hasHotel, setDescription
    }) => {
    const [serviceError, setServiceError] = useState(""); // Состояние для ошибки услуг

    const handleHotelCommentDetected = (text) => {
        setHotelInfo((prevInfo) => ({
            ...prevInfo,
            comment: `${prevInfo.comment} ${text}`.trim(),
        }));
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
        setServiceError("");
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
            description_type: hotelInfo.style,
            reviews: hotelInfo.reviews,
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
            setDescription(data.description)
            setStage((prev) => prev + 1);
            Cookies.set("stage", stage, {expires: 7});
        } catch (error) {
            // Обработка ошибок
            setErrorMessage("Не удалось создать/обновить отель: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    <span
                        className="wpcf7-form-control-wrap"
                        data-name="textarea-312"
                        style={{
                            position: "relative",
                            display: "block"
                        }} // Контейнер для относительного позиционирования
                    >
                                                                <p>Дополнительная информация</p>
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
                                                                    style={{
                                                                        width: "100%", // Растянуть поле по ширине
                                                                        boxSizing: "border-box", // Учитывать padding
                                                                        position: "relative", // Необязательное позиционирование для текстового поля
                                                                    }}
                                                                />
                                                                <div style={{
                                                                    position: "absolute", // Абсолютное позиционирование внутри контейнера
                                                                    bottom: "10px", // Отступ от нижнего края
                                                                    right: "10px", // Отступ от правого края
                                                                    cursor: "pointer",
                                                                    width: '45px',
                                                                    height: '45px',
                                                                }}>
                                                                <VoiceToText
                                                                    onTextDetected={handleHotelCommentDetected}

                                                                />
                                                                </div>
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
    )
}


export default Stage5
