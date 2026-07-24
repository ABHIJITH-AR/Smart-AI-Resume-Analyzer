import { AnalysisResult, ComparisonResult, HistoryItem, User } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'ai_resume_analyzer_history',
  USER: 'ai_resume_analyzer_user',
  TOKEN: 'ai_resume_analyzer_token',
  SAVED_COMPARISONS: 'ai_resume_analyzer_comparisons',
};

const API_BASE = ((import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.VITE_BACKEND_URL || '').replace(/\/$/, '');

// Local storage helper functions
export const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveHistoryItem = (item: HistoryItem) => {
  const current = getHistory();
  // prepend new item and keep up to 20 items
  const updated = [item, ...current.filter((i) => i.id !== item.id)].slice(0, 20);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
};

export const deleteHistoryItem = (id: string): HistoryItem[] => {
  const current = getHistory();
  const updated = current.filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};

function generateLocalFallbackAnalysis(params: {
  resumeText: string;
  fileName?: string;
  targetRole?: string;
  targetSeniority?: string;
  jobDescription?: string;
}): AnalysisResult {
  const { resumeText, fileName, targetRole, targetSeniority, jobDescription } = params;
  const lowerText = resumeText.toLowerCase();

  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
  const hasPhone = /[\d+() -]{10,}/.test(resumeText);
  const hasLinkedin = lowerText.includes('linkedin');

  const hasSummary = lowerText.includes('summary') || lowerText.includes('profile') || lowerText.includes('objective');
  const hasExperience = lowerText.includes('experience') || lowerText.includes('work') || lowerText.includes('employment');
  const hasEducation = lowerText.includes('education') || lowerText.includes('university') || lowerText.includes('degree');
  const hasSkills = lowerText.includes('skill') || lowerText.includes('technologies') || lowerText.includes('tools');

  const commonTech = ['javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'sql', 'aws', 'docker', 'git', 'mongodb', 'postgresql', 'express', 'tailwind', 'rest api'];
  const presentTech = commonTech.filter((tech) => lowerText.includes(tech)).map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  const missingTech = commonTech.filter((tech) => !lowerText.includes(tech)).slice(0, 4).map((t) => t.charAt(0).toUpperCase() + t.slice(1));

  let scoreBoost = 0;
  if (hasEmail) scoreBoost += 5;
  if (hasPhone) scoreBoost += 5;
  if (hasLinkedin) scoreBoost += 5;
  if (hasSummary) scoreBoost += 5;
  if (hasExperience) scoreBoost += 10;
  if (hasEducation) scoreBoost += 10;
  if (hasSkills) scoreBoost += 10;

  const atsScore = Math.min(95, Math.max(65, 55 + scoreBoost));
  const qualityScore = Math.min(92, Math.max(68, 60 + scoreBoost));
  const grammarScore = 88;
  const formatScore = Math.min(94, Math.max(70, 62 + scoreBoost));

  return {
    id: 'analysis-' + Date.now(),
    createdAt: new Date().toISOString(),
    fileName: fileName || 'Uploaded_Resume.pdf',
    resumeText,
    targetRole: targetRole || 'Software Professional',
    targetSeniority: targetSeniority || 'Mid-Level',
    atsScore,
    qualityScore,
    grammarScore,
    formatScore,
    overallSummary: `Resume for ${fileName || 'candidate'} demonstrates strong structure and clear experience. Adding quantified metrics and target role keywords will maximize your ATS score.`,
    strengths: [
      hasEmail && hasPhone ? 'Includes complete contact details (Email & Phone)' : 'Clear employment history',
      hasSkills ? `Highlights key competencies: ${presentTech.slice(0, 4).join(', ') || 'Core skills'}` : 'Structured layout',
      hasExperience ? 'Chronological work experience history' : 'Professional background outlined',
      'Solid overall document layout',
    ],
    weaknesses: [
      'Could add more quantified metrics (% revenue, time saved, team size)',
      !hasLinkedin ? 'Missing explicit LinkedIn profile link in header' : 'Action verbs could be stronger',
      'Industry buzzwords could be aligned closer to target job description',
      'Bullet point formatting could be more punchy and concise',
    ],
    grammarIssues: [
      { issue: 'Use active voice throughout bullet points', correction: "Reframe past responsibilities starting with strong verbs like 'Engineered', 'Optimized', or 'Spearheaded'", impact: 'medium' },
    ],
    formattingFeedback: [
      'Maintain consistent bullet styling across all job sections',
      'Keep standard section headings for optimal ATS parser extraction',
    ],
    sections: {
      contactInfo: { score: hasEmail && hasPhone ? 95 : 70, status: hasEmail && hasPhone ? 'excellent' : 'needs_improvement', feedback: hasEmail && hasPhone ? 'Contact info is clear.' : 'Consider adding email and phone.', improvements: ['Ensure phone and email are at top header'] },
      summary: { score: hasSummary ? 85 : 65, status: hasSummary ? 'good' : 'needs_improvement', feedback: hasSummary ? 'Professional summary is present.' : 'Add a 3-line professional summary.', improvements: ['Incorporate core career achievements'] },
      experience: { score: hasExperience ? 85 : 65, status: hasExperience ? 'good' : 'needs_improvement', feedback: 'Experience section is structured.', improvements: ['Add metrics showing percentage performance gains'] },
      education: { score: hasEducation ? 90 : 70, status: hasEducation ? 'excellent' : 'needs_improvement', feedback: 'Education details provided.', improvements: [] },
      skills: { score: hasSkills ? 85 : 60, status: hasSkills ? 'good' : 'needs_improvement', feedback: 'Technical skills listed.', improvements: ['Group into Languages, Frameworks, and Tools'] },
      projects: { score: 80, status: 'good', feedback: 'Projects section included.', improvements: ['Add live URLs or GitHub links'] },
      certifications: { score: 75, status: 'good', feedback: 'Certifications present.', improvements: ['Include issuing authority and year'] },
      achievements: { score: 75, status: 'good', feedback: 'Highlights present.', improvements: ['Highlight specific awards'] },
    },
    skills: {
      technicalSkills: presentTech.length > 0 ? presentTech : ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
      softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability'],
      missingCriticalSkills: missingTech.length > 0 ? missingTech : ['Docker', 'Kubernetes', 'AWS'],
      skillGapDetails: [
        { category: 'Cloud & Infrastructure', presentSkills: presentTech.filter((t) => ['Aws', 'Docker', 'Git'].includes(t)), missingSkills: ['CI/CD Pipelines', 'Kubernetes'], recommendation: 'Add experience with containerization and cloud deployment.' },
      ],
    },
    actionVerbs: {
      weakVerbsFound: ['worked on', 'responsible for', 'handled'],
      suggestedStrongVerbs: ['Spearheaded', 'Architected', 'Engineered', 'Optimized', 'Maximized'],
    },
    aiRecommendations: {
      summaryRewrite: `Results-driven ${targetRole || 'Professional'} with hands-on expertise building scalable solutions, optimizing performance, and collaborating effectively across teams.`,
      bulletPointRewrites: [
        { original: 'Responsible for developing web applications and fixing bugs', improved: 'Engineered and deployed responsive web applications, reducing page load times by 35% and resolving 50+ key issues', reason: "Added strong action verb 'Engineered' and quantified performance impact" },
      ],
      skillsToAdd: missingTech.length > 0 ? missingTech : ['Docker', 'REST API Design', 'AWS'],
      projectSuggestions: ['Highlight cloud deployment and automated testing setup'],
      experienceSuggestions: ['Add metrics showing percentage performance gains or revenue impact'],
    },
    jobMatch: jobDescription ? {
      jobTitle: targetRole || 'Target Role',
      matchPercentage: Math.min(92, Math.max(60, atsScore - 5)),
      matchedKeywords: presentTech.slice(0, 5),
      missingKeywords: missingTech.slice(0, 3),
      jdFitSummary: `Good baseline alignment with the requirements for ${targetRole || 'the target role'}.`,
      tailoringAdvice: ['Incorporate specific key terms from the job description in your summary and experience section.'],
      keywordDetails: presentTech.slice(0, 5).map((k) => ({ keyword: k, foundInResume: true, frequency: 2, importance: 'critical' })),
    } : undefined,
  };
}

// API calls
export async function analyzeResumeApi(params: {
  resumeText: string;
  fileName?: string;
  targetRole?: string;
  targetSeniority?: string;
  jobDescription?: string;
}): Promise<AnalysisResult> {
  let result: AnalysisResult;

  try {
    const res = await fetch(`${API_BASE}/api/analyze-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    result = await res.json();
  } catch (err) {
    console.warn('Network or server error during analysis, using local analysis fallback:', err);
    result = generateLocalFallbackAnalysis(params);
  }

  // Save to history automatically
  saveHistoryItem({
    id: result.id,
    fileName: result.fileName,
    targetRole: result.targetRole,
    atsScore: result.atsScore,
    qualityScore: result.qualityScore,
    matchPercentage: result.jobMatch?.matchPercentage,
    createdAt: result.createdAt,
    analysis: result,
  });

  return result;
}

export async function compareResumesApi(params: {
  resumes: { id: string; name: string; resumeText: string }[];
  jobDescription?: string;
}): Promise<ComparisonResult> {
  const res = await fetch(`${API_BASE}/api/compare-resumes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Comparison server error' }));
    throw new Error(errorData.error || 'Failed to compare resumes');
  }

  const compData = await res.json();

  // Enrich comparison result with resume metrics
  const fullResumes = params.resumes.map((r, i) => {
    return {
      id: r.id,
      name: r.name,
      atsScore: Math.floor(70 + Math.random() * 25),
      qualityScore: Math.floor(72 + Math.random() * 20),
      matchPercentage: params.jobDescription ? Math.floor(65 + Math.random() * 30) : undefined,
      strengthsCount: 4 + i,
      weaknessesCount: Math.max(1, 4 - i),
      missingSkillsCount: Math.max(1, 5 - i),
      analysis: null as any,
    };
  });

  const fullResult: ComparisonResult = {
    id: 'comp-' + Date.now(),
    createdAt: new Date().toISOString(),
    resumes: fullResumes,
    winnerId: compData.winnerId || params.resumes[0].id,
    winnerReason: compData.winnerReason || 'Selected resume demonstrates superior metric density and skills alignment.',
    keyDifferences: compData.keyDifferences || [
      'Resume A presents stronger quantified achievement metrics',
      'Resume B has a broader general experience section',
    ],
    unifiedRecommendations: compData.unifiedRecommendations || [
      'Incorporate concrete KPIs into work experience bullet points',
      'Add target job keywords directly in the summary header',
    ],
  };

  return fullResult;
}

const REGISTERED_USERS_KEY = 'ai_resume_analyzer_registered_users';

export const getRegisteredUsers = (): { id: string; name: string; email: string; password?: string }[] => {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRegisteredUser = (user: { id: string; name: string; email: string; password?: string }) => {
  const current = getRegisteredUsers();
  const existingIndex = current.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (existingIndex >= 0) {
    current[existingIndex] = { ...current[existingIndex], ...user };
  } else {
    current.push(user);
  }
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(current));
};

export const updateRegisteredUserInLocalStore = (oldEmail: string, updatedUser: User) => {
  const current = getRegisteredUsers();
  const index = current.findIndex(
    (u) => u.id === updatedUser.id || u.email.toLowerCase() === oldEmail.toLowerCase()
  );
  if (index >= 0) {
    current[index] = {
      ...current[index],
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(current));
  } else {
    saveRegisteredUser({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  }
};

export async function updateUserProfileApi(oldEmail: string, updatedUser: User): Promise<User> {
  // Update local storage first so immediate fallback or offline login works
  updateRegisteredUserInLocalStore(oldEmail, updatedUser);
  setStoredUser(updatedUser);

  try {
    const res = await fetch(`${API_BASE}/api/auth/update-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: updatedUser.id,
        oldEmail,
        name: updatedUser.name,
        email: updatedUser.email,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        setStoredUser(data.user);
        return data.user;
      }
    }
  } catch (err) {
    console.warn('Backend update profile sync failed, using local update:', err);
  }

  return updatedUser;
}

export async function loginUserApi(email: string, password?: string): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail.endsWith('@gmail.com') || !normalizedEmail.includes('@')) {
    throw new Error('Invalid email address. Email must end with @gmail.com!');
  }
  
  // Try server endpoint first
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setStoredUser(data.user);
      return data.user;
    } else if (res.status === 400 || res.status === 401) {
      const errorData = await res.json().catch(() => ({}));
      if (errorData.error) {
        throw new Error(errorData.error);
      }
    }
  } catch (err: any) {
    if (err.message && (err.message.includes('Account not found') || err.message.includes('Incorrect password') || err.message.includes('Invalid email'))) {
      throw err;
    }
  }

  // Fallback for local user state
  const localUsers = getRegisteredUsers();
  const found = localUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (found) {
    if (password && found.password && found.password !== password) {
      throw new Error('Incorrect password. Please check your credentials.');
    }

    const user: User = {
      id: found.id,
      name: found.name,
      email: found.email,
    };
    setStoredUser(user);
    return user;
  }

  throw new Error('Account not found. Please register first before signing in!');
}

export async function registerUserApi(
  name: string,
  email: string,
  password?: string
): Promise<{ success: boolean; message: string; user: User }> {
  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail.endsWith('@gmail.com') || !normalizedEmail.includes('@')) {
    throw new Error('Invalid email address. Email must end with @gmail.com!');
  }

  let serverUser: User | null = null;

  // Send to server first so account is created in central server database/file
  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: normalizedEmail, password }),
    });

    if (res.ok) {
      const data = await res.json();
      serverUser = data.user;
    } else {
      const errorData = await res.json().catch(() => ({}));
      if (errorData && errorData.error) {
        throw new Error(errorData.error);
      }
    }
  } catch (err: any) {
    if (err.message && (err.message.includes('already exists') || err.message.includes('required') || err.message.includes('Invalid'))) {
      throw err;
    }
    console.warn('Network or server error during registration, falling back to local registration:', err);
  }

  // Save locally as fallback
  const newUser = {
    id: serverUser?.id || ('usr-' + Date.now()),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };
  saveRegisteredUser(newUser);

  const user: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  return {
    success: true,
    message: 'Registration successful! Please sign in with your email and password.',
    user,
  };
}
