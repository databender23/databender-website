"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DiagramBackground } from "./DiagramBackground";

interface ChatSimulationProps {
  question?: string;
  answer?: string;
  sources?: string[];
  companyName?: string;
}

// Bullet points defined outside component to avoid recreation
const DEFAULT_BULLETS = [
  "Revenue-based earnouts (60% of deals): 12-24 month measurement periods",
  "EBITDA earnouts (30%): Typically with adjustment mechanisms",
  "Milestone earnouts (10%): Tied to regulatory approvals or retention",
];

/**
 * Animation 3: AI Conversation (Chat Simulation)
 * Live chat that types out like ChatGPT
 */
export function ChatSimulation({
  question = "How have we structured earnouts in healthcare deals?",
  answer = "Based on 4 documents from your M&A practice, here are the common patterns:",
  sources = [
    "MedTech Acquisition (2024)",
    "Valley Health Partners (2023)",
    "Dental Group Holdings (2024)",
    "Regional Care Systems (2023)",
  ],
  companyName = "Firm",
}: ChatSimulationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"typing-q" | "thinking" | "typing-a" | "bullets" | "sources" | "complete">("typing-q");
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [visibleSources, setVisibleSources] = useState(0);
  const [visibleBullets, setVisibleBullets] = useState(0);
  const hasStarted = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Run animation once on mount
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (prefersReducedMotion) {
      setDisplayedQuestion(question);
      setDisplayedAnswer(answer);
      setVisibleBullets(DEFAULT_BULLETS.length);
      setVisibleSources(sources.length);
      setPhase("complete");
      return;
    }

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
      return id;
    };

    // Phase 1: Type question character by character
    let qIndex = 0;
    const typeQuestion = () => {
      if (qIndex < question.length) {
        setDisplayedQuestion(question.slice(0, qIndex + 1));
        qIndex++;
        addTimer(typeQuestion, 35);
      } else {
        // Move to thinking phase
        addTimer(() => setPhase("thinking"), 300);
        // After thinking, start answer
        addTimer(startAnswer, 1500);
      }
    };

    // Phase 2: Type answer word by word
    const startAnswer = () => {
      setPhase("typing-a");
      const words = answer.split(" ");
      let wIndex = 0;
      const typeAnswer = () => {
        if (wIndex < words.length) {
          setDisplayedAnswer(words.slice(0, wIndex + 1).join(" "));
          wIndex++;
          addTimer(typeAnswer, 60);
        } else {
          // Show bullets
          addTimer(showBullets, 400);
        }
      };
      typeAnswer();
    };

    // Phase 3: Show bullet points one by one
    const showBullets = () => {
      setPhase("bullets");
      let bIndex = 0;
      const showBullet = () => {
        if (bIndex < DEFAULT_BULLETS.length) {
          setVisibleBullets(bIndex + 1);
          bIndex++;
          addTimer(showBullet, 500);
        } else {
          addTimer(showSources, 400);
        }
      };
      showBullet();
    };

    // Phase 4: Show sources
    const showSources = () => {
      setPhase("sources");
      let sIndex = 0;
      const showSource = () => {
        if (sIndex < sources.length) {
          setVisibleSources(sIndex + 1);
          sIndex++;
          addTimer(showSource, 250);
        } else {
          addTimer(() => setPhase("complete"), 500);
        }
      };
      showSource();
    };

    // Start the animation
    addTimer(typeQuestion, 200);
  }, [question, answer, sources, prefersReducedMotion]);

  return (
    <DiagramBackground theme="teal">
      <div className="p-4 md:p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white/80 mb-4 text-center">
          {companyName} AI Assistant
        </h3>

        {/* Chat container */}
        <div className="bg-black/20 rounded-lg p-4 space-y-4 min-h-[320px]">
          {/* User message */}
          <AnimatePresence>
            {displayedQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg px-4 py-2 max-w-[85%]">
                  <p className="text-white text-sm">
                    {displayedQuestion}
                    {phase === "typing-q" && (
                      <span className="inline-block w-0.5 h-4 bg-teal-400 ml-0.5 animate-pulse" />
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking indicator */}
          <AnimatePresence>
            {phase === "thinking" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-sm">🧠</span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI response */}
          <AnimatePresence>
            {(phase === "typing-a" || phase === "bullets" || phase === "sources" || phase === "complete") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-sm">🧠</span>
                </div>
                <div className="flex-1 space-y-3">
                  {/* Main response text */}
                  <p className="text-gray-200 text-sm">
                    {displayedAnswer}
                    {phase === "typing-a" && (
                      <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse" />
                    )}
                  </p>

                  {/* Bullet points */}
                  {visibleBullets > 0 && (
                    <ul className="space-y-2">
                      {DEFAULT_BULLETS.slice(0, visibleBullets).map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <span className="text-teal-400 mt-1">•</span>
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Sources */}
                  {visibleSources > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pt-2 border-t border-white/10"
                    >
                      <p className="text-xs text-gray-500 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {sources.slice(0, visibleSources).map((source, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {source}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DiagramBackground>
  );
}
