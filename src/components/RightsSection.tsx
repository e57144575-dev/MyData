import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  CITIZEN_RIGHTS,
  CONSENT_RULES,
  DATA_CATEGORIES,
  LEGAL_NORMS,
} from '../data/legalData';
import type { DataCategoryItem, SectionId } from '../types/mydata';
import { EditorialImage } from './EditorialImage';
import rightsArtwork from '../assets/images/rights_archival_layers_1794632275163.jpg';

interface RightsSectionProps {
  onNavigate: (section: SectionId) => void;
}

export function RightsSection({ onNavigate }: RightsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<DataCategoryItem['id']>('general');
  const [consentTab, setConsentTab] = useState<'required' | 'exceptions'>('required');

  const activeCategory =
    DATA_CATEGORIES.find((cat) => cat.id === selectedCategory) ?? DATA_CATEGORIES[0];

  const activeConsent = CONSENT_RULES[consentTab];

  return (
    <div className="space-y-16 pt-10 pb-20 lg:pt-14">
      {/* Editorial Section Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 border-b border-[#252525]/12 pb-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
              Раздел 02 <span aria-hidden="true">·</span> Правовая основа РК
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#252525] sm:text-5xl">
              Персональные данные и права гражданина
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#252525]/85 sm:text-lg">
              Чтобы уверенно защищать себя в спорной ситуации, достаточно понимать четыре вещи: какие сведения закон считает персональными данными, когда нужно согласие, какие права есть у субъекта данных и какие нормы законодательства Республики Казахстан применяются.
            </p>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src={rightsArtwork}
              alt="Стопка архивной бумаги, томик права и матовая пластиковая карта на тёплом камне"
              caption="Правовое регулирование: от Конституции РК до Закона № 94-V"
              aspectClass="aspect-[4/3] lg:h-full"
              className="h-full"
            />
          </div>
        </div>
      </section>

      {/* Definitions & Categories Switcher */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#B85C45] uppercase">
              Определения и виды
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#252525]">
              Что относится к персональным данным
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Виды персональных данных"
            className="flex flex-wrap gap-1.5 rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/70 p-1"
          >
            {DATA_CATEGORIES.map((category) => {
              const isSelected = category.id === selectedCategory;
              const shortLabel =
                category.id === 'general'
                  ? 'Общие данные'
                  : category.id === 'biometric'
                    ? 'Фото и биометрия'
                    : 'Режим доступа';
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#FCF9F4] text-[#713D46] shadow-sm'
                      : 'text-[#252525]/75 hover:text-[#252525]'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-medium text-[#713D46]">
                {activeCategory.articleRef}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#252525] sm:text-3xl">
                {activeCategory.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#252525]/85">
                {activeCategory.definition}
              </p>

              <div className="mt-6 rounded-md border border-[#C59A55]/45 bg-[#F7F3EC] p-4">
                <p className="text-xs font-semibold tracking-wide text-[#713D46] uppercase">
                  Ключевое правило
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#252525]">
                  {activeCategory.keyRule}
                </p>
              </div>
            </div>

            <div className="border-t border-[#252525]/10 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <h4 className="text-sm font-semibold text-[#252525]">
                Примеры из студенческой жизни
              </h4>
              <ul className="mt-4 space-y-3">
                {activeCategory.studentExamples.map((example, idx) => (
                  <li
                    key={example}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#252525]/85"
                  >
                    <span className="mt-0.5 font-mono text-xs font-medium text-[#B85C45] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consent & Exceptions */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/55 p-6 sm:p-10">
          <div className="flex flex-col gap-5 border-b border-[#252525]/12 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
                Согласие субъекта
              </p>
              <h2 className="mt-1.5 font-serif text-3xl font-semibold text-[#252525]">
                Как работает согласие на публикацию
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Правила согласия"
              className="flex flex-wrap gap-1.5 rounded-lg border border-[#252525]/12 bg-[#F7F3EC] p-1"
            >
              <button
                role="tab"
                type="button"
                aria-selected={consentTab === 'required'}
                onClick={() => setConsentTab('required')}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  consentTab === 'required'
                    ? 'bg-[#713D46] text-[#F7F3EC]'
                    : 'text-[#252525]/80 hover:text-[#252525]'
                }`}
              >
                Когда согласие обязательно
              </button>
              <button
                role="tab"
                type="button"
                aria-selected={consentTab === 'exceptions'}
                onClick={() => setConsentTab('exceptions')}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  consentTab === 'exceptions'
                    ? 'bg-[#713D46] text-[#F7F3EC]'
                    : 'text-[#252525]/80 hover:text-[#252525]'
                }`}
              >
                Исключения по закону
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-serif text-2xl font-semibold text-[#252525]">
              {activeConsent.title}
            </h3>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#252525]/85 sm:text-base">
              {activeConsent.intro}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {activeConsent.points.map((point, index) => (
                <div
                  key={point}
                  className="rounded-md border border-[#252525]/10 bg-[#FCF9F4] p-4"
                >
                  <span className="font-mono text-xs font-medium text-[#B85C45] tabular-nums">
                    0{index + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#252525]/85">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Rights */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="border-t border-[#252525]/12 pt-12">
          <p className="text-xs font-semibold tracking-widest text-[#B85C45] uppercase">
            Статья 24 Закона РК № 94-V
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#252525] sm:text-4xl">
            Основные права гражданина
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5C554E] sm:text-base">
            В законодательстве Республики Казахстан каждый студент является субъектом персональных данных и обладает следующими правами.
          </p>

          <div className="mt-8 divide-y divide-[#252525]/12 border-y border-[#252525]/12">
            {CITIZEN_RIGHTS.map((right) => (
              <div
                key={right.number}
                className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-baseline lg:gap-8"
              >
                <div className="flex items-baseline gap-3 lg:col-span-5">
                  <span className="font-mono text-sm font-medium text-[#B85C45] tabular-nums">
                    {right.number}.
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#252525]">
                      {right.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#713D46]">
                      {right.legalBasis}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#252525]/85 sm:text-base lg:col-span-7">
                  {right.plainExplanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applicable Kazakhstan Legal Norms */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
              Нормативная база
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#252525] sm:text-4xl">
              Применимые законы Республики Казахстан
            </h2>
          </div>
          <p className="text-xs text-[#5C554E]">
            Все ссылки ведут на эталонный банк НПА «Әділет»
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {LEGAL_NORMS.map((norm) => (
            <article
              key={norm.id}
              className="rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#713D46]">
                    <span className="font-semibold">{norm.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{norm.article}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#252525]">
                    {norm.actName}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#252525]/85">
                    {norm.summary}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#5C554E]">
                    <span className="font-semibold text-[#252525]">Для студента: </span>
                    {norm.relevanceForStudent}
                  </p>
                </div>

                <a
                  href={norm.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] shrink-0 items-center gap-2 self-start rounded-md border border-[#252525]/18 bg-[#F7F3EC] px-4 py-2 text-xs font-semibold text-[#252525] whitespace-nowrap transition-colors hover:border-[#B85C45] hover:text-[#B85C45]"
                >
                  <span>Открыть в {norm.sourceLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/60 p-6">
          <div>
            <p className="font-serif text-2xl font-semibold text-[#252525]">
              Нужно применить эти правила к вашей ситуации?
            </p>
            <p className="mt-1 text-sm text-[#5C554E]">
              Откройте пошаговую инструкцию или подберите алгоритм в интерактивном помощнике.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('steps')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#252525]/20 bg-[#FCF9F4] px-4 py-2 text-sm font-semibold text-[#252525] transition-colors hover:bg-[#F7F3EC]"
            >
              <span>Порядок действий</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assistant')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#B85C45] px-5 py-2 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
            >
              <span>Перейти в помощник</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
