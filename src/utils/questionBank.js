// Question Bank Data
export const questionBank = {
    technical: {
        junior: [
            "What is the difference between var, let, and const in JavaScript?",
            "Explain what a callback function is and provide an example.",
            "What is the DOM and how do you manipulate it?",
            "What are the main differences between == and === in JavaScript?",
            "Explain the concept of closures in JavaScript.",
            "What is event bubbling and how does it work?",
            "What are promises in JavaScript and why are they useful?",
            "Explain the difference between null and undefined.",
            "What is the purpose of the 'this' keyword in JavaScript?",
            "How does the array map() function work?"
        ],
        mid: [
            "Explain the event loop in JavaScript and how asynchronous code is executed.",
            "What are the different ways to handle asynchronous operations in JavaScript?",
            "Describe the prototype chain in JavaScript and how inheritance works.",
            "What is the Virtual DOM in React and why is it beneficial?",
            "Explain the differences between REST and GraphQL APIs.",
            "How would you optimize the performance of a web application?",
            "What are React Hooks and how do they differ from class components?",
            "Explain Cross-Origin Resource Sharing (CORS) and how to handle it.",
            "What is memoization and when would you use it?",
            "Describe your approach to state management in a large React application."
        ],
        senior: [
            "Design a scalable architecture for a real-time collaborative editing application.",
            "How would you approach migrating a legacy monolithic application to microservices?",
            "Explain your strategy for implementing a robust caching layer in a distributed system.",
            "Describe how you would handle database schema migrations in a production environment with zero downtime.",
            "What are your considerations when designing a fault-tolerant system?",
            "How would you implement authentication and authorization in a multi-tenant SaaS application?",
            "Explain your approach to monitoring, logging, and observability in production systems.",
            "Describe strategies for handling high-traffic scenarios and preventing system overload.",
            "How do you ensure code quality and maintainability in a large team?",
            "What is your approach to technical debt management and refactoring?"
        ]
    },
    hr: {
        junior: [
            "Tell me about yourself and why you're interested in this position.",
            "What are your greatest strengths and weaknesses?",
            "Why do you want to work for our company?",
            "Describe a challenging problem you solved in your previous projects.",
            "Where do you see yourself in 5 years?",
            "How do you handle feedback and criticism?",
            "Tell me about a time when you worked in a team.",
            "What motivates you in your work?",
            "How do you prioritize tasks when you have multiple deadlines?",
            "What do you know about our company and our products?"
        ],
        mid: [
            "Describe a situation where you had to deal with a difficult team member.",
            "Tell me about a time when you had to make a difficult decision with limited information.",
            "How do you handle conflicts in the workplace?",
            "Describe your leadership style and provide an example.",
            "Tell me about a project that didn't go as planned. What did you learn?",
            "How do you stay updated with the latest technology trends?",
            "Describe a time when you had to adapt to a significant change at work.",
            "How do you mentor junior team members?",
            "What's your approach to work-life balance?",
            "Tell me about a time when you went above and beyond your job responsibilities."
        ],
        senior: [
            "How do you build and develop high-performing teams?",
            "Describe your approach to driving technical strategy and roadmap planning.",
            "How do you handle disagreements with stakeholders or leadership?",
            "Tell me about a time when you had to make a trade-off between technical excellence and business needs.",
            "How do you foster a culture of innovation in your team?",
            "Describe your experience with organizational change management.",
            "How do you ensure alignment between engineering and business objectives?",
            "What's your approach to hiring and building diverse teams?",
            "How do you handle underperforming team members?",
            "Describe your experience in scaling engineering organizations."
        ]
    },
    'system-design': {
        junior: [
            "Design a simple URL shortener service.",
            "How would you design a basic chat application?",
            "Design a parking lot system.",
            "Explain how you would design a simple e-commerce shopping cart.",
            "Design a file storage system like Dropbox (simplified version)."
        ],
        mid: [
            "Design a social media feed like Twitter or Facebook.",
            "How would you design a ride-sharing service like Uber?",
            "Design a notification system that can send millions of notifications.",
            "How would you design a distributed cache system?",
            "Design a rate limiter for an API service.",
            "How would you design a search autocomplete system?",
            "Design a web crawler for a search engine."
        ],
        senior: [
            "Design YouTube or Netflix - a video streaming platform at scale.",
            "How would you design a globally distributed messaging system like WhatsApp?",
            "Design a real-time collaboration platform like Google Docs.",
            "How would you design a recommendation system for an e-commerce platform?",
            "Design a distributed job scheduler that can handle millions of tasks.",
            "How would you design a payment processing system with high reliability?",
            "Design a metrics and monitoring system for a large-scale distributed application."
        ]
    },
    coding: {
        junior: [
            "Write a function to reverse a string.",
            "Implement a function to check if a string is a palindrome.",
            "Write a function to find the largest number in an array.",
            "Implement FizzBuzz: print numbers 1-100, but for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
            "Write a function to count the occurrences of each character in a string."
        ],
        mid: [
            "Implement a debounce function.",
            "Write a function to flatten a nested array.",
            "Implement a simple pub-sub (observer) pattern.",
            "Write a function to deep clone an object.",
            "Implement a function to find all permutations of a string.",
            "Write a binary search algorithm.",
            "Implement a function to validate if a string of parentheses is balanced."
        ],
        senior: [
            "Design and implement a LRU (Least Recently Used) cache.",
            "Implement a trie data structure for autocomplete functionality.",
            "Write an algorithm to find the shortest path in a weighted graph.",
            "Implement a rate limiter using the token bucket algorithm.",
            "Design a task scheduler that handles task dependencies.",
            "Implement a diff algorithm to find differences between two text documents."
        ]
    }
};

// Generate questions based on configuration
export function generateQuestions(config) {
    const { roundType, experience, numQuestions, techStack } = config;

    // Get questions from the appropriate category
    const categoryQuestions = questionBank[roundType]?.[experience] || questionBank.technical.mid;

    // Randomly select questions
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, parseInt(numQuestions));

    // Add tech stack context to technical questions
    if (roundType === 'technical' && techStack && techStack.length > 0) {
        return selectedQuestions.map(q => {
            if (Math.random() > 0.5 && techStack.length > 0) {
                const tech = techStack[Math.floor(Math.random() * techStack.length)];
                return q.replace(/JavaScript|React/gi, tech);
            }
            return q;
        });
    }

    return selectedQuestions;
}
