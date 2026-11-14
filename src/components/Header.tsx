import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { SectionId } from '../types/mydata';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'rights', label: 'Данные и права' },
  { id: 'steps', label: 'Порядок действий' },
  { id: 'authorities', label: 'Куда обратиться' },
];

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: SectionId) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#252525]/12 bg-[#F7F3EC]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-8">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="font-serif text-2xl font-bold tracking-tight text-[#252525] whitespace-nowrap shrink-0 transition-colors hover:text-[#B85C45]"
        >
          MyData
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#713D46]'
                    : 'text-[#252525]/75 hover:text-[#252525]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-[2px] h-[2px] bg-[#B85C45] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('assistant')}
            className={`hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
              activeSection === 'assistant'
                ? 'bg-[#713D46] text-[#F7F3EC]'
                : 'bg-[#B85C45] text-[#F7F3EC] hover:bg-[#9A4834]'
            }`}
          >
            Помощник
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#252525]/15 bg-[#FCF9F4] text-[#252525] transition-colors hover:bg-[#EAE1D5] lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Мобильная навигация"
          className="border-t border-[#252525]/12 bg-[#F7F3EC] px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EAE1D5] text-[#713D46]'
                      : 'text-[#252525] hover:bg-[#EAE1D5]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="text-xs font-medium text-[#B85C45]">Открыто</span>
                  ) : null}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleSelect('assistant')}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-md bg-[#B85C45] px-4 py-2.5 text-base font-semibold text-[#F7F3EC] transition-colors hover:bg-[#9A4834]"
            >
              Интерактивный помощник
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
