import { useState } from 'react';
import { ArrowRight, Building2, ExternalLink, Phone } from 'lucide-react';
import { AUTHORITY_RESOURCES } from '../data/legalData';
import type { AuthorityResource, SectionId } from '../types/mydata';

interface AuthoritiesSectionProps {
  onNavigate: (section: SectionId) => void;
}

type AuthorityFilter = 'all' | AuthorityResource['category'];

const FILTERS: { id: AuthorityFilter; label: string }[] = [
  { id: 'all', label: 'Все ресурсы' },
  { id: 'state', label: 'Госорганы и eOtinish' },
  { id: 'emergency', label: 'Полиция (102)' },
  { id: 'legal', label: 'Правовая база' },
];

export function AuthoritiesSection({ onNavigate }: AuthoritiesSectionProps) {
  const [filter, setFilter] = useState<AuthorityFilter>('all');

  const filteredResources =
    filter === 'all'
      ? AUTHORITY_RESOURCES
      : AUTHORITY_RESOURCES.filter((item) => item.category === filter);

  return (
    <div className="space-y-14 pt-10 pb-20 lg:pt-14">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="border-b border-[#252525]/12 pb-10">
          <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
            Раздел 04 <span aria-hidden="true">·</span> Официальные каналы Республики Казахстан
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <h1 className="font-serif text-4xl leading-tight font-semibold text-[#252525] sm:text-5xl lg:col-span-7">
              Куда обратиться за защитой персональных данных
            </h1>
            <p className="text-base leading-relaxed text-[#252525]/85 lg:col-span-5">
              Ниже собраны проверенные государственные ресурсы Республики Казахстан, способы подачи официальных обращений и первоисточники законов.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Фильтр официальных ресурсов"
            className="mt-8 inline-flex flex-wrap gap-1.5 rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/70 p-1"
          >
            {FILTERS.map((tab) => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setFilter(tab.id)}
                  className={`min-h-[40px] rounded-md px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#FCF9F4] text-[#713D46] shadow-sm'
                      : 'text-[#252525]/75 hover:text-[#252525]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Directory Cards */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="space-y-6">
          {filteredResources.map((resource, index) => (
            <article
              key={resource.id}
              className="rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs text-[#713D46]">
                    <span className="font-mono font-medium tabular-nums">0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">{resource.categoryLabel}</span>
                  </div>

                  <h2 className="mt-3 font-serif text-2xl leading-snug font-semibold text-[#252525] sm:text-3xl">
                    {resource.name}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#252525]/85">
                    {resource.shortRole}
                  </p>

                  {resource.hotline ? (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#C59A55]/50 bg-[#F7F3EC] px-3.5 py-2 text-xs font-semibold text-[#713D46] tabular-nums">
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{resource.hotline}</span>
                    </div>
                  ) : null}

                  <div className="mt-6">
                    <a
                      href={resource.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#B85C45] px-5 py-2.5 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
                    >
                      <span>{resource.urlLabel}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="space-y-5 border-t border-[#252525]/10 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
                      Когда стоит обращаться
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#252525]/85 sm:text-base">
                      {resource.whenToContact}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
                      Как подать обращение или проверить норму
                    </h3>
                    <ul className="mt-2.5 space-y-2.5">
                      {resource.howToSubmit.map((step, stepIdx) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[#252525]/85"
                        >
                          <span className="font-mono text-xs font-medium text-[#B85C45] tabular-nums">
                            {stepIdx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* University & Platform Note */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/55 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 text-[#713D46]">
              <Building2 className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                Внутри университета
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#252525]">
              Куратор, деканат и студенческий омбудсмен
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#252525]/85">
              Если публикация произошла в группе потока, канале общежития или связана с учебными списками, обращение внутри вуза часто помогает решить проблему быстрее, чем ожидание официальной проверки. Сохраните скриншоты перед встречей с представителем деканата.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6 sm:p-7">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#B85C45] uppercase">
                Подбор маршрута
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#252525]">
                Нужно понять, какой орган подходит именно вам?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#252525]/80">
                Ответьте на 4 коротких вопроса в интерактивном помощнике — он подскажет, достаточно ли обратиться к администратору площадки или пора подавать заявление через eOtinish и полицию.
              </p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNavigate('assistant')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#713D46] px-5 py-2.5 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#582D35]"
              >
                <span>Запустить помощник</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
