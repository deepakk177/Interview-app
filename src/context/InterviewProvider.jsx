import { useState } from 'react';
import { InterviewContext } from './InterviewContext';

export function InterviewProvider({ children }) {
    const [interviewConfig, setInterviewConfig] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const addAnswer = (answer) => {
        setAnswers(prev => [...prev, answer]);
    };

    const resetInterview = () => {
        setInterviewConfig(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const value = {
        interviewConfig,
        setInterviewConfig,
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        addAnswer,
        resetInterview,
        nextQuestion
    };

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    );
}
