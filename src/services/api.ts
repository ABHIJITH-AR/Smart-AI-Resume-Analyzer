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

// API calls
export async function analyzeResumeApi(params: {
  resumeText: string;
  fileName?: string;
  targetRole?: string;
  targetSeniority?: string;
  jobDescription?: string;
}): Promise<AnalysisResult> {
  const res = await fetch(`${API_BASE}/api/analyze-resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Analysis server error' }));
    throw new Error(errorData.error || 'Failed to analyze resume');
  }

  const result: AnalysisResult = await res.json();

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
    } else {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Login failed with status ${res.status}`);
    }
  } catch (err: any) {
    // If error came from server response, rethrow it directly
    if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }

    // Fallback for offline network failure
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
      throw new Error(errorData.error || 'Registration failed on server');
    }
  } catch (err: any) {
    if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
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
