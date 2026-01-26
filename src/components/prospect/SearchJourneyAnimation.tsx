"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DiagramBackground } from "./DiagramBackground";

interface SearchJourneyAnimationProps {
  searchQuery?: string;
  dmsName?: string;
}

// Search results that MATCH the keywords but are still wrong/irrelevant
const IRRELEVANT_DMS_RESULTS = [
  { name: "MedTech_NDA_Signed.pdf", why: "Wrong document type" },
  { name: "MedTech_Partners_LOI_v2.docx", why: "Letter of intent, not PSA" },
  { name: "Earnout_Template_Generic.xlsx", why: "Blank template" },
  { name: "MedTech_Due_Diligence_Checklist.pdf", why: "DD docs, not deal terms" },
  { name: "MedTech_Board_Presentation.pptx", why: "Internal presentation" },
];

const IRRELEVANT_EMAILS = [
  { subject: "RE: MedTech closing dinner", from: "Admin", time: "2023", why: "Social planning" },
  { subject: "MedTech Partners - NDA status", from: "Paralegal", time: "2023", why: "Admin thread" },
  { subject: "FW: earnout calculation questions", from: "Tom B.", time: "2021", why: "Different deal" },
  { subject: "MedTech call tomorrow 3pm", from: "Sarah M.", time: "2023", why: "Calendar invite" },
];

/**
 * Animation 1: Search Journey (Frustration Flow)
 * Partner searches for precedent → frustration cascade → gives up
 * Shows specific pain points at each step
 */
export function SearchJourneyAnimation({
  searchQuery = "MedTech Partners earnout",
  dmsName = "iManage",
}: SearchJourneyAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [visibleResults, setVisibleResults] = useState(0);
  const [visibleEmails, setVisibleEmails] = useState(0);
  const [waitingDots, setWaitingDots] = useState(0);
  const [hoursWaited, setHoursWaited] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Run animation on each cycle
  useEffect(() => {
    // Clear previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Reset state at start of each cycle
    setPhase(0);
    setVisibleResults(0);
    setVisibleEmails(0);
    setWaitingDots(0);
    setHoursWaited(0);

    if (prefersReducedMotion) {
      setPhase(6);
      setVisibleResults(IRRELEVANT_DMS_RESULTS.length);
      setVisibleEmails(IRRELEVANT_EMAILS.length);
      setHoursWaited(3);
      return;
    }

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
      return id;
    };

    // Phase 0: Initial search (already showing)
    // Phase 1: DMS results start appearing (1.5s)
    addTimer(() => setPhase(1), 1500);

    // Show DMS results one by one
    IRRELEVANT_DMS_RESULTS.forEach((_, i) => {
      addTimer(() => setVisibleResults(i + 1), 1800 + i * 300);
    });

    // Phase 2: Move to email search (4s)
    addTimer(() => setPhase(2), 4000);

    // Show email results one by one
    IRRELEVANT_EMAILS.forEach((_, i) => {
      addTimer(() => setVisibleEmails(i + 1), 4300 + i * 350);
    });

    // Phase 3: Ask Sarah (6s)
    addTimer(() => setPhase(3), 6000);

    // Phase 4: Waiting for Sarah (7s)
    addTimer(() => setPhase(4), 7000);

    // Animate waiting dots
    for (let i = 1; i <= 6; i++) {
      addTimer(() => setWaitingDots(i % 4), 7000 + i * 400);
    }

    // Phase 5: Hours passing (9s)
    addTimer(() => setPhase(5), 9000);
    addTimer(() => setHoursWaited(1), 9500);
    addTimer(() => setHoursWaited(2), 10000);
    addTimer(() => setHoursWaited(3), 10500);

    // Phase 6: Give up (12s)
    addTimer(() => setPhase(6), 12000);

    // Restart animation (16s)
    addTimer(() => setCycle(c => c + 1), 16000);
  }, [cycle, prefersReducedMotion]);

  return (
    <DiagramBackground theme="orange">
      <div className="p-4 md:p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white/80 mb-4 text-center">
          The Search for Precedent
        </h3>

        {/* Search query display */}
        <div className="bg-black/30 rounded-lg px-4 py-2 mb-4 flex items-center gap-2">
          <SearchIcon />
          <span className="text-white/60 text-sm">Search:</span>
          <span className="text-orange-300 font-mono text-sm">&quot;{searchQuery}&quot;</span>
        </div>

        {/* Main content area - two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left column: DMS Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderIcon />
                <span className="text-white text-sm font-medium">{dmsName}</span>
              </div>
              <span className={`text-amber-400 text-xs transition-opacity duration-300 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
                127 results
              </span>
            </div>

            {/* Fixed height container for DMS results */}
            <div className="bg-black/20 rounded-lg p-3 h-[300px] overflow-hidden">
              <div className="space-y-2">
                {IRRELEVANT_DMS_RESULTS.map((result, i) => (
                  <div
                    key={i}
                    className={`text-xs bg-black/20 rounded px-2 py-1.5 transition-opacity duration-300 ${visibleResults > i ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 truncate flex-1">{result.name}</span>
                    </div>
                    <span className="text-red-400/70 text-[10px]">✗ {result.why}</span>
                  </div>
                ))}
                <p className={`text-amber-400 text-xs pt-1 transition-opacity duration-300 ${visibleResults >= 4 ? "opacity-100" : "opacity-0"}`}>
                  + 122 more results...
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Email Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EmailIcon />
                <span className="text-white text-sm font-medium">Outlook</span>
              </div>
              <span className={`text-amber-400 text-xs transition-opacity duration-300 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
                200+ threads
              </span>
            </div>

            {/* Fixed height container for email results */}
            <div className="bg-black/20 rounded-lg p-3 h-[300px] overflow-hidden">
              <div className="space-y-2">
                {IRRELEVANT_EMAILS.map((email, i) => (
                  <div
                    key={i}
                    className={`text-xs bg-black/20 rounded px-2 py-1.5 transition-opacity duration-300 ${visibleEmails > i ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 truncate">{email.subject}</span>
                      <span className="text-gray-500 ml-2 flex-shrink-0">{email.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">{email.from}</span>
                      <span className="text-red-400/70 text-[10px]">✗ {email.why}</span>
                    </div>
                  </div>
                ))}
                <p className={`text-amber-400 text-xs pt-1 transition-opacity duration-300 ${visibleEmails >= 3 ? "opacity-100" : "opacity-0"}`}>
                  + 196 more threads...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: Ask Sarah → Wait → Give up - fixed height */}
        <div className="mt-4 bg-black/30 rounded-lg p-4 h-[72px] flex items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            {/* Ask Sarah */}
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <PersonIcon />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Ask Sarah</p>
                <p className="text-gray-400 text-xs">She handled that MedTech deal...</p>
              </div>
            </div>

            {/* Arrow */}
            <div className={`hidden sm:block text-white/30 transition-opacity duration-300 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>→</div>

            {/* Message sent */}
            <div className={`flex-1 transition-opacity duration-300 ${phase >= 4 ? "opacity-100" : "opacity-0"}`}>
              <div className="bg-black/30 rounded-lg px-3 py-2 inline-block">
                <p className="text-gray-400 text-xs">
                  <span className="text-green-400">✓ Sent</span>
                  {" • "}
                  <span className="text-amber-400">In court until 4pm</span>
                </p>
                <p className={`text-gray-500 text-xs mt-1 transition-opacity duration-300 ${phase === 4 ? "opacity-100" : "opacity-0"}`}>
                  Waiting{".".repeat(waitingDots)}
                </p>
              </div>
            </div>

            {/* Hours passing */}
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}>
              <ClockIcon />
              <div className="text-center">
                <p className="text-red-400 text-lg font-bold">{hoursWaited || 0}+ hrs</p>
                <p className="text-gray-500 text-xs">waiting</p>
              </div>
            </div>

            {/* Give up */}
            <div className={`bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 transition-all duration-300 ${phase >= 6 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              <p className="text-red-400 text-sm font-medium">Just write it from scratch</p>
              <p className="text-red-400/60 text-xs">Deadline&apos;s tomorrow anyway...</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramBackground>
  );
}

// Icons
function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-teal-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      className="w-5 h-5 text-amber-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-5 h-5 text-amber-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-5 h-5 text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
