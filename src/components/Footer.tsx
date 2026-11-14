import { ExternalLink } from 'lucide-react';
import { LAST_VERIFIED_DATE } from '../data/legalData';
import type { SectionId } from '../types/mydata';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#252525]/12 bg-[#EAE1D5]/70 text-[#252525]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand & Legal Disclaimer */}
          <div className="lg:col-span-6">
            <div className="font-serif text-2xl font-bold text-[#252525]">MyData</div>
            <p className="mt-1 text-sm font-medium text-[#713D46]">
              Защита персональных данных в интернете · Справочник для студентов первого курса вузов Республики Казахстан
            </p>
            <div className="mt-5 rounded-md border border-[#252525]/12 bg-[#F7F3EC] p-4">
              <p className="text-xs font-semibold tracking-wide text-[#713D46]">
                Юридическая оговорка
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#252525]/85">
                Материалы сайта носят исключительно образовательный и информационно-справочный характер. Сайт не оказывает юридические услуги, не формирует индивидуальных правовых заключений и не заменяет обращение к профессиональному юристу, в уполномоченный государственный орган или правоохранительные органы. Сервис не собирает и не хранит ваши персональные данные.
              </p>
              <p className="mt-3 border-t border-[#252525]/10 pt-2.5 text-xs font-medium text-[#5C554E] tabular-nums">
                Последняя проверка правовой информации: {LAST_VERIFIED_DATE}
              </p>
            </div>
          </div>

          {/* Site Sections */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
              Разделы справочника
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-left text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  Главная
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('rights')}
                  className="text-left text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  Персональные данные и права
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('steps')}
                  className="text-left text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  Порядок действий
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('authorities')}
                  className="text-left text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  Куда обратиться
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="text-left font-semibold text-[#713D46] transition-colors hover:text-[#B85C45]"
                >
                  Интерактивный помощник
                </button>
              </li>
            </ul>
          </div>

          {/* Official Sources */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#5C554E] uppercase">
              Официальные источники РК
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://adilet.zan.kz/rus/docs/Z1300000094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  <span>Закон РК № 94-V (Әділет)</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#5C554E]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://adilet.zan.kz/rus/docs/K940001000_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  <span>Гражданский кодекс РК (ст. 145)</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#5C554E]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.kz/memleket/entities/infocom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  <span>Комитет по информбезопасности</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#5C554E]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://eotinish.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  <span>Сервис обращений eOtinish</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#5C554E]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://egov.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252525] transition-colors hover:text-[#B85C45]"
                >
                  <span>Портал eGov (контакт-центр 1414)</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#5C554E]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#252525]/10 pt-6 text-xs text-[#5C554E] sm:flex-row sm:items-center sm:justify-between">
          <span>MyData · Образовательный проект по цифровой грамотности</span>
          <span>Республика Казахстан · Без сбора персональных данных</span>
        </div>
      </div>
    </footer>
  );
}
