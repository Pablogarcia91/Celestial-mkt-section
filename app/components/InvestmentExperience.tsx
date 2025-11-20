'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
  variant?: 'proposal-01' | 'proposal-02' | 'proposal-03';
}

const StatItem = ({ value, label, delay = 0, variant = 'proposal-01' }: StatItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showLine03, setShowLine03] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (isVisible && variant === 'proposal-02') {
      // Primero muestra el número
      setTimeout(() => setShowNumber(true), 0);
      // Luego el texto
      setTimeout(() => setShowLabel(true), 400);
      // Finalmente la línea
      setTimeout(() => setShowLine(true), 800);
    }
  }, [isVisible, variant]);

  useEffect(() => {
    if (isVisible && variant === 'proposal-03') {
      setTimeout(() => setShowLine03(true), 400);
    }
  }, [isVisible, variant]);

  if (variant === 'proposal-02') {
    return (
      <div ref={ref} className="relative group">
        <div className="mb-2">
          {/* Number appears first */}
          <div
            className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#4B5369] mb-1 transition-all duration-600 ease-out ${
              showNumber ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {value}
          </div>

          {/* Label appears second */}
          <div
            className={`font-mono text-xs md:text-sm uppercase tracking-wider text-[#4B5369]/80 mb-3 transition-all duration-600 ease-out ${
              showLabel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {label}
          </div>
        </div>

        {/* Line grows from left to right - appears third */}
        <div className="relative overflow-hidden">
          <div
            className={`border-t border-[#4B5369]/20 w-full transition-all duration-800 ease-out origin-left ${
              showLine ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </div>
      </div>
    );
  }

  // Proposal 03 (grid design)
  if (variant === 'proposal-03') {
    return (
      <div ref={ref} className="relative group">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {/* Number */}
          <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#1F2430] mb-2">
            {value}
          </div>
          {/* Label */}
          <div className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#1F2430]/80 mb-2">
            {label}
          </div>
        </div>
        {/* Line that grows from left to right - separate from main container to have independent timing */}
        <div className="relative overflow-hidden">
          <div
            className={`border-t border-[#1F2430]/20 w-full transition-all duration-800 ease-out origin-left ${
              showLine03 ? 'scale-x-100' : 'scale-x-0'
            }`}
            style={{ transitionDelay: `${delay + 400}ms` }}
          />
        </div>
      </div>
    );
  }

  // Proposal 01 (original design)
  return (
    <div ref={ref} className="relative group">
      <style jsx>{`
        @keyframes subtle-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-number {
          animation: subtle-glow 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 40%,
            rgba(255, 255, 255, 0.6) 50%,
            currentColor 60%,
            currentColor 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`relative transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Number and label on the same line */}
        <div className="flex items-baseline gap-4 mb-6">
          <div className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight ${isVisible ? 'gradient-text' : ''}`}>
            {value}
          </div>
          <div
            className="text-sm md:text-base uppercase tracking-wider text-foreground/80 flex-1"
            style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Roboto Mono", "Courier New", monospace' }}
          >
            {label}
          </div>
        </div>

        {/* Line with more spacing */}
        <div className="border-t border-foreground/20 w-full"></div>
      </div>
    </div>
  );
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const LineByLineReveal = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Split text into approximate lines based on character count
  // Adjust the chunkSize based on your desired line length
  const chunkSize = 80;
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length > chunkSize) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setHasStarted(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 200); // 200ms entre cada línea
      return () => clearTimeout(timer);
    } else if (onComplete && visibleLines === lines.length) {
      onComplete();
    }
  }, [hasStarted, visibleLines, lines.length, onComplete]);

  return (
    <span ref={ref}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            index < visibleLines
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-4'
          }`}
        >
          {line}{' '}
        </span>
      ))}
    </span>
  );
};

export default function InvestmentExperience() {
  const [selectedProposal, setSelectedProposal] = useState<'proposal-01' | 'proposal-02' | 'proposal-03'>('proposal-01');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const stats = [
    { value: '$8.5B', label: 'Assets Under Management' },
    { value: '12', label: 'Investment teams across 4 global offices' },
    { value: '35+', label: 'Portfolio companies and credit relationships' },
    { value: '15', label: 'Years average team investment experience' },
  ];

  const proposals = [
    { id: 'proposal-01' as const, name: 'Proposal 01' },
    { id: 'proposal-02' as const, name: 'Proposal 02' },
    { id: 'proposal-03' as const, name: 'Proposal 03' },
  ];

  const handleProposalChange = (proposalId: 'proposal-01' | 'proposal-02' | 'proposal-03') => {
    setSelectedProposal(proposalId);
    setIsDropdownOpen(false);
    setShowStats(false);
  };

  const handleTypewriterComplete = () => {
    if (selectedProposal === 'proposal-02') {
      setShowStats(true);
    }
  };

  const bgColor = selectedProposal === 'proposal-02' ? '#CBC6B9' : selectedProposal === 'proposal-03' ? '#93867B' : '';
  const textColor = selectedProposal === 'proposal-02' ? '#4B5369' : selectedProposal === 'proposal-03' ? '#1F2430' : '';

  return (
    <section
      className="min-h-screen py-16 px-6 md:px-12 lg:px-20"
      style={{
        backgroundColor: bgColor || undefined,
        color: textColor || undefined,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Dropdown Selector */}
        <div className="mb-8 flex justify-end">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-foreground/5 transition-colors"
              style={{
                borderColor: selectedProposal === 'proposal-02' ? '#4B5369' : undefined,
                color: selectedProposal === 'proposal-02' ? '#4B5369' : undefined,
              }}
            >
              <span className="font-mono text-sm">
                {proposals.find(p => p.id === selectedProposal)?.name}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden z-10"
                style={{
                  backgroundColor: selectedProposal === 'proposal-02' ? '#CBC6B9' : undefined,
                  borderColor: selectedProposal === 'proposal-02' ? '#4B5369' : undefined,
                }}
              >
                {proposals.map((proposal) => (
                  <button
                    key={proposal.id}
                    onClick={() => handleProposalChange(proposal.id)}
                    className="w-full text-left px-4 py-3 font-mono text-sm hover:bg-foreground/10 transition-colors"
                    style={{
                      backgroundColor: selectedProposal === proposal.id
                        ? (selectedProposal === 'proposal-02' ? 'rgba(75, 83, 105, 0.1)' : undefined)
                        : undefined,
                      color: selectedProposal === 'proposal-02' ? '#4B5369' : undefined,
                    }}
                  >
                    {proposal.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content wrapper with key to force remount on proposal change */}
        <div key={selectedProposal}>
          {/* Header - First to animate */}
          <FadeInSection delay={0}>
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
              style={{
                color: selectedProposal === 'proposal-02' ? '#4B5369' : undefined,
                marginBottom: selectedProposal === 'proposal-02' ? '2rem' : '4rem',
              }}
            >
              Investment Experience
            </h2>
          </FadeInSection>

          {/* Description - After title (only for Proposal 02) */}
          {selectedProposal === 'proposal-02' && (
            <div className="mb-16">
              <p
                className="font-mono text-base md:text-lg leading-relaxed"
                style={{
                  color: 'rgba(75, 83, 105, 0.8)',
                }}
              >
                <LineByLineReveal
                  text="Our investment committee brings deep expertise across technology, healthcare, financial services, and industrial sectors, with a track record of generating consistent, risk-adjusted returns across market cycles."
                  delay={500}
                  onComplete={handleTypewriterComplete}
                />
              </p>
            </div>
          )}

          {/* Stats List - Vertical with cascade effect or Grid for Proposal 03 */}
          <div className={selectedProposal === 'proposal-03' ? 'grid grid-cols-2 gap-x-12 gap-y-8 mb-20' : 'space-y-6 mb-20'}>
            {stats.map((stat, index) => {
              // For Proposal 02, only show stats after typewriter is complete
              if (selectedProposal === 'proposal-02' && !showStats) {
                return null;
              }

              return (
                <StatItem
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  delay={selectedProposal === 'proposal-02' ? index * 600 : 200 + index * 150}
                  variant={selectedProposal}
                />
              );
            })}
          </div>

          {/* Description - At the end (only for Proposal 01) */}
          {selectedProposal === 'proposal-01' && (
            <FadeInSection delay={200 + stats.length * 150 + 100}>
              <p
                className="text-base md:text-lg leading-relaxed text-foreground/80"
                style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Roboto Mono", "Courier New", monospace' }}
              >
                Our investment committee brings deep expertise across technology,
                healthcare, financial services, and industrial sectors, with a track
                record of generating consistent, risk-adjusted returns across market
                cycles.
              </p>
            </FadeInSection>
          )}

          {/* Description - At the end (only for Proposal 03) */}
          {selectedProposal === 'proposal-03' && (
            <FadeInSection delay={200 + stats.length * 150 + 100}>
              <p
                className="font-serif text-base md:text-lg leading-relaxed"
                style={{
                  color: 'rgba(31, 36, 48, 0.8)',
                }}
              >
                Our investment committee brings deep expertise across technology,
                healthcare, financial services, and industrial sectors, with a track
                record of generating consistent, risk-adjusted returns across market
                cycles.
              </p>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  );
}
