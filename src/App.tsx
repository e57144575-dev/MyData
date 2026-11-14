import { useEffect, useState } from 'react';
import { AssistantSection } from './components/AssistantSection';
import { AuthoritiesSection } from './components/AuthoritiesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { RightsSection } from './components/RightsSection';
import { StepsSection } from './components/StepsSection';
import { ASSISTANT_QUESTIONS } from './data/legalData';
import type { AssistantAnswers, SectionId } from './types/mydata';

const INITIAL_ANSWERS: AssistantAnswers = {
  dataType: '',
  platform: '',
  consent: '',
  resolution: '',
};

const VALID_SECTIONS: SectionId[] = ['home', 'rights', 'steps', 'authorities', 'assistant'];

function getSectionFromHash(): SectionId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '') as SectionId;
  return VALID_SECTIONS.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

  // Assistant state persisted across section switches during session
  const [answers, setAnswers] = useState<AssistantAnswers>(INITIAL_ANSWERS);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(getSectionFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (section: SectionId) => {
    setActiveSection(section);
    if (window.location.hash !== `#${section}`) {
      window.history.pushState(null, '', `#${section}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScenario = (preset: Partial<AssistantAnswers>) => {
    const merged: AssistantAnswers = {
      ...INITIAL_ANSWERS,
      ...preset,
    };
    setAnswers(merged);
    setShowResult(false);
    setValidationError(null);

    // Jump to the first unanswered step
    const firstUnansweredIndex = ASSISTANT_QUESTIONS.findIndex((q) => !merged[q.key]);
    setCurrentStep(firstUnansweredIndex >= 0 ? firstUnansweredIndex : 0);
    navigateTo('assistant');
  };

  const handleSelectAnswer = (key: keyof AssistantAnswers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
    setValidationError(null);
  };

  const handleNext = () => {
    const activeQuestion = ASSISTANT_QUESTIONS[currentStep];
    if (!activeQuestion) return;

    if (!answers[activeQuestion.key]) {
      setValidationError(
        'Пожалуйста, выберите один из вариантов ответа, чтобы продолжить разбор ситуации.'
      );
      return;
    }

    setValidationError(null);
    if (currentStep < ASSISTANT_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (stepIndex: number) => {
    setValidationError(null);
    setShowResult(false);
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(0);
    setShowResult(false);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#252525]">
      <Header activeSection={activeSection} onNavigate={navigateTo} />

      <main className="flex-1">
        {activeSection === 'home' ? (
          <HomeSection onNavigate={navigateTo} onStartScenario={handleStartScenario} />
        ) : null}

        {activeSection === 'rights' ? <RightsSection onNavigate={navigateTo} /> : null}

        {activeSection === 'steps' ? <StepsSection onNavigate={navigateTo} /> : null}

        {activeSection === 'authorities' ? (
          <AuthoritiesSection onNavigate={navigateTo} />
        ) : null}

        {activeSection === 'assistant' ? (
          <AssistantSection
            answers={answers}
            currentStep={currentStep}
            showResult={showResult}
            validationError={validationError}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onBack={handleBack}
            onJumpToStep={handleJumpToStep}
            onRestart={handleRestart}
            onNavigate={navigateTo}
          />
        ) : null}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
