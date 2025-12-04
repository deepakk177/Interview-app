import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export default function InterviewPage() {
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, addAnswer, nextQuestion } = useInterview();
    const { isRecording, transcript, startRecording, stopRecording, resetTranscript } = useSpeechRecognition();
    const { speak } = useTextToSpeech();

    const [answerMode, setAnswerMode] = useState('voice'); // 'voice' or 'text'
    const [textAnswer, setTextAnswer] = useState('');

    useEffect(() => {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            setTimeout(() => {
                speak(questions[currentQuestionIndex]);
            }, 500);
        }
    }, [currentQuestionIndex, questions, speak]);

    const handleNext = () => {
        stopRecording();
        const answer = answerMode === 'voice' ? transcript : textAnswer;

        addAnswer({
            question: questions[currentQuestionIndex],
            answer: answer || 'No answer provided',
            skipped: false
        });

        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
            resetTranscript();
            setTextAnswer('');
            setTimeout(() => {
                speak(questions[currentQuestionIndex + 1]);
            }, 300);
        } else {
            navigate('/feedback');
        }
    };

    const handleSkip = () => {
        stopRecording();

        addAnswer({
            question: questions[currentQuestionIndex],
            answer: 'Skipped',
            skipped: true
        });

        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
            resetTranscript();
            setTextAnswer('');
            setTimeout(() => {
                speak(questions[currentQuestionIndex + 1]);
            }, 300);
        } else {
            navigate('/feedback');
        }
    };

    const handleEndInterview = () => {
        if (window.confirm('Are you sure you want to end the interview? Your progress will be saved.')) {
            stopRecording();
            const answer = answerMode === 'voice' ? transcript : textAnswer;
            addAnswer({
                question: questions[currentQuestionIndex],
                answer: answer || 'No answer provided',
                skipped: false
            });
            navigate('/feedback');
        }
    };

    if (!questions || questions.length === 0) {
        navigate('/setup');
        return null;
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="container">
            <div className="interview-container">
                <div className="interview-header">
                    <div className="interview-progress">
                        <span>Question <span>{currentQuestionIndex + 1}</span> of <span>{questions.length}</span></span>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <button onClick={handleEndInterview} className="btn btn-text">End Interview</button>
                </div>

                <div className="interview-content">
                    <div className="ai-avatar">
                        <div className="avatar-circle">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="30" fill="url(#avatar-gradient)" />
                                <path d="M30 15C26.5 15 23.5 17.5 23.5 20.5C23.5 23.5 26.5 26 30 26C33.5 26 36.5 23.5 36.5 20.5C36.5 17.5 33.5 15 30 15ZM30 28C24 28 19 31 19 35V37C19 38.5 20 39.5 21.5 39.5H38.5C40 39.5 41 38.5 41 37V35C41 31 36 28 30 28Z" fill="white" />
                                <defs>
                                    <linearGradient id="avatar-gradient" x1="0" y1="0" x2="60" y2="60">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="100%" stopColor="#764ba2" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="avatar-pulse"></div>
                        </div>
                        <span className="ai-label">AI Interviewer</span>
                    </div>

                    <div className="question-card">
                        <div className="question-label">Current Question</div>
                        <div className="question-text">
                            {questions[currentQuestionIndex]}
                        </div>
                    </div>

                    <div className="answer-section">
                        <div className="answer-tabs">
                            <button
                                className={`answer-tab ${answerMode === 'voice' ? 'active' : ''}`}
                                onClick={() => setAnswerMode('voice')}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2C8.5 2 7.5 3 7.5 4.5V10C7.5 11.5 8.5 12.5 10 12.5C11.5 12.5 12.5 11.5 12.5 10V4.5C12.5 3 11.5 2 10 2ZM15 10C15 13 12.5 15.5 9.5 15.5V18H10.5V18H9.5V18H10.5C14 18 17 15 17 11.5H15.5C15.5 14.5 12.5 17 10 17C7.5 17 4.5 14.5 4.5 11.5H3C3 15 6 18 9.5 18V18H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Voice Answer
                            </button>
                            <button
                                className={`answer-tab ${answerMode === 'text' ? 'active' : ''}`}
                                onClick={() => setAnswerMode('text')}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 4H17M3 10H17M3 16H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Text Answer
                            </button>
                        </div>

                        {answerMode === 'voice' ? (
                            <div className="answer-input active">
                                <button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={`record-btn ${isRecording ? 'recording' : ''}`}
                                >
                                    <div className="record-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="currentColor" />
                                            <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V23H13V18.92C16.39 18.43 19 15.53 19 12H17Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <span>{isRecording ? 'Recording... Click to Stop' : 'Click to Record'}</span>
                                </button>
                                <div className="voice-transcript">{transcript}</div>
                            </div>
                        ) : (
                            <div className="answer-input active">
                                <textarea
                                    value={textAnswer}
                                    onChange={(e) => setTextAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                    rows="6"
                                />
                            </div>
                        )}

                        <div className="answer-actions">
                            <button onClick={handleSkip} className="btn btn-secondary">Skip Question</button>
                            <button onClick={handleNext} className="btn btn-primary">
                                Next Question
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
