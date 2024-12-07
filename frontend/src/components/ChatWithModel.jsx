import React, {useEffect, useState} from "react";
import VoiceToText from "./VoiceToText";
import base_url from "../config";
import DescriptionBlock from "./DescriptionBlock";


const ChatWithModel = ({ errorMessage, setErrorMessage, loading, setLoading, description, setDescription, dots
                       }) => {
    const [comment, setComment] = useState("");

    const handleNewSubmit = async (e) => {
        setErrorMessage("");
        setLoading(true);
        e.preventDefault(); // Предотвращает перезагрузку страницы

        const requestData = {
            comment: comment
        }
        try {
            const response = await fetch(`${base_url}/conversation/add_message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                setErrorMessage("Не удалось обновить описание");
                return;
            }

            const data = await response.json();
            setDescription(data.description)
            setComment("");
        } catch (error) {
            // Обработка ошибок
            setErrorMessage("Не удалось обновить описание: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCommentDetected = (text) => {
        setComment((prev) => `${prev} ${text}`.trim());
    };

    const handleCopy = () => {
        // Копирование текста без учета разметки Markdown
        navigator.clipboard.writeText(description);
        setButtonText("Copied");
    };

    const [buttonText, setButtonText] = useState("Copy");

    // Сбрасываем текст кнопки при изменении description
    useEffect(() => {
        setButtonText("Copy");
    }, [description]);

    return (
        <form onSubmit={handleNewSubmit} style={{width: '100%'}}>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    width: '100%'
                }}
            >
                <div style={{
                    flex: "1 1 calc(50% - 15px)",
                    position: "relative",
                    display: "block"
                }} // Контейнер для относительного позиционирования
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "10px",// Размещает элементы с равными отступами
                        }}
                    >
                        <p>Внесите ваши правки</p>
                    </div>
                    <textarea
                        name="edits"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        cols={10}
                        rows={5}
                        style={{width: "100%"}}
                        placeholder="Ваши правки"
                    />
                    <div style={{
                        position: "relative", // Абсолютное позиционирование внутри контейнера
                        bottom: "10px", // Отступ от нижнего края
                        right: "10px", // Отступ от правого края
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}>
                        <VoiceToText
                            onTextDetected={handleCommentDetected}
                        />
                    </div>

                </div>
                <div style={{flex: "1 1 calc(50% - 15px)"}}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between", // Размещает элементы с равными отступами
                        }}
                    >
                        <p style={{margin: 0}}>Полученное описание</p>
                        {description && (
                            <button
                                type="button"
                                onClick={handleCopy}
                                style={{
                                    position: 'relative',
                                    bottom: '10px',
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    backgroundColor: "#bdbdbd",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                    <DescriptionBlock description={description}/>
                </div>


            </div>

            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            {loading && (
                <div>
                    Ожидаем ответ от сервера{".".repeat(dots)}
                </div>
            )}

            <input
                type="submit"
                value="Внести правки"
                className="wpcf7-form-control has-spinner wpcf7-submit"
                style={{
                    position: "relative",
                    left: "10px",
                    backgroundColor: "#ff0032ff",
                    borderColor: "#ff0032ff",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    margin: "15px 10px",
                    width: "20%",
                    height: "60px",
                    display: "block",
                }}
            />
        </form>
    )
}

export default ChatWithModel
