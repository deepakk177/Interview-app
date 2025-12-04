import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import { generateFeedback, generateSuggestedAnswer } from '../utils/feedbackGenerator';

export default function FeedbackPage() {
    const navigate = useNavigate();
    const { answers, resetInterview, setCurrentQuestionIndex } = useInterview();
    const [animatedScore, setAnimatedScore] = useState(0);

    const feedback = useMemo(() => {
        if (!answers || answers.length === 0) return null;
        return generateFeedback(answers);
    }, [answers]);

    useEffect(() => {
        if (!answers || answers.length === 0) {
            navigate('/setup');
            return;
        }

        // Animate score
        let currentScore = 0;
        const targetScore = feedback.overall;
        const increment = targetScore / 50;

        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            setAnimatedScore(Math.round(currentScore));
        }, 30);

        return () => clearInterval(timer);
    }, [answers, navigate, feedback]);

    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        navigate('/interview');
    };

    const handleNewInterview = () => {
        resetInterview();
        navigate('/setup');
    };

    if (!feedback) {
        return null;
    }

    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="container">
            <div className="feedback-container">
                <div className="feedback-header">
                    <h1>Interview Complete! 🎉</h1>
                    <p>Here's your performance analysis</p>
                </div>

                <div className="score-card">
                    <div className="score-circle">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#2a2d3a" strokeWidth="12" />
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="url(#score-gradient)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                transform="rotate(-90 100 100)"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                            />
                            <defs>
                                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="100%" stopColor="#764ba2" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="score-value">
                            <span>{animatedScore}</span>
                            <span className="score-max">/100</span>
                        </div>
                    </div>
                    <div className="score-breakdown">
                        <div className="breakdown-item">
                            <span className="breakdown-label">Technical Accuracy</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill"
                                    style={{ width: `${feedback.scores.technical}%`, transition: 'width 0.5s ease 0.3s' }}
                                ></div>
                            </div>
                            <span className="breakdown-score">{feedback.scores.technical}%</span>
                        </div>
                        <div className="breakdown-item">
                            <span className="breakdown-label">Communication</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill"
                                    style={{ width: `${feedback.scores.communication}%`, transition: 'width 0.5s ease 0.3s' }}
                                ></div>
                            </div>
                            <span className="breakdown-score">{feedback.scores.communication}%</span>
                        </div>
                        <div className="breakdown-item">
                            <span className="breakdown-label">Completeness</span>
                            <div className="breakdown-bar">
                                <div
                                    className="breakdown-fill"
                                    style={{ width: `${feedback.scores.completeness}%`, transition: 'width 0.5s ease 0.3s' }}
                                ></div>
                            </div>
                            <span className="breakdown-score">{feedback.scores.completeness}%</span>
                        </div>
                    </div>
                </div>

                <div className="feedback-sections">
                    <div className="feedback-section">
                        <h2>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Strengths
                        </h2>
                        <ul className="feedback-list">
                            {feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="feedback-section">
                        <h2>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9V13M12 17H12.01M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Areas for Improvement
                        </h2>
                        <ul className="feedback-list">
                            {feedback.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="qa-review">
                    <h2>Question & Answer Review</h2>
                    <div className="qa-list">
                        {answers.map((item, index) => {
                            const questionScore = feedback.questionScores[index];
                            return (
                                <div key={index} className="qa-item">
                                    <div className="qa-question">Q{index + 1}: {item.question}</div>
                                    <div className="qa-answer">
                                        <div className="qa-answer-label">Your Answer:</div>
                                        <div className="qa-answer-text">{item.answer}</div>
                                    </div>
                                    <div className="qa-answer">
                                        <div className="qa-answer-label">Suggested Answer:</div>
                                        <div className="qa-answer-text">{generateSuggestedAnswer(item.question)}</div>
                                    </div>
                                    <div style={{ marginTop: '12px' }}>
                                        <span className="qa-score">Score: {questionScore}/100</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="feedback-actions">
                    <button onClick={handleRetake} className="btn btn-secondary">Retake Interview</button>
                    <button onClick={handleNewInterview} className="btn btn-primary">Start New Interview</button>
                </div>
            </div>
        </div>
    );
}
