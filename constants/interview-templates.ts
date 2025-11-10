// Pre-made interview templates for instant practice

export interface InterviewTemplate {
  id: string;
  role: string;
  type: "Technical" | "Behavioral" | "Mixed";
  level: "Junior" | "Mid-level" | "Senior";
  techstack: string[];
  description: string;
  icon: string;
  color: string;
  questions: string[];
}

export const interviewTemplates: InterviewTemplate[] = [
  {
    id: "frontend-junior",
    role: "Frontend Developer",
    type: "Technical",
    level: "Junior",
    techstack: ["HTML", "CSS", "JavaScript", "React"],
    description: "Practice essential frontend concepts and React basics",
    icon: "💻",
    color: "bg-blue-500",
    questions: [
      "What is the difference between let, const, and var in JavaScript?",
      "Explain the box model in CSS.",
      "What are React hooks and why are they useful?",
      "How do you handle state in a React component?",
      "What is the virtual DOM and how does it work?",
      "Explain the difference between props and state.",
      "How would you optimize the performance of a React application?",
    ],
  },
  {
    id: "frontend-senior",
    role: "Frontend Developer",
    type: "Technical",
    level: "Senior",
    techstack: ["React", "TypeScript", "Next.js", "Performance"],
    description: "Advanced frontend architecture and optimization",
    icon: "🚀",
    color: "bg-purple-500",
    questions: [
      "Explain your approach to building a scalable frontend architecture.",
      "How do you implement code splitting and lazy loading in React?",
      "Describe your experience with server-side rendering and Next.js.",
      "How do you handle state management in large applications?",
      "What strategies do you use for performance optimization?",
      "Explain your approach to testing frontend applications.",
      "How do you ensure accessibility in your applications?",
      "Describe a challenging frontend problem you solved recently.",
    ],
  },
  {
    id: "data-analyst",
    role: "Data Analyst",
    type: "Technical",
    level: "Mid-level",
    techstack: ["SQL", "Python", "Excel", "Tableau"],
    description: "Data analysis, SQL queries, and visualization",
    icon: "📊",
    color: "bg-green-500",
    questions: [
      "Explain the different types of SQL joins with examples.",
      "How do you handle missing or inconsistent data?",
      "What's your experience with Python libraries like pandas and numpy?",
      "Describe a complex data analysis project you've worked on.",
      "How do you choose the right visualization for your data?",
      "Explain the difference between correlation and causation.",
      "What statistical methods do you commonly use?",
      "How do you ensure data quality and accuracy?",
    ],
  },
  {
    id: "backend-developer",
    role: "Backend Developer",
    type: "Technical",
    level: "Mid-level",
    techstack: ["Node.js", "Express", "MongoDB", "REST APIs"],
    description: "Server-side development and API design",
    icon: "⚙️",
    color: "bg-orange-500",
    questions: [
      "Explain the difference between REST and GraphQL APIs.",
      "How do you handle authentication and authorization?",
      "What's your approach to database design and optimization?",
      "Describe how you would scale a backend application.",
      "How do you handle errors and logging in production?",
      "Explain middleware in Express.js.",
      "What security best practices do you follow?",
      "How do you optimize database queries?",
    ],
  },
  {
    id: "fullstack-developer",
    role: "Full Stack Developer",
    type: "Mixed",
    level: "Senior",
    techstack: ["React", "Node.js", "PostgreSQL", "AWS"],
    description: "End-to-end application development",
    icon: "🌐",
    color: "bg-indigo-500",
    questions: [
      "Describe your experience building full-stack applications.",
      "How do you design the architecture for a new project?",
      "Explain your approach to API design and versioning.",
      "How do you handle deployment and CI/CD?",
      "What's your experience with cloud platforms like AWS?",
      "How do you ensure security across the full stack?",
      "Describe a challenging technical problem you solved.",
      "How do you balance frontend and backend responsibilities?",
    ],
  },
  {
    id: "devops-engineer",
    role: "DevOps Engineer",
    type: "Technical",
    level: "Mid-level",
    techstack: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    description: "Infrastructure, deployment, and automation",
    icon: "🔧",
    color: "bg-red-500",
    questions: [
      "Explain the difference between Docker and Kubernetes.",
      "How do you set up a CI/CD pipeline?",
      "What's your experience with infrastructure as code?",
      "How do you monitor and troubleshoot production issues?",
      "Describe your approach to security in DevOps.",
      "What container orchestration tools have you used?",
      "How do you handle database migrations in production?",
      "Explain your experience with cloud platforms.",
    ],
  },
  {
    id: "data-scientist",
    role: "Data Scientist",
    type: "Technical",
    level: "Senior",
    techstack: ["Python", "Machine Learning", "TensorFlow", "Statistics"],
    description: "Machine learning and predictive modeling",
    icon: "🤖",
    color: "bg-pink-500",
    questions: [
      "Explain the difference between supervised and unsupervised learning.",
      "How do you handle imbalanced datasets?",
      "Describe your experience with deep learning frameworks.",
      "What's your approach to feature engineering?",
      "How do you evaluate model performance?",
      "Explain overfitting and how to prevent it.",
      "Describe a machine learning project you've worked on.",
      "How do you deploy ML models to production?",
    ],
  },
  {
    id: "mobile-developer",
    role: "Mobile Developer",
    type: "Technical",
    level: "Mid-level",
    techstack: ["React Native", "iOS", "Android", "Mobile UI"],
    description: "Cross-platform mobile app development",
    icon: "📱",
    color: "bg-teal-500",
    questions: [
      "What's your experience with React Native or Flutter?",
      "How do you handle different screen sizes and orientations?",
      "Explain your approach to mobile app performance optimization.",
      "How do you manage state in mobile applications?",
      "What's your experience with native modules?",
      "How do you handle offline functionality?",
      "Describe your approach to mobile app testing.",
      "How do you optimize app size and load time?",
    ],
  },
  {
    id: "qa-engineer",
    role: "QA Engineer",
    type: "Technical",
    level: "Mid-level",
    techstack: ["Selenium", "Jest", "Cypress", "Test Automation"],
    description: "Quality assurance and test automation",
    icon: "✅",
    color: "bg-yellow-500",
    questions: [
      "Explain the difference between unit, integration, and e2e tests.",
      "What test automation frameworks have you used?",
      "How do you design a test strategy for a new feature?",
      "Describe your experience with CI/CD and automated testing.",
      "How do you handle flaky tests?",
      "What's your approach to performance testing?",
      "How do you ensure test coverage?",
      "Describe a challenging bug you found and fixed.",
    ],
  },
  {
    id: "product-manager",
    role: "Product Manager",
    type: "Behavioral",
    level: "Senior",
    techstack: ["Product Strategy", "Agile", "User Research", "Analytics"],
    description: "Product strategy and stakeholder management",
    icon: "📋",
    color: "bg-cyan-500",
    questions: [
      "How do you prioritize features in a product roadmap?",
      "Describe your experience with user research and validation.",
      "How do you handle conflicting stakeholder requirements?",
      "Explain your approach to defining product metrics.",
      "Describe a product you launched from concept to release.",
      "How do you work with engineering teams?",
      "What frameworks do you use for product decisions?",
      "How do you handle a product that's not meeting goals?",
    ],
  },
];

// Helper function to get template by ID
export function getTemplateById(id: string): InterviewTemplate | undefined {
  return interviewTemplates.find((template) => template.id === id);
}

// Helper function to get templates by role
export function getTemplatesByRole(role: string): InterviewTemplate[] {
  return interviewTemplates.filter((template) => template.role === role);
}

// Helper function to get templates by level
export function getTemplatesByLevel(
  level: "Junior" | "Mid-level" | "Senior"
): InterviewTemplate[] {
  return interviewTemplates.filter((template) => template.level === level);
}
