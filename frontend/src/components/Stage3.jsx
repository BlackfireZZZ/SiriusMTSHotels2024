import React from "react";

const Stage3 = ({ hotelInfo, handleStyleChange, handlePrevStage, handleNextStage }) => {

    const exampleText = {
        formal: "Мы с гордостью приглашаем вас насладиться отдыхом в нашем изысканном отеле, где каждый момент станет воплощением вашего представления о роскоши.",
        neutral: "Останавливайтесь у нас и наслаждайтесь комфортным отдыхом в уютной и приятной атмосфере.",
        informal: "Приезжай к нам — здесь уютно, красиво и всё создано для твоего отдыха",
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