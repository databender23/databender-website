"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DiagramBackground } from "./DiagramBackground";

type Industry = "legal" | "healthcare" | "dental" | "manufacturing" | "cre" | "accounting" | "construction" | "wholesale-distribution" | "general";

interface SearchJourneyAnimationProps {
  searchQuery?: string;
  dmsName?: string;
  industry?: Industry;
}

// Industry-specific content
const INDUSTRY_CONTENT: Record<Industry, {
  title: string;
  dmsResults: { name: string; why: string }[];
  emails: { subject: string; from: string; time: string; why: string }[];
  askPerson: { name: string; context: string };
  busyReason: string;
}> = {
  legal: {
    title: "The Search for Precedent",
    dmsResults: [
      { name: "MedTech_NDA_Signed.pdf", why: "Wrong document type" },
      { name: "MedTech_Partners_LOI_v2.docx", why: "Letter of intent, not PSA" },
      { name: "Earnout_Template_Generic.xlsx", why: "Blank template" },
      { name: "MedTech_Due_Diligence_Checklist.pdf", why: "DD docs, not deal terms" },
      { name: "MedTech_Board_Presentation.pptx", why: "Internal presentation" },
    ],
    emails: [
      { subject: "RE: MedTech closing dinner", from: "Admin", time: "2023", why: "Social planning" },
      { subject: "MedTech Partners - NDA status", from: "Paralegal", time: "2023", why: "Admin thread" },
      { subject: "FW: earnout calculation questions", from: "Tom B.", time: "2021", why: "Different deal" },
      { subject: "MedTech call tomorrow 3pm", from: "Sarah M.", time: "2023", why: "Calendar invite" },
    ],
    askPerson: { name: "Sarah", context: "She handled that MedTech deal..." },
    busyReason: "In court until 4pm",
  },
  dental: {
    title: "The Search for Data",
    dmsResults: [
      { name: "Location_123_Monthly_Report.xlsx", why: "Wrong location" },
      { name: "Provider_Productivity_Template.xlsx", why: "Blank template" },
      { name: "Treatment_Acceptance_2022.pdf", why: "Outdated data" },
      { name: "Dentrix_Export_Raw.csv", why: "Unprocessed data dump" },
      { name: "Board_Meeting_Slides.pptx", why: "Summary only, no details" },
    ],
    emails: [
      { subject: "RE: Provider schedule changes", from: "Office Mgr", time: "2024", why: "Scheduling thread" },
      { subject: "FW: Treatment acceptance numbers?", from: "Regional", time: "2023", why: "Different period" },
      { subject: "Monthly close reminder", from: "Accounting", time: "2024", why: "Admin notice" },
      { subject: "Provider bonus questions", from: "HR", time: "2024", why: "HR matter" },
    ],
    askPerson: { name: "Regional Director", context: "She knows those locations..." },
    busyReason: "In meetings all day",
  },
  healthcare: {
    title: "The Search for Data",
    dmsResults: [
      { name: "Payer_Contract_Template.docx", why: "Generic template" },
      { name: "Q3_Claims_Summary.xlsx", why: "Wrong quarter" },
      { name: "Location_Metrics_Draft.pdf", why: "Unfinished report" },
      { name: "Denial_Code_Reference.pdf", why: "Reference doc, not data" },
      { name: "Provider_Productivity_2022.xlsx", why: "Outdated" },
    ],
    emails: [
      { subject: "RE: Blue Cross reimbursement question", from: "Billing", time: "2023", why: "Different payer" },
      { subject: "FW: Location performance review", from: "Regional", time: "2024", why: "Different metric" },
      { subject: "Denial spike follow-up", from: "RCM Team", time: "2023", why: "Old issue" },
      { subject: "Monthly ops meeting", from: "Admin", time: "2024", why: "Calendar invite" },
    ],
    askPerson: { name: "RCM Director", context: "She tracks all the payer data..." },
    busyReason: "In a payer meeting",
  },
  manufacturing: {
    title: "The Search for Data",
    dmsResults: [
      { name: "Production_Schedule_Template.xlsx", why: "Blank template" },
      { name: "Cost_Variance_Q2.pdf", why: "Wrong period" },
      { name: "Quality_Report_Draft.docx", why: "Unfinished" },
      { name: "ERP_Export_20231215.csv", why: "Unprocessed dump" },
      { name: "Board_Presentation_OEE.pptx", why: "Summary only" },
    ],
    emails: [
      { subject: "RE: Line 3 downtime", from: "Plant Mgr", time: "2023", why: "Different issue" },
      { subject: "FW: Cost per unit questions", from: "Finance", time: "2024", why: "Different product" },
      { subject: "Quality hold notification", from: "QA", time: "2024", why: "Current hold, not history" },
      { subject: "Monthly close schedule", from: "Controller", time: "2024", why: "Admin notice" },
    ],
    askPerson: { name: "Plant Manager", context: "He knows all the production data..." },
    busyReason: "On the floor with a quality issue",
  },
  cre: {
    title: "The Search for Data",
    dmsResults: [
      { name: "Lease_Abstract_Template.docx", why: "Blank template" },
      { name: "Property_123_NOI_2022.xlsx", why: "Wrong property" },
      { name: "Investor_Report_Draft.pdf", why: "Unfinished" },
      { name: "Yardi_Export_Raw.csv", why: "Unprocessed dump" },
      { name: "Portfolio_Overview_Slides.pptx", why: "Summary only" },
    ],
    emails: [
      { subject: "RE: Tenant renewal status", from: "Leasing", time: "2023", why: "Different tenant" },
      { subject: "FW: NOI reconciliation", from: "Accounting", time: "2024", why: "Different property" },
      { subject: "Investor call prep", from: "AM Team", time: "2024", why: "Calendar thread" },
      { subject: "CAM reconciliation question", from: "PM", time: "2024", why: "Admin item" },
    ],
    askPerson: { name: "Asset Manager", context: "She knows that portfolio..." },
    busyReason: "With investors all day",
  },
  accounting: {
    title: "The Search for Precedent",
    dmsResults: [
      { name: "754_Election_Template.docx", why: "Blank template" },
      { name: "Smith_Family_2021_Return.pdf", why: "Wrong year" },
      { name: "Partnership_Memo_Draft.docx", why: "Unfinished memo" },
      { name: "Checkpoint_Research.pdf", why: "External research, not firm work" },
      { name: "Partner_Meeting_Notes.docx", why: "Meeting notes only" },
    ],
    emails: [
      { subject: "RE: Smith family questions", from: "Admin", time: "2022", why: "Old thread" },
      { subject: "FW: 754 election timing", from: "Tax Mgr", time: "2023", why: "Different client" },
      { subject: "Partnership allocation review", from: "Partner", time: "2024", why: "Different matter" },
      { subject: "Filing deadline reminder", from: "Admin", time: "2024", why: "Admin notice" },
    ],
    askPerson: { name: "Senior Manager", context: "She handled that Smith engagement..." },
    busyReason: "With a client until 5pm",
  },
  construction: {
    title: "The Search for Data",
    dmsResults: [
      { name: "Change_Order_Template.xlsx", why: "Blank template" },
      { name: "Johnson_Project_Budget_v2.xlsx", why: "Outdated version" },
      { name: "Subcontractor_Invoice_Batch.pdf", why: "Invoices, not status" },
      { name: "Procore_Export_20240115.csv", why: "Unprocessed dump" },
      { name: "Owner_Meeting_Slides.pptx", why: "Summary only" },
    ],
    emails: [
      { subject: "RE: Johnson CO #15 status", from: "PM", time: "2024", why: "Different CO" },
      { subject: "FW: Cost to complete questions", from: "Controller", time: "2024", why: "Different project" },
      { subject: "Subcontractor payment schedule", from: "AP", time: "2024", why: "Payment thread" },
      { subject: "Weekly job meeting", from: "Admin", time: "2024", why: "Calendar invite" },
    ],
    askPerson: { name: "Project Manager", context: "He knows that job inside out..." },
    busyReason: "At the job site all day",
  },
  "wholesale-distribution": {
    title: "The Search for Data",
    dmsResults: [
      { name: "Customer_Profitability_Template.xlsx", why: "Blank template" },
      { name: "Inventory_Turns_Q2.pdf", why: "Wrong quarter" },
      { name: "Pricing_Matrix_Draft.xlsx", why: "Unfinished" },
      { name: "NetSuite_Export_Raw.csv", why: "Unprocessed dump" },
      { name: "Sales_Meeting_Slides.pptx", why: "Summary only" },
    ],
    emails: [
      { subject: "RE: ABC Corp margin question", from: "Sales", time: "2024", why: "Different customer" },
      { subject: "FW: Inventory reorder levels", from: "Ops", time: "2024", why: "Different SKUs" },
      { subject: "Pricing exception approval", from: "Sales Mgr", time: "2024", why: "One-off deal" },
      { subject: "Monthly inventory review", from: "Warehouse", time: "2024", why: "Scheduled meeting" },
    ],
    askPerson: { name: "Sales VP", context: "She knows all the customer history..." },
    busyReason: "Traveling with a key account",
  },
  general: {
    title: "The Search for Answers",
    dmsResults: [
      { name: "Report_Template_2024.xlsx", why: "Blank template" },
      { name: "Q3_Metrics_Summary.pdf", why: "Wrong period" },
      { name: "Analysis_Draft_v2.docx", why: "Unfinished" },
      { name: "System_Export_Raw.csv", why: "Unprocessed dump" },
      { name: "Board_Presentation.pptx", why: "Summary only" },
    ],
    emails: [
      { subject: "RE: Data request follow-up", from: "Analyst", time: "2024", why: "Different request" },
      { subject: "FW: Metrics question", from: "Finance", time: "2024", why: "Different metric" },
      { subject: "Monthly review prep", from: "Manager", time: "2024", why: "Meeting thread" },
      { subject: "Report deadline reminder", from: "Admin", time: "2024", why: "Admin notice" },
    ],
    askPerson: { name: "Senior Analyst", context: "She built the last report..." },
    busyReason: "In meetings until 4pm",
  },
};

/**
 * Animation 1: Search Journey (Frustration Flow)
 * User searches for data → frustration cascade → gives up
 * Shows specific pain points at each step
 */
export function SearchJourneyAnimation({
  searchQuery = "MedTech Partners earnout",
  dmsName = "iManage",
  industry = "legal",
}: SearchJourneyAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [visibleResults, setVisibleResults] = useState(0);
  const [visibleEmails, setVisibleEmails] = useState(0);
  const [waitingDots, setWaitingDots] = useState(0);
  const [hoursWaited, setHoursWaited] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Get industry-specific content
  const content = INDUSTRY_CONTENT[industry] || INDUSTRY_CONTENT.general;
  const dmsResults = content.dmsResults;
  const emailResults = content.emails;

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
      setVisibleResults(dmsResults.length);
      setVisibleEmails(emailResults.length);
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
    dmsResults.forEach((_, i) => {
      addTimer(() => setVisibleResults(i + 1), 1800 + i * 300);
    });

    // Phase 2: Move to email search (4s)
    addTimer(() => setPhase(2), 4000);

    // Show email results one by one
    emailResults.forEach((_, i) => {
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
          {content.title}
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
                {dmsResults.map((result, i) => (
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
                {emailResults.map((email, i) => (
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

        {/* Bottom section: Ask Sarah → Wait → Give up - responsive height */}
        <div className="mt-4 bg-black/30 rounded-lg p-4 min-h-[72px] md:h-[72px] flex items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
            {/* Ask person */}
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <PersonIcon />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Ask {content.askPerson.name}</p>
                <p className="text-gray-400 text-xs hidden sm:block">{content.askPerson.context}</p>
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
                  <span className="text-amber-400">{content.busyReason}</span>
                </p>
                <p className={`text-gray-500 text-xs mt-1 transition-opacity duration-300 ${phase === 4 ? "opacity-100" : "opacity-0"}`}>
                  Waiting{".".repeat(waitingDots)}
                </p>
              </div>
            </div>

            {/* Hours passing + Give up - row on mobile */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Hours passing */}
              <div className={`flex items-center gap-2 transition-opacity duration-300 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}>
                <ClockIcon />
                <div className="text-center">
                  <p className="text-red-400 text-base sm:text-lg font-bold">{hoursWaited || 0}+ hrs</p>
                  <p className="text-gray-500 text-xs">waiting</p>
                </div>
              </div>

              {/* Give up */}
              <div className={`bg-red-500/20 border border-red-500/30 rounded-lg px-3 sm:px-4 py-2 transition-all duration-300 flex-1 sm:flex-none ${phase >= 6 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                <p className="text-red-400 text-xs sm:text-sm font-medium">Just write it from scratch</p>
                <p className="text-red-400/60 text-[10px] sm:text-xs">Deadline&apos;s tomorrow anyway...</p>
              </div>
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
