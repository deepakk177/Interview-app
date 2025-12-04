import { useState, useEffect, useRef } from 'react';

export function useSpeechRecognition() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    // Initialize isSupported lazily to avoid setting state in useEffect
    const [isSupported] = useState(() =>
        typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    );
    const recognitionRef = useRef(null);
    const isRecordingRef = useRef(isRecording);

    // Keep isRecordingRef in sync with state for event handlers
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    useEffect(() => {
        if (!isSupported) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPart + ' ';
                } else {
                    interimTranscript += transcriptPart;
                }
            }

            setTranscript(prev => prev + finalTranscript + interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
            // Use ref to check current state without re-running effect
            if (isRecordingRef.current) {
                recognitionRef.current.start();
            }
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [isSupported]);

    const startRecording = () => {
        if (!isSupported) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }
        setTranscript('');
        setIsRecording(true);
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const resetTranscript = () => {
        setTranscript('');
    };

    return {
        isRecording,
        transcript,
        isSupported,
        startRecording,
        stopRecording,
        resetTranscript
    };
}
