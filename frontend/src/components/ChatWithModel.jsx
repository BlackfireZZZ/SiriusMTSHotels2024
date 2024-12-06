import React, {useState} from "react";
import VoiceToText from "./VoiceToText";
import base_url from "../config";

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
                    <p>Внесите ваши правки</p>
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
                        position: "absolute", // Абсолютное позиционирование внутри контейнера
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
                    <p>Описание отеля</p>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        cols={10}
                        rows={5}
                        style={{width: "100%"}}
                        value={description}
                    />
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
