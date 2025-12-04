import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import { generateQuestions } from '../utils/questionBank';

export default function SetupPage() {
    const navigate = useNavigate();
    const { setInterviewConfig, setQuestions, setCurrentQuestionIndex, setAnswers } = useInterview();

    const [role, setRole] = useState('');
    const [selectedTech, setSelectedTech] = useState([]);
    const [customTech, setCustomTech] = useState('');
    const [experience, setExperience] = useState('mid');
    const [roundType, setRoundType] = useState('technical');
    const [numQuestions, setNumQuestions] = useState(5);

    const techOptions = ['React', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Angular', 'Vue.js', 'AWS', 'Docker'];

    const toggleTech = (tech) => {
        setSelectedTech(prev =>
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        console.log('Role:', role);
        console.log('Selected Tech:', selectedTech);
        console.log('Experience:', experience);
        console.log('Round Type:', roundType);
        console.log('Num Questions:', numQuestions);

        const customTechArray = customTech.split(',').map(t => t.trim()).filter(t => t);
        const allTech = [...selectedTech, ...customTechArray];

        const config = {
            role,
            techStack: allTech,
            experience,
            roundType,
            numQuestions
        };

        console.log('Config:', config);
        setInterviewConfig(config);
        const generatedQuestions = generateQuestions(config);
        console.log('Generated Questions:', generatedQuestions);
        setQuestions(generatedQuestions);
        setCurrentQuestionIndex(0);
        setAnswers([]);

        console.log('Navigating to /interview');
        navigate('/interview');
    };

    return (
        <div className="container">
            <div className="setup-container">
                <button onClick={() => navigate('/')} className="back-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Home
                </button>

                <div className="setup-header">
                    <h1>Setup Your Interview</h1>
                    <p>Customize your mock interview experience</p>
                </div>

                <form onSubmit={handleSubmit} className="setup-form">
                    <div className="form-group">
                        <label htmlFor="role">Target Role / Position</label>
                        <input
                            type="text"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g., Senior Frontend Developer"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Technology Stack</label>
                        <div className="tech-stack-options">
                            {techOptions.map(tech => (
                                <button
                                    key={tech}
                                    type="button"
                                    className={`tech-tag ${selectedTech.includes(tech) ? 'active' : ''}`}
                                    onClick={() => toggleTech(tech)}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={customTech}
                            onChange={(e) => setCustomTech(e.target.value)}
                            placeholder="Add custom technologies (comma-separated)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Experience Level</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="experience"
                                    value="junior"
                                    checked={experience === 'junior'}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>Junior (0-2 years)</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="experience"
                                    value="mid"
                                    checked={experience === 'mid'}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>Mid-Level (2-5 years)</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="experience"
                                    value="senior"
                                    checked={experience === 'senior'}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>Senior (5+ years)</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Interview Round Type</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="roundType"
                                    value="technical"
                                    checked={roundType === 'technical'}
                                    onChange={(e) => setRoundType(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>Technical</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="roundType"
                                    value="hr"
                                    checked={roundType === 'hr'}
                                    onChange={(e) => setRoundType(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>HR / Behavioral</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="roundType"
                                    value="system-design"
                                    checked={roundType === 'system-design'}
                                    onChange={(e) => setRoundType(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>System Design</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="roundType"
                                    value="coding"
                                    checked={roundType === 'coding'}
                                    onChange={(e) => setRoundType(e.target.value)}
                                />
                                <span className="radio-custom"></span>
                                <span>Coding Challenge</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="num-questions">Number of Questions</label>
                        <div className="slider-container">
                            <input
                                type="range"
                                id="num-questions"
                                min="3"
                                max="10"
                                value={numQuestions}
                                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                                step="1"
                            />
                            <span className="slider-value">{numQuestions}</span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-large">
                        Start Interview
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
