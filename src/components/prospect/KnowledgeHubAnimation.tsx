"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DiagramBackground } from "./DiagramBackground";

interface KnowledgeHubAnimationProps {
  practiceAreas?: string[];
  companyName?: string;
}

// Scenarios that resonate with non-technical law firm leaders
const SCENARIOS = [
  {
    question: "How did we handle earnouts in healthcare deals?",
    oldWay: "3+ hours searching through folders and asking around",
    documents: [
      { name: "MedTech Partners PSA", practice: "M&A", excerpt: "18-month revenue earnout, 60% threshold..." },
      { name: "Valley Health Acquisition", practice: "Healthcare", excerpt: "EBITDA-based earnout with quarterly..." },
      { name: "Partner meeting notes", practice: "Internal", excerpt: "Tom suggested milestone-based for..." },
    ],
    insight: "Found: You've done 4 similar deals. 3 used revenue-based earnouts.",
    timesSaved: "3 hours → 30 seconds",
  },
  {
    question: "What's our position on non-competes in Illinois?",
    oldWay: "Interrupt a senior partner or reinvent the research",
    documents: [
      { name: "Chen v. TechCorp memo", practice: "Employment", excerpt: "2-year restriction upheld when..." },
      { name: "Wilson matter brief", practice: "Litigation", excerpt: "Geographic scope was key factor..." },
      { name: "Sarah's email to client", practice: "Corporate", excerpt: "Based on recent cases, we recommend..." },
    ],
    insight: "Your firm has advised on this 12 times. Here's what worked.",
    timesSaved: "Partner interruption → Self-service",
  },
  {
    question: "Find everything related to the Morrison client",
    oldWay: "Search 5 different systems, still miss things",
    documents: [
      { name: "Morrison acquisition (2023)", practice: "M&A", excerpt: "Purchase price adjustment clause..." },
      { name: "Morrison lease dispute", practice: "Real Estate", excerpt: "Force majeure interpretation..." },
      { name: "Morrison employment matter", practice: "Employment", excerpt: "Executive compensation structure..." },
    ],
    insight: "3 matters across 3 practice areas. All connected. All searchable.",
    timesSaved: "5 systems → 1 search",
  },
];

/**
 * Intelligence Layer Animation - Designed for Non-Technical Executives
 * Focus: Before/After contrast, plain English, emotional resonance
 * Fixed height to prevent layout shifts
 */
export function KnowledgeHubAnimation({
  companyName = "Firm",
}: KnowledgeHubAnimationProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<"question" | "oldway" | "searching" | "results" | "insight">("question");
  const [visibleDocs, setVisibleDocs] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const scenario = SCENARIOS[scenarioIndex];

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
      return id;
    };

    // Reset
    setPhase("question");
    setVisibleDocs(0);

    // Show the question
    addTimer(() => setPhase("oldway"), 2000);

    // Show old way briefly
    addTimer(() => setPhase("searching"), 3500);

    // Show results
    addTimer(() => setPhase("results"), 4500);
    addTimer(() => setVisibleDocs(1), 4800);
    addTimer(() => setVisibleDocs(2), 5200);
    addTimer(() => setVisibleDocs(3), 5600);

    // Show insight
    addTimer(() => setPhase("insight"), 6500);

    // Next scenario
    addTimer(() => {
      setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 9500);
  }, [scenarioIndex]);

  return (
    <DiagramBackground theme="teal">
      <div className="p-4 md:p-6 h-[420px] flex flex-col">
        {/* Header */}
        <div className="text-center mb-3">
          <h3 className="text-lg font-semibold text-white/90 mb-1">
            Ask Anything. Get Answers Instantly.
          </h3>
          <p className="text-xs text-white/50">
            Every document, email, and note—searchable in plain English
          </p>
        </div>

        {/* Main content area - fixed height */}
        <div className="bg-black/30 rounded-xl p-4 flex-1 overflow-hidden">
          {/* The Question - always visible */}
          <div className="mb-3">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-white/50 mb-0.5">You ask:</p>
                <motion.p
                  className="text-white text-sm font-medium leading-tight"
                  key={scenario.question}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  &quot;{scenario.question}&quot;
                </motion.p>
              </div>
            </div>
          </div>

          {/* Content area with fixed height - all content overlays */}
          <div className="relative h-[220px]">
            {/* Old Way - positioned absolutely */}
            <motion.div
              className="absolute inset-x-0 top-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "oldway" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                <p className="text-[10px] text-red-400/80 mb-0.5">The old way:</p>
                <p className="text-xs text-red-300/60 line-through">{scenario.oldWay}</p>
              </div>
            </motion.div>

            {/* Searching indicator - positioned absolutely */}
            <motion.div
              className="absolute inset-x-0 top-0 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "searching" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-xs text-teal-400">Searching all {companyName} documents...</span>
            </motion.div>

            {/* Results - positioned absolutely */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "results" || phase === "insight" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xs">🧠</span>
                </div>
                <p className="text-[10px] text-white/50">AI found relevant documents:</p>
              </div>

              <div className="space-y-1.5">
                {scenario.documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: visibleDocs > i ? 1 : 0 }}
                    className="bg-white/5 rounded-lg p-2 border-l-2 border-teal-500"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-teal-400">{doc.name}</span>
                      <span className="text-[9px] px-1 py-0.5 bg-white/10 rounded text-white/50">{doc.practice}</span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-tight">&quot;{doc.excerpt}&quot;</p>
                  </motion.div>
                ))}
              </div>

              {/* Insight */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "insight" ? 1 : 0 }}
                className="mt-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-2.5 border border-green-500/30"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm">💡</span>
                  <div>
                    <p className="text-xs text-white/90 font-medium leading-tight">{scenario.insight}</p>
                    <p className="text-[10px] text-green-400 mt-0.5 font-mono">{scenario.timesSaved}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom value props */}
        <div className="mt-3 flex justify-center gap-4 text-center">
          <div>
            <p className="text-sm font-bold text-teal-400">PDFs</p>
            <p className="text-[9px] text-white/40">Contracts</p>
          </div>
          <div>
            <p className="text-sm font-bold text-purple-400">Emails</p>
            <p className="text-[9px] text-white/40">Threads</p>
          </div>
          <div>
            <p className="text-sm font-bold text-amber-400">Notes</p>
            <p className="text-[9px] text-white/40">Meetings</p>
          </div>
          <div>
            <p className="text-sm font-bold text-pink-400">+More</p>
            <p className="text-[9px] text-white/40">Audio, video</p>
          </div>
        </div>
      </div>
    </DiagramBackground>
  );
}
