import React from "react";

const Stage3 = ({ hotelInfo, handleStyleChange, handlePrevStage, handleNextStage }) => {

    const exampleText = {
        formal: "We cordially invite you to partake in our exquisite event, designed to leave an indelible mark upon your esteemed experience.",
        neutral: "Join us for an event that promises to be both enjoyable and memorable.",
        informal: "Hey, come hang out with us! It's going to be fun, promise!",
    };

    return (
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
    );
}


export default Stage3;