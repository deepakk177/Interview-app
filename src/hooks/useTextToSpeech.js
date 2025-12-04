import { useEffect, useState, useCallback } from 'react';

export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const loadVoices = () => {
                setVoices(speechSynthesis.getVoices());
            };

            loadVoices();
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = useCallback((text) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;

            // Use a better voice if available
            const preferredVoice = voices.find(voice =>
                voice.lang.startsWith('en') && voice.name.includes('Google')
            );
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            speechSynthesis.speak(utterance);
        }
    }, [voices]);

    const stop = useCallback(() => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        speak,
        stop,
        isSpeaking
    };
}
