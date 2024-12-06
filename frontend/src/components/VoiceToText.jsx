import React, { useState } from "react";

const VoiceToText = ({ onTextDetected }) => {
    const [isListening, setIsListening] = useState(false);
    const recognition = React.useMemo(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Ваш браузер не поддерживает голосовой ввод.");
            return null;
        }
        const rec = new SpeechRecognition();
        rec.lang = "ru-RU"; // Задаем язык распознавания
        rec.interimResults = false; // Включаем только финальные результаты
        return rec;
    }, []);

    const handleVoiceInput = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onTextDetected(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Ошибка распознавания речи:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return (
        <button
            type='button'
            onClick={handleVoiceInput}
            style={{
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: isListening ? "#ff6666" : "#173a63",
                color: "white",
                border: "none",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: '45px',
                height: '45px',
            }}
        >
            <img
                src={require(isListening ? '../assets/square.png' : '../assets/micro.png')}
                alt={isListening ? "Stop Icon" : "Microphone Icon"}
                style={{
                    width: "20px",
                    height: "20px",
                }}
            />
        </button>

    );
};

export default VoiceToText;
