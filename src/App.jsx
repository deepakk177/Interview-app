import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './context/InterviewProvider';
import LandingPage from './components/LandingPage';
import SetupPage from './components/SetupPage';
import InterviewPage from './components/InterviewPage';
import FeedbackPage from './components/FeedbackPage';
import './styles.css';

function App() {
  return (
    <InterviewProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </InterviewProvider>
  );
}

export default App;
