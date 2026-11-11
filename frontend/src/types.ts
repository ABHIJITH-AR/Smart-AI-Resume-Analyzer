export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SectionDetail {
  score: number; // 0 - 100
  status: 'excellent' | 'good' | 'needs_improvement' | 'missing';
  feedback: string;
  improvements: string[];
}

export interface SectionAnalysis {
  contactInfo: SectionDetail;
  summary: SectionDetail;
  experience: SectionDetail;
  education: SectionDetail;
  skills: SectionDetail;
  projects: SectionDetail;
  certifications: SectionDetail;
  achievements: SectionDetail;
}

export interface GrammarIssue {
  issue: string;
  correction: string;
  impact: 'low' | 'medium' | 'high';
}

export interface BulletRewrite {
  original: string;
  improved: string;
  reason: string;
}

export interface SkillGapDetail {
  category: string;
  presentSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export interface KeywordMatch {
  keyword: string;
  foundInResume: boolean;
  frequency: number;
  importance: 'critical' | 'important' | 'nice_to_have';
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  fileName: string;
  resumeText: string;
  targetRole?: string;
  targetSeniority?: string;
  atsScore: number;
  qualityScore: number;
  grammarScore: number;
  formatScore: number;
  overallSummary: string;
  strengths: string[];
  weaknesses: string[];
  grammarIssues: GrammarIssue[];
  formattingFeedback: string[];
  sections: SectionAnalysis;
  skills: {
    technicalSkills: string[];
    softSkills: string[];
    missingCriticalSkills: string[];
    skillGapDetails: SkillGapDetail[];
  };
  actionVerbs: {
    weakVerbsFound: string[];
    suggestedStrongVerbs: string[];
  };
  aiRecommendations: {
    summaryRewrite: string;
    bulletPointRewrites: BulletRewrite[];
    skillsToAdd: string[];
    projectSuggestions: string[];
    experienceSuggestions: string[];
  };
  jobMatch?: {
    jobTitle?: string;
    jobDescription?: string;
    matchPercentage: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    jdFitSummary: string;
    tailoringAdvice: string[];
    keywordDetails: KeywordMatch[];
  };
}

export interface HistoryItem {
  id: string;
  fileName: string;
  targetRole?: string;
  atsScore: number;
  qualityScore: number;
  matchPercentage?: number;
  createdAt: string;
  analysis: AnalysisResult;
}

export interface ComparisonResult {
  id: string;
  createdAt: string;
  resumes: {
    id: string;
    name: string;
    atsScore: number;
    qualityScore: number;
    matchPercentage?: number;
    strengthsCount: number;
    weaknessesCount: number;
    missingSkillsCount: number;
    analysis: AnalysisResult;
  }[];
  winnerId: string;
  winnerReason: string;
  keyDifferences: string[];
  unifiedRecommendations: string[];
}
