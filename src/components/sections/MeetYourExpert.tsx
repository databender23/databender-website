"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getPrimaryExpert, type TeamMember } from "@/lib/team-data";

interface MeetYourExpertProps {
  expert?: TeamMember;
  title?: string;
}

export default function MeetYourExpert({
  expert = getPrimaryExpert(),
  title = "Who You'll Work With",
}: MeetYourExpertProps) {
  return (
    <section className="section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm">
              Your Expert
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              {title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#F8F9FA] rounded-2xl p-6 md:p-8 border border-black/5"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-teal-500/20 to-teal-500/10 flex items-center justify-center">
                  {expert.photo ? (
                    <Image
                      src={expert.photo}
                      alt={expert.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold text-teal-500">
                      {expert.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-teal-600 font-medium">{expert.title}</p>
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {expert.bio}
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {expert.credentials.map((credential, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-black/10 text-text-secondary"
                    >
                      {credential}
                    </span>
                  ))}
                </div>

                {/* LinkedIn Link */}
                {expert.linkedIn && (
                  <a
                    href={expert.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
