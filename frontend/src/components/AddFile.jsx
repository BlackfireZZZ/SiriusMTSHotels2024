import React from "react";

const AddFile = ({ hotelInfo, onFileAdd, onFileRemove, fileError, handlePrevStage, handleNextStage}) => {
    return (
        <div
            className="col-md-3 mb-4"
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                className="row"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                }}
            >
                {/* Левая колонка: Кнопка загрузки */}
                <div
                    className="col-md-3 mb-4"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                        <div
                            onMouseEnter={(e) => {
                                e.target.style.transform = "scale(0.95)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            <a
                                style={{
                                    display: "inline-block",
                                    padding: "12px",
                                    borderRadius: "30px",
                                    border: "3px solid red",
                                    color: "black",
                                    backgroundColor: "white",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    width: "120px", // Ширина кнопки фиксирована
                                    marginLeft: "30px",
                                }}
                            >
                                Загрузить файл
                            </a>
                        </div>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={onFileAdd}
                        style={{display: "none"}}
                    />
                </div>

                {/* Правая колонка: Список файлов */}
                <div
                    className="col-md-3"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "150px",
                        marginLeft: "200px", // Отступ слева для сдвига списка файлов
                    }}
                >
                    {hotelInfo.files.map((file, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "10px",
                                maxWidth: "100%",
                            }}
                        >
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
                                onClick={() => onFileRemove(index)}
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
                    ))}
                </div>
            </div>

            {fileError && (
                <p style={{color: "red", marginBottom: "20px"}}>{fileError}</p>
            )}
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


    );
};

export default AddFile;
