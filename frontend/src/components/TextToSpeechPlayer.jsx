import React, {useState, useRef, useEffect} from "react";
import base_url from "../config";

const TextToSpeechPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const fetchAudio = async () => {
        if (audioUrl || isLoading) return; // Избегаем повторного запроса, если аудио уже есть или в процессе загрузки

        setIsLoading(true);
        setProgress(0);
        setIsPlaying(false);

        try {
            const response = await fetch(`${base_url}/speech_to_text`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text: getAllTextFromPage()}),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Ошибка при получении аудио:", error);
                alert("Не удалось выполнить запрос. Проверьте сервер.");
                return;
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        } catch (error) {
            console.error("Ошибка запроса:", error);
            alert("Произошла ошибка при обращении к серверу.");
        } finally {
            setIsLoading(false);
        }
    };

    const startPlaying = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const pausePlaying = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const stopPlaying = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const progress =
                (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    useEffect(() => {
        fetchAudio();
    }, []);


    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
            border: '2px solid #173a63',
            borderColor: '#173a63',
            color: '#fff',
            padding: '10px',
            borderRadius: '25px',
            width: '100%',
            height: '50px',
            margin: '15px auto',
        }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
                <div style={{
                    height: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: '#ff080b',
                        transition: 'width 0.1s linear',
                    }}></div>
                </div>
            </div>

            <button
                onClick={isPlaying ? pausePlaying : startPlaying}
                style={{
                    backgroundColor: '#ff080b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(0.9)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                disabled={!audioUrl || isLoading}
            >
                {isPlaying ? '⏸' : '▶'}
            </button>

            <button
                onClick={stopPlaying}
                style={{
                    backgroundColor: '#ff080b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '10px',
                    transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(0.9)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                disabled={!audioUrl || isLoading}
            >
                ⏹
            </button>


            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={stopPlaying}
                ></audio>
            )}
        </div>
    );
};

const getAllTextFromPage = () => {
    const body = document.body;
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            const parentTag = node.parentNode.tagName;
            if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE') {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
        },
    });

    let text = '';
    while (walker.nextNode()) {
        const trimmedText = walker.currentNode.nodeValue.trim();
        if (trimmedText) {
            text += trimmedText + ' ';
        }
    }
    return text.trim();
};

export default TextToSpeechPlayer;
