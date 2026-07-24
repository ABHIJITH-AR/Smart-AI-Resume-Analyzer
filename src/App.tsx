import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { UploadZone } from './components/UploadZone';
import { AnalysisResults } from './components/AnalysisResults';
import { CompareView } from './components/CompareView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { Toast } from './components/Toast';

import { AnalysisResult, User } from './types';
import { SampleResume } from './data/sampleResumes';
import { analyzeResumeApi, getStoredUser, setStoredUser } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prefillSample, setPrefillSample] = useState<SampleResume | null>(null);

  const [user, setUser] = useState<User | null>(getStoredUser());
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Enforce dark mode permanently on root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleRunAnalysis = async (params: {
    resumeText: string;
    fileName: string;
    targetRole?: string;
    targetSeniority?: string;
    jobDescription?: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await analyzeResumeApi(params);
      setCurrentAnalysis(result);
      setActiveTab('analyzer');
      showToast('Resume analyzed successfully!');
    } catch (error: any) {
      console.error('Analysis error:', error);
      showToast(error.message || 'Analysis failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSampleFromHero = (sample: SampleResume) => {
    setPrefillSample(sample);
    setCurrentAnalysis(null);
    setActiveTab('analyzer');
  };

  const handleLogout = () => {
    setStoredUser(null);
    setUser(null);
    showToast('Logged out successfully');
  };

  // If user is not logged in, show the Login Page first!
  if (!user) {
    return (
      <>
        <LoginPage
          onLoginSuccess={(u) => {
            setUser(u);
            showToast(`Signed in successfully!`);
          }}
        />
        <Toast
          message={toast?.message || null}
          type={toast?.type}
          onClose={() => setToast(null)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans transition-colors duration-300 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onUpdateUser={(updatedUser) => {
          setUser(updatedUser);
          setStoredUser(updatedUser);
          showToast('Profile updated successfully!');
        }}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <Hero
              onStartAnalysis={() => {
                setActiveTab('analyzer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectSample={handleSelectSampleFromHero}
            />

            <UploadZone
              onAnalyze={handleRunAnalysis}
              isLoading={isLoading}
              prefillSample={prefillSample}
            />
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div>
            {currentAnalysis ? (
              <AnalysisResults
                analysis={currentAnalysis}
                onReset={() => {
                  setCurrentAnalysis(null);
                  setPrefillSample(null);
                }}
              />
            ) : (
              <div className="pt-6">
                <UploadZone
                  onAnalyze={handleRunAnalysis}
                  isLoading={isLoading}
                  prefillSample={prefillSample}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && <CompareView />}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          showToast(`Welcome, ${u.name}!`);
        }}
      />

      {/* Toast Notification */}
      <Toast
        message={toast?.message || null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
