export interface SampleResume {
  id: string;
  title: string;
  role: string;
  seniority: string;
  fileName: string;
  text: string;
  sampleJobDescription?: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: "swe-sample",
    title: "Senior Full Stack Engineer",
    role: "Full Stack Engineer",
    seniority: "Senior",
    fileName: "Alex_Dev_Resume.pdf",
    text: `Alex Morgan
alex.morgan@email.com | (555) 234-5678 | San Francisco, CA | linkedin.com/in/alexmorgan | github.com/alexmorgan

PROFESSIONAL SUMMARY
Innovative Senior Full Stack Engineer with 6+ years of experience building scalable microservices, high-performance web apps, and AI-driven internal tools. Expert in React, TypeScript, Node.js, GraphQL, PostgreSQL, and AWS. Proven track record of optimizing system throughput by 40% and mentoring junior developers.

SKILLS
- Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, Webpack
- Backend: Node.js, Express, GraphQL, REST APIs, PostgreSQL, Redis, MongoDB
- Cloud & DevOps: AWS (S3, Lambda, ECS), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform

WORK EXPERIENCE
Senior Full Stack Engineer | TechPulse Solutions | San Francisco, CA
Jan 2022 - Present
- Architected and built high-frequency financial analytics dashboard using React, TypeScript, and WebSockets, reducing page load latency by 45%.
- Led a team of 5 engineers to migrate legacy monolith into Node.js microservices hosted on AWS ECS, improving application uptime to 99.99%.
- Integrated OpenAI & AI LLM APIs for automated report generation, saving client teams 15+ hours weekly.
- Reduced database query times by 60% through PostgreSQL index optimization and Redis caching layer implementation.

Full Stack Software Engineer | CloudScale Inc. | San Jose, CA
Jun 2018 - Dec 2021
- Developed client-facing SaaS platform features using React, Node.js, and MongoDB, supporting over 200,000 active monthly users.
- Designed automated CI/CD pipeline using GitHub Actions and Docker, reducing deployment cycle times from 2 days to 20 minutes.
- Collaborated with UX team to redesign checkout flow, boosting conversion rate by 18%.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2014 - 2018
GPA: 3.8/4.0 | Honors: Dean's List (all semesters)

PROJECTS
- DevPulse AI CLI: Open-source developer productivity tool with 1,200+ GitHub stars built with TypeScript and Node.js.
- Real-Time Collab Canvas: Interactive whiteboard tool built with React, Canvas API, and WebSockets.

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2023)
- Certified Kubernetes Application Developer (CKAD) (2022)`,
    sampleJobDescription: `Senior Full Stack Developer (React / Node / Cloud)
Location: Remote / San Francisco
Key Responsibilities:
- Design and implement resilient web applications using React, TypeScript, and Node.js.
- Work closely with product management and DevOps teams to deliver scalable cloud software.
- Optimize database queries, microservices architecture, and frontend rendering performance.
- Champion code quality, unit testing, and continuous deployment workflows.

Requirements:
- 5+ years of software engineering experience with JavaScript/TypeScript stack.
- Deep expertise in React, Node.js, REST & GraphQL APIs, and PostgreSQL/MongoDB.
- Experience with cloud infrastructure (AWS/GCP), Docker, and CI/CD pipelines.
- Familiarity with AI/LLM API integrations (OpenAI, Claude, LLM APIs) is a huge plus.`
  },
  {
    id: "pm-sample",
    title: "Product Manager (Mid-Senior)",
    role: "Product Manager",
    seniority: "Mid-Senior",
    fileName: "Jordan_Product_Manager_CV.docx",
    text: `Jordan Lee
jordan.lee@producthub.io | (555) 876-5432 | New York, NY | linkedin.com/in/jordanlee-pm

EXECUTIVE SUMMARY
Customer-focused Product Manager with 4+ years of experience launching B2B SaaS products from concept to scale. Specialized in data-informed product discovery, user research, agile execution, and cross-functional leadership across engineering, design, and marketing.

EXPERIENCE
Product Manager | SaaSify Commerce | New York, NY
Mar 2021 - Present
- Owned the end-to-end roadmap for core payment checkout products generating $12M ARR.
- Launched 1-click checkout feature that increased checkout conversion by 22% and reduced cart abandonment by 15%.
- Conducted 50+ user interviews and quantitative funnel analyses in Mixpanel to prioritize sprint backlogs.
- Worked with 8 engineers and 2 UI/UX designers using Jira and Agile Scrum methodologies.

Associate Product Manager | Venture Growth Tech | Brooklyn, NY
Aug 2019 - Feb 2021
- Defined requirements and specs for customer onboarding flows, increasing 30-day activation rate by 18%.
- Managed product feedback channels, synthesizing over 500 monthly user requests into actionable backlog epics.

EDUCATION & CERTIFICATIONS
- B.A. in Business Administration & Information Systems | NYU Stern School of Business
- Certified Scrum Product Owner (CSPO) | Scrum Alliance
- Reforge Product Strategy Certification

CORE COMPETENCIES
Product Roadmap, User Research, Mixpanel, Amplitude, Jira, A/B Testing, Wireframing (Figma), Agile/Scrum, Customer Retention`,
    sampleJobDescription: `Senior Product Manager - Growth & Onboarding
Responsibilities:
- Lead product strategy for user acquisition, onboarding, and self-serve monetization.
- Run rigorous hypothesis testing, user interviews, and A/B experiments.
- Translate user insights into detailed PRDs, user stories, and feature specs.
Requirements:
- 4+ years in B2B SaaS Product Management.
- Demonstrated success driving key metrics like activation, retention, and ARR growth.
- Strong analytical skills (Amplitude, Mixpanel, SQL).`
  },
  {
    id: "data-sample",
    title: "Data Analyst / Scientist",
    role: "Data Analyst",
    seniority: "Mid-Level",
    fileName: "Sam_Data_Analyst.pdf",
    text: `Samira Chen
samira.chen@data.org | (555) 432-1098 | Chicago, IL | github.com/samirachen-data

SUMMARY
Detail-oriented Data Analyst with 3+ years of experience transforming complex raw datasets into actionable strategic insights. Proficient in Python, SQL, Tableau, Power BI, and statistical modeling.

TECHNICAL SKILLS
- Languages: Python (Pandas, NumPy, Scikit-learn), SQL (PostgreSQL, BigQuery, Snowflake), R
- Visualization: Tableau, Power BI, Matplotlib, Seaborn
- Analytics & Tools: A/B Testing, Cohort Analysis, ETL pipelines, Git, Jupyter Notebooks

WORK EXPERIENCE
Data Analyst | RetailMetrics Inc. | Chicago, IL
Sep 2021 - Present
- Built automated executive Tableau dashboards tracking daily revenue, inventory churn, and customer LTV across 150+ stores.
- Designed and analyzed A/B test pricing experiments that boosted quarterly promotional revenue by $450K.
- Wrote complex SQL queries and Python ETL scripts processing 2M+ transaction records daily in Snowflake.

Junior Data Analyst | Apex Marketing Agency | Chicago, IL
May 2020 - Aug 2021
- Analyzed multi-channel campaign performance data, identifying underperforming ad segments and saving 12% in ad spend.

EDUCATION
B.S. in Statistics & Applied Analytics | University of Illinois Urbana-Champaign | 2016 - 2020`,
    sampleJobDescription: `Senior Data Analyst
Requirements:
- 3+ years experience with SQL, Python, BigQuery/Snowflake, and Tableau/Looker.
- Deep understanding of statistical hypothesis testing, A/B testing, and ETL processes.`
  }
];
