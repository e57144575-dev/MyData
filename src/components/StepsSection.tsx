import { useState } from 'react';
import { ArrowRight, Check, Copy, ShieldAlert } from 'lucide-react';
import { ACTION_STEPS, WHAT_NOT_TO_DO } from '../data/legalData';
import type { SectionId } from '../types/mydata';
import { EditorialImage } from './EditorialImage';
import protocolArtwork from '../assets/images/action_protocol_dossier_1794632276192.jpg';

interface StepsSectionProps {
  onNavigate: (section: SectionId) => void;
}

export function StepsSection({ onNavigate }: StepsSectionProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const toggleStep = (stepNumber: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((item) => item !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const handleCopyTemplate = async (stepNumber: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepNumber);
      setTimeout(() => {
        setCopiedStep((curr) => (curr === stepNumber ? null : curr));
      }, 2500);
    } catch {
      setCopiedStep(null);
    }
  };

  return (
    <div className="space-y-16 pt-10 pb-20 lg:pt-14">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 border-b border-[#252525]/12 pb-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
              Раздел 03 <span aria-hidden="true">·</span> Последовательный алгоритм
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#252525] sm:text-5xl">
              Порядок действий при публикации данных без согласия
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#252525]/85 sm:text-lg">
              Главная ошибка в первые минуты — эмоционально просить удалить пост и не сохранить доказательства. Используйте спокойный поэтапный порядок: от фиксации факта до обращения к администрации вуза и в государственные органы.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-[#5C554E] tabular-nums">
              <span>
                Отмечено шагов в памятке: {completedSteps.length} из {ACTION_STEPS.length}
              </span>
              {completedSteps.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setCompletedSteps([])}
                  className="text-[#B85C45] underline-offset-2 hover:underline"
                >
                  Сбросить отметки
                </button>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src={protocolArtwork}
              alt="Бумажные папки, сургучная печать и чернильная ручка как символ документирования шагов"
              caption="Последовательность действий: фиксация, обращение, жалоба на платформе, официальная защита"
              aspectClass="aspect-[4/3] lg:h-full"
              className="h-full"
            />
          </div>
        </div>
      </section>

      {/* 6 Sequential Steps */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="space-y-6">
          {ACTION_STEPS.map((step) => {
            const isDone = completedSteps.includes(step.number);
            return (
              <article
                key={step.number}
                className={`rounded-lg border p-6 transition-colors duration-150 sm:p-8 ${
                  isDone
                    ? 'border-[#C59A55] bg-[#EAE1D5]/45'
                    : 'border-[#252525]/12 bg-[#FCF9F4]'
                }`}
              >
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-medium text-[#B85C45] tabular-nums">
                        Шаг {step.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleStep(step.number)}
                        aria-pressed={isDone}
                        className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-semibold transition-colors ${
                          isDone
                            ? 'border-[#713D46] bg-[#713D46] text-[#F7F3EC]'
                            : 'border-[#252525]/20 bg-[#F7F3EC] text-[#252525] hover:border-[#B85C45]'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isDone ? 'Изучено' : 'Отметить'}</span>
                      </button>
                    </div>

                    <h2 className="mt-3 font-serif text-2xl leading-snug font-semibold text-[#252525] sm:text-[1.75rem]">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#5C554E]">{step.subtitle}</p>
                  </div>

                  <div className="border-t border-[#252525]/10 pt-5 lg:col-span-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[#252525]/85 sm:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B85C45]"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {step.templateText ? (
                      <div className="mt-5 rounded-md border border-[#252525]/12 bg-[#F7F3EC] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-semibold tracking-wide text-[#713D46] uppercase">
                            Нейтральный образец первого сообщения
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyTemplate(step.number, step.templateText as string)
                            }
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-[#252525]/15 bg-[#FCF9F4] px-3 py-1 text-xs font-semibold text-[#252525] transition-colors hover:border-[#B85C45]"
                          >
                            {copiedStep === step.number ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-[#713D46]" aria-hidden="true" />
                                <span>Текст скопирован</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Скопировать шаблон</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#252525]/85">
                          «{step.templateText}»
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-5 rounded-md border border-[#C59A55]/45 bg-[#F7F3EC] px-4 py-3 text-xs leading-relaxed text-[#252525]/85 sm:text-sm">
                      <span className="font-semibold text-[#713D46]">На что обратить внимание: </span>
                      {step.tip}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* What Not To Do */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="border-t border-[#252525]/12 pt-12">
          <div className="flex items-center gap-2.5 text-[#713D46]">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-widest uppercase">
              Типичные ошибки
            </p>
          </div>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#252525] sm:text-4xl">
            Чего делать не стоит
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WHAT_NOT_TO_DO.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/55 p-6"
              >
                <span className="font-mono text-xs font-medium text-[#713D46] tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[#252525]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#252525]/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6">
          <div>
            <p className="font-serif text-2xl font-semibold text-[#252525]">
              Не уверены, с какого шага начать именно сейчас?
            </p>
            <p className="mt-1 text-sm text-[#5C554E]">
              Интерактивный помощник соберёт короткий алгоритм под вашу конкретную ситуацию.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('authorities')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#252525]/20 bg-[#F7F3EC] px-4 py-2 text-sm font-semibold text-[#252525] transition-colors hover:bg-[#EAE1D5]"
            >
              <span>Куда обратиться</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assistant')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#B85C45] px-5 py-2 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
            >
              <span>Открыть помощник</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
