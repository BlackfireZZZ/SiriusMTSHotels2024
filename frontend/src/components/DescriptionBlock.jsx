import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Для поддержки расширений, таких как таблицы и чекбоксы

const DescriptionBlock = ({ description }) => {


    return (
        <div
            style={{
                width: "100%",
                minHeight: "172px",
                overflowY: "auto", // Для вертикальной прокрутки
                maxHeight: "150px", // Задаем максимальную высоту для прокрутки (можете изменить при необходимости)
                border: "1px solid #ccc", // Добавляем границу для визуального выделения
                padding: "10px",
                borderRadius: "5px", // Закругленные углы
                backgroundColor: "#f9f9f9",// Светлый фон для контраста
                position: "relative"
            }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
        </div>
    );
};

export default DescriptionBlock;
