import { useMemo } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Edit3,
  ExternalLink,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { ASSISTANT_QUESTIONS, buildRecommendation } from '../data/legalData';
import type { AssistantAnswers, SectionId } from '../types/mydata';

interface AssistantSectionProps {
  answers: AssistantAnswers;
  currentStep: number;
  showResult: boolean;
  validationError: string | null;
  onSelectAnswer: (key: keyof AssistantAnswers, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onJumpToStep: (stepIndex: number) => void;
  onRestart: () => void;
  onNavigate: (section: SectionId) => void;
}

export function AssistantSection({
  answers,
  currentStep,
  showResult,
  validationError,
  onSelectAnswer,
  onNext,
  onBack,
  onJumpToStep,
  onRestart,
  onNavigate,
}: AssistantSectionProps) {
  const totalSteps = ASSISTANT_QUESTIONS.length;
  const activeQuestion = ASSISTANT_QUESTIONS[currentStep];
  const currentAnswerValue = activeQuestion ? answers[activeQuestion.key] : '';

  const recommendation = useMemo(() => {
    if (!showResult) return null;
    return buildRecommendation(answers);
  }, [showResult, answers]);

  const progressPercentage = showResult
    ? 100
    : Math.round(((currentStep + 1) / totalSteps) * 100);

  const getAnswerLabel = (key: keyof AssistantAnswers, value: string): string => {
    const question = ASSISTANT_QUESTIONS.find((q) => q.key === key);
    const option = question?.options.find((opt) => opt.value === value);
    return option?.label ?? 'Не выбрано';
  };

  return (
    <div className="pt-10 pb-20 lg:pt-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        {/* Top Intro */}
        <div className="border-b border-[#252525]/12 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
              Раздел 05 <span aria-hidden="true">·</span> Интерактивный помощник
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[#252525]/15 bg-[#FCF9F4] px-3 py-1.5 text-xs font-semibold text-[#252525] transition-colors hover:border-[#B85C45] hover:text-[#B85C45]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Начать заново</span>
            </button>
          </div>

          <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold text-[#252525] sm:text-5xl">
            Подбор алгоритма действий
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5C554E] sm:text-base">
            Ответьте на четыре последовательных вопроса о вашей ситуации. Помощник не запрашивает имя, телефон, ИИН или файлы — все расчёты происходят только в вашем браузере.
          </p>
        </div>

        {/* Progress Bar & Step Switcher */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-medium text-[#5C554E] tabular-nums">
            <span>
              {showResult
                ? 'Алгоритм сформирован (4 из 4)'
                : `Шаг ${currentStep + 1} из ${totalSteps}`}
            </span>
            <span>{progressPercentage}%</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Прогресс прохождения вопросов помощника"
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EAE1D5]"
          >
            <div
              className="h-full bg-[#B85C45] transition-transform duration-200 ease-out origin-left"
              style={{ transform: `scaleX(${progressPercentage / 100})` }}
            />
          </div>

          {/* Clickable Step Indicators */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {ASSISTANT_QUESTIONS.map((q, idx) => {
              const isAnswered = Boolean(answers[q.key]);
              const isCurrent = !showResult && idx === currentStep;
              const canJump = isAnswered || idx <= currentStep;

              return (
                <button
                  key={q.key}
                  type="button"
                  disabled={!canJump}
                  onClick={() => canJump && onJumpToStep(idx)}
                  className={`flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors tabular-nums ${
                    isCurrent
                      ? 'border-[#713D46] bg-[#713D46] text-[#F7F3EC]'
                      : isAnswered
                        ? 'border-[#C59A55]/60 bg-[#FCF9F4] text-[#252525] hover:border-[#B85C45]'
                        : 'border-[#252525]/10 bg-[#EAE1D5]/50 text-[#5C554E]/70 cursor-not-allowed'
                  }`}
                >
                  <span>{q.stepNumber}</span>
                  <span className="hidden sm:inline truncate">
                    {idx === 0
                      ? 'Данные'
                      : idx === 1
                        ? 'Площадка'
                        : idx === 2
                          ? 'Согласие'
                          : 'Статус'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Step View OR Result View */}
        {!showResult && activeQuestion ? (
          <section
            aria-live="polite"
            className="mt-8 rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6 sm:p-8"
          >
            <p className="font-mono text-xs font-medium text-[#B85C45] tabular-nums">
              Вопрос {activeQuestion.stepNumber} / 0{totalSteps}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-snug font-semibold text-[#252525]">
              {activeQuestion.title}
            </h2>
            <p className="mt-2 text-sm text-[#5C554E]">{activeQuestion.subtitle}</p>

            {/* Options */}
            <div role="radiogroup" aria-label={activeQuestion.title} className="mt-6 space-y-3">
              {activeQuestion.options.map((option) => {
                const isSelected = currentAnswerValue === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onSelectAnswer(activeQuestion.key, option.value)}
                    className={`flex min-h-[60px] w-full items-start gap-3.5 rounded-lg border p-4 text-left transition-colors duration-150 ${
                      isSelected
                        ? 'border-[#B85C45] bg-[#EAE1D5]/55'
                        : 'border-[#252525]/12 bg-[#F7F3EC]/60 hover:border-[#713D46]/45 hover:bg-[#EAE1D5]/30'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-[#B85C45] bg-[#B85C45]'
                          : 'border-[#252525]/35 bg-[#FCF9F4]'
                      }`}
                    >
                      {isSelected ? (
                        <span className="h-2 w-2 rounded-full bg-[#F7F3EC]" />
                      ) : null}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#252525] sm:text-base">
                        {option.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#5C554E] sm:text-sm">
                        {option.hint}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Empty Answer Validation Message */}
            {validationError ? (
              <div
                role="alert"
                className="mt-5 flex items-start gap-2.5 rounded-md border border-[#713D46]/40 bg-[#713D46]/10 px-4 py-3 text-sm text-[#713D46]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{validationError}</span>
              </div>
            ) : null}

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#252525]/10 pt-6">
              <button
                type="button"
                onClick={onBack}
                disabled={currentStep === 0}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                  currentStep === 0
                    ? 'border-[#252525]/10 bg-[#F7F3EC] text-[#5C554E]/50 cursor-not-allowed'
                    : 'border-[#252525]/20 bg-[#F7F3EC] text-[#252525] hover:bg-[#EAE1D5]'
                }`}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Назад</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#B85C45] px-6 py-2.5 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
              >
                <span>
                  {currentStep === totalSteps - 1 ? 'Получить алгоритм' : 'Продолжить'}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </section>
        ) : recommendation ? (
          <section aria-live="polite" className="mt-8 space-y-8">
            {/* Chosen Answers Summary with Direct Edit */}
            <div className="rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/55 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-serif text-xl font-semibold text-[#252525]">
                  Ваши выбранные параметры
                </h2>
                <span className="text-xs text-[#5C554E]">
                  Нажмите на любой пункт, чтобы изменить ответ
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ASSISTANT_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => onJumpToStep(idx)}
                    className="flex min-h-[56px] items-start justify-between gap-3 rounded-md border border-[#252525]/12 bg-[#FCF9F4] p-3.5 text-left transition-colors hover:border-[#B85C45]"
                  >
                    <div>
                      <p className="font-mono text-[11px] font-medium text-[#713D46] tabular-nums">
                        {q.stepNumber} · {q.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#252525] sm:text-sm">
                        {getAnswerLabel(q.key, answers[q.key])}
                      </p>
                    </div>
                    <Edit3
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#5C554E]"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Card */}
            <div className="rounded-lg border border-[#252525]/15 bg-[#FCF9F4] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#713D46]">
                {recommendation.urgencyLevel === 'urgent' ? (
                  <ShieldAlert className="h-4 w-4 shrink-0 text-[#B85C45]" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#713D46]" aria-hidden="true" />
                )}
                <span>{recommendation.urgencyLabel}</span>
              </div>

              <h2 className="mt-3 font-serif text-3xl leading-snug font-semibold text-[#252525] sm:text-4xl">
                {recommendation.headline}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#252525]/85 sm:text-base">
                {recommendation.summary}
              </p>

              {/* Step-by-Step Plan */}
              <div className="mt-8 border-t border-[#252525]/12 pt-6">
                <h3 className="text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
                  Рекомендуемая последовательность шагов
                </h3>

                <div className="mt-4 space-y-4">
                  {recommendation.steps.map((step) => (
                    <div
                      key={step.order}
                      className="rounded-md border border-[#252525]/10 bg-[#F7F3EC] p-4 sm:p-5"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold text-[#B85C45] tabular-nums">
                          {step.order}.
                        </span>
                        <h4 className="font-serif text-xl font-semibold text-[#252525]">
                          {step.title}
                        </h4>
                      </div>
                      <p className="mt-2 pl-7 text-sm leading-relaxed text-[#252525]/85">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Norms & Channels */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#252525]/12 pt-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
                    Применимые нормы РК
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {recommendation.legalRefs.map((ref) => (
                      <li
                        key={ref.title}
                        className="rounded-md border border-[#252525]/10 bg-[#F7F3EC]/70 p-3.5"
                      >
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#713D46] hover:text-[#B85C45]"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                        <p className="mt-1 text-xs leading-relaxed text-[#5C554E]">{ref.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
                    Рекомендуемые каналы и разделы
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {recommendation.recommendedChannels.map((channel) => (
                      <li
                        key={channel.name}
                        className="rounded-md border border-[#252525]/10 bg-[#F7F3EC]/70 p-3.5"
                      >
                        {channel.externalUrl ? (
                          <a
                            href={channel.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B85C45] hover:text-[#713D46]"
                          >
                            <span>{channel.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        ) : channel.targetSection ? (
                          <button
                            type="button"
                            onClick={() => onNavigate(channel.targetSection as SectionId)}
                            className="inline-flex items-center gap-1.5 text-left text-sm font-semibold text-[#B85C45] hover:text-[#713D46]"
                          >
                            <span>{channel.name}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </button>
                        ) : null}
                        <p className="mt-1 text-xs leading-relaxed text-[#5C554E]">
                          {channel.reason}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Precautions */}
              <div className="mt-8 rounded-md border border-[#C59A55]/50 bg-[#EAE1D5]/45 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-wider text-[#713D46] uppercase">
                  Важные предостережения
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#252525]/85">
                  {recommendation.precautions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#713D46]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Educational Disclaimer & Result Controls */}
              <div className="mt-8 flex flex-col gap-4 border-t border-[#252525]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-xs leading-relaxed text-[#5C554E]">
                  Данный алгоритм является справочным ориентиром и не представляет собой индивидуальное юридическое заключение. При серьёзных нарушениях обратитесь в уполномоченные органы или к квалифицированному юристу.
                </p>

                <div className="flex flex-wrap gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onJumpToStep(totalSteps - 1)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#252525]/20 bg-[#F7F3EC] px-4 py-2 text-sm font-semibold text-[#252525] transition-colors hover:bg-[#EAE1D5]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>К вопросам</span>
                  </button>
                  <button
                    type="button"
                    onClick={onRestart}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#B85C45] px-5 py-2 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Начать заново</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
