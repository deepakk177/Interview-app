// Generate feedback and scores
export function generateFeedback(answers) {
    const scores = {
        technical: Math.floor(Math.random() * 30) + 60, // 60-90
        communication: Math.floor(Math.random() * 30) + 65, // 65-95
        completeness: Math.floor(Math.random() * 25) + 70 // 70-95
    };

    const overall = Math.round((scores.technical + scores.communication + scores.completeness) / 3);

    const strengths = [
        "Clear and concise communication",
        "Good understanding of fundamental concepts",
        "Structured approach to problem-solving",
        "Relevant examples and use cases mentioned",
        "Strong technical vocabulary"
    ];

    const improvements = [
        "Could provide more detailed explanations for complex topics",
        "Consider discussing edge cases and error handling",
        "Mention real-world applications more frequently",
        "Practice articulating thought process more clearly",
        "Expand on scalability and performance considerations"
    ];

    // Randomly select feedback items
    const selectedStrengths = strengths.sort(() => Math.random() - 0.5).slice(0, 3);
    const selectedImprovements = improvements.sort(() => Math.random() - 0.5).slice(0, 3);

    // Generate individual question scores
    const questionScores = answers.map(item =>
        item.skipped ? 0 : Math.floor(Math.random() * 30) + 60
    );

    return {
        scores,
        overall,
        strengths: selectedStrengths,
        improvements: selectedImprovements,
        questionScores
    };
}

// Generate suggested answer for a question
export function generateSuggestedAnswer(question) {
    const templates = [
        `A comprehensive answer to "${question}" would include the definition, key concepts, and practical examples. It's important to explain both the 'what' and the 'why', and demonstrate understanding through real-world applications.`,
        `When answering "${question}", consider covering the fundamental principles, common use cases, potential pitfalls, and best practices. Include examples from your experience if applicable.`,
        `To effectively answer "${question}", break down the concept into digestible parts, explain the relationships between components, and discuss trade-offs or alternative approaches.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
}
