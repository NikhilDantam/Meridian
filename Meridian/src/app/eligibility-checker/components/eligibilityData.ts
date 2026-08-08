export interface SkillMatch {
  skill: string;
  score: number; // 0-100
  status: 'strong' | 'moderate' | 'weak';
}

export interface RoleMatch {
  role: string;
  company: string;
  matchPercent: number;
}

export interface ResumeSection {
  name: string;
  detected: boolean;
  note: string;
}

export const mockAnalysis = {
  fileName: 'Mahesh_Babu_Resume.pdf',
  analyzedAt: 'Just now',
  overallScore: 78,
  readinessLabel: 'Industry Ready — Minor Gaps',
  atsScore: 84,
  summary:
    'Strong foundation in core CS fundamentals and full-stack development. Resume is ATS-friendly with clear sections. A few in-demand skills like Cloud & System Design are missing, and quantifiable impact metrics could be strengthened.',
  skillMatches: [
    { skill: 'Data Structures & Algorithms', score: 88, status: 'strong' },
    { skill: 'JavaScript / TypeScript', score: 82, status: 'strong' },
    { skill: 'React / Frontend Development', score: 79, status: 'strong' },
    { skill: 'SQL & Database Design', score: 71, status: 'moderate' },
    { skill: 'Git & Version Control', score: 90, status: 'strong' },
    { skill: 'System Design', score: 38, status: 'weak' },
    { skill: 'Cloud (AWS / Azure / GCP)', score: 29, status: 'weak' },
    { skill: 'Communication & Teamwork', score: 74, status: 'moderate' },
  ] as SkillMatch[],
  matchedKeywords: [
    'Java', 'Python', 'React.js', 'Node.js', 'REST APIs', 'MySQL', 'Git/GitHub',
    'Data Structures', 'Agile', 'Problem Solving',
  ],
  missingKeywords: [
    'Docker', 'Kubernetes', 'AWS', 'System Design', 'CI/CD', 'Unit Testing',
  ],
  resumeSections: [
    { name: 'Contact Information', detected: true, note: 'Email, phone, and LinkedIn found' },
    { name: 'Professional Summary', detected: true, note: 'Concise, 3-line summary present' },
    { name: 'Technical Skills', detected: true, note: '14 skills listed across 4 categories' },
    { name: 'Projects', detected: true, note: '3 projects with tech stack mentioned' },
    { name: 'Work Experience / Internship', detected: true, note: '1 internship (8 weeks) listed' },
    { name: 'Education', detected: true, note: 'CGPA and coursework included' },
    { name: 'Certifications', detected: false, note: 'No certifications detected — consider adding 1–2' },
    { name: 'Quantified Achievements', detected: false, note: 'Add measurable impact, e.g. "reduced load time by 30%"' },
  ] as ResumeSection[],
  roleMatches: [
    { role: 'Software Engineer (Trainee)', company: 'TCS Digital', matchPercent: 86 },
    { role: 'Frontend Developer', company: 'Zoho Corp', matchPercent: 81 },
    { role: 'Full Stack Developer Intern', company: 'Razorpay', matchPercent: 76 },
    { role: 'Backend Engineer', company: 'Infosys', matchPercent: 69 },
    { role: 'Cloud Support Associate', company: 'Amazon', matchPercent: 54 },
  ] as RoleMatch[],
  recommendations: [
    'Add 1–2 cloud certifications (AWS Cloud Practitioner or Azure Fundamentals) to close the biggest skill gap.',
    'Include a short System Design section or project demonstrating scalability decisions.',
    'Quantify project outcomes with metrics (users served, performance gains, test coverage).',
    'Add Docker/CI-CD exposure — even a personal project counts toward ATS keyword match.',
    'Get 2 more DSA-heavy contest ratings (LeetCode/Codeforces) linked in resume for stronger signal.',
  ],
};
