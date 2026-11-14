import { ArrowRight, BookOpen, Compass, Scale } from 'lucide-react';
import { TYPICAL_SITUATIONS } from '../data/legalData';
import type { AssistantAnswers, SectionId } from '../types/mydata';
import { EditorialImage } from './EditorialImage';
import heroArtwork from '../assets/images/hero_editorial_privacy_1794632274680.jpg';

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void;
  onStartScenario: (preset: Partial<AssistantAnswers>) => void;
}

export function HomeSection({ onNavigate, onStartScenario }: HomeSectionProps) {
  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Hero */}
      <section className="border-b border-[#252525]/12 pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left column */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-medium tracking-widest text-[#713D46] uppercase">
                  Справочник для студентов РК <span aria-hidden="true">·</span> Образовательный ресурс
                </p>

                <h1 className="mt-5 font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-[#252525] sm:text-5xl lg:text-[3.5rem]">
                  Защита персональных данных в интернете без сложных терминов
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#252525]/85 sm:text-lg">
                  Если вашу фотографию, номер телефона, ИИН или личную переписку опубликовали в сети без согласия, важно действовать спокойно и последовательно. MyData помогает первокурсникам казахстанских вузов разобраться в своих правах и выбрать понятный порядок шагов.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md bg-[#B85C45] px-6 py-3 text-sm font-semibold text-[#F7F3EC] transition-colors duration-150 hover:bg-[#9A4834]"
                >
                  <span>Открыть интерактивный помощник</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('rights')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-[#252525]/20 bg-[#FCF9F4] px-5 py-3 text-sm font-medium text-[#252525] transition-colors duration-150 hover:border-[#713D46]/40 hover:bg-[#EAE1D5]/60"
                >
                  <span>Изучить права и законы</span>
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-5">
              <EditorialImage
                src={heroArtwork}
                alt="Композиция из матового стекла и латунной рамки как символ защиты личной неприкосновенности"
                caption="Иллюстрация: право на частную жизнь и контроль над собственным изображением"
                aspectClass="aspect-[3/4] lg:h-full lg:min-h-[420px]"
                className="h-full"
              />
            </div>
          </div>

          {/* 3-Column Foundation Strip */}
          <div className="mt-12 grid grid-cols-1 border-t border-[#252525]/12 pt-8 md:grid-cols-3 md:gap-8">
            <div className="py-3 md:py-0">
              <p className="font-mono text-xs text-[#713D46]">01 / Закон РК № 94-V</p>
              <p className="mt-1.5 text-sm font-semibold text-[#252525]">
                Согласие — базовое правило
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#5C554E]">
                Сбор и распространение персональных данных требуют согласия субъекта, кроме прямо указанных в законе случаев.
              </p>
            </div>

            <div className="border-t border-[#252525]/10 py-3 md:border-t-0 md:border-l md:pl-8 md:py-0">
              <p className="font-mono text-xs text-[#713D46]">02 / Статья 145 ГК РК</p>
              <p className="mt-1.5 text-sm font-semibold text-[#252525]">
                Право на собственное изображение
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#5C554E]">
                Публиковать или пересылать фото и видео с вами в открытый доступ по общему правилу можно только с вашего разрешения.
              </p>
            </div>

            <div className="border-t border-[#252525]/10 py-3 md:border-t-0 md:border-l md:pl-8 md:py-0">
              <p className="font-mono text-xs text-[#713D46]">03 / Приватность без форм</p>
              <p className="mt-1.5 text-sm font-semibold text-[#252525]">
                Справочник ничего не собирает
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#5C554E]">
                Сайт не запрашивает имя, телефон, ИИН или файлы: весь разбор ситуации проходит локально в вашем браузере.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Overview */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-widest text-[#B85C45] uppercase">
              Контекст первого курса
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold text-[#252525] sm:text-4xl">
              Почему тема защиты данных особенно важна в университете
            </h2>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-[#252525]/85 lg:col-span-8">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:font-semibold first-letter:text-[#713D46]">
              В первые месяцы учёбы первокурсники одновременно попадают в десятки студенческих чатов, групп общежитий, каналов факультетов и общих таблиц для регистрации. В такой среде фотографии, номера телефонов, расписания и даже копии документов часто пересылаются быстро и без проверки, давал ли человек разрешение на публикацию.
            </p>
            <p>
              Многие считают, что если снимок сделан в коридоре или на мероприятии, либо если номер телефона уже был в общем чате группы, то повлиять на его дальнейшее распространение невозможно. На практике законодательство Республики Казахстан закрепляет право человека контролировать свои персональные данные, отзывать согласие и требовать удаления незаконно размещённых материалов.
            </p>
          </div>
        </div>
      </section>

      {/* Typical Student Situations */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 border-t border-[#252525]/12 pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#713D46] uppercase">
              Типичные ситуации
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#252525] sm:text-4xl">
              С чем чаще всего сталкиваются студенты
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#5C554E]">
            Выберите похожий случай — помощник сразу подставит базовые параметры и поможет дойти до конкретного плана действий.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TYPICAL_SITUATIONS.map((situation) => (
            <article
              key={situation.id}
              className="flex flex-col justify-between rounded-lg border border-[#252525]/12 bg-[#FCF9F4] p-6 transition-colors duration-150 hover:border-[#B85C45]/50 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#5C554E]">
                  <span className="font-mono font-medium text-[#713D46] tabular-nums">
                    {situation.index} · {situation.category}
                  </span>
                  <span className="text-right">{situation.relevantLaw}</span>
                </div>

                <h3 className="mt-4 font-serif text-2xl leading-snug font-semibold text-[#252525]">
                  {situation.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#252525]/80">
                  {situation.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#252525]/10 pt-4">
                <button
                  type="button"
                  onClick={() => onStartScenario(situation.presetAnswers)}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-[#B85C45] transition-colors hover:text-[#713D46]"
                >
                  <span>Разобрать ситуацию в помощнике</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section Directory Bridge */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="rounded-lg border border-[#252525]/12 bg-[#EAE1D5]/65 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col justify-between">
              <div>
                <Scale className="h-5 w-5 text-[#713D46]" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-2xl font-semibold text-[#252525]">
                  Права и нормы РК
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#252525]/80">
                  Разберитесь, что относится к персональным данным, как работает согласие и какие статьи законов применяются.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('rights')}
                className="mt-5 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#713D46] hover:text-[#B85C45]"
              >
                <span>Перейти в раздел</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col justify-between border-t border-[#252525]/12 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div>
                <BookOpen className="h-5 w-5 text-[#713D46]" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-2xl font-semibold text-[#252525]">
                  Порядок действий
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#252525]/80">
                  Последовательная инструкция из шести шагов: от фиксации скриншотов до обращения в университет и госорганы.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('steps')}
                className="mt-5 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#713D46] hover:text-[#B85C45]"
              >
                <span>Открыть инструкцию</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col justify-between border-t border-[#252525]/12 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div>
                <Compass className="h-5 w-5 text-[#713D46]" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-2xl font-semibold text-[#252525]">
                  Куда обратиться
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#252525]/80">
                  Проверенные государственные порталы и ведомства Казахстана: КИБ, eOtinish, eGov, Әділет и полиция (102).
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('authorities')}
                className="mt-5 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#713D46] hover:text-[#B85C45]"
              >
                <span>Смотреть ресурсы</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
