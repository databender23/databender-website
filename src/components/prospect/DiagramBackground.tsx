"use client";

interface DiagramBackgroundProps {
  children: React.ReactNode;
  theme?: "purple" | "teal" | "orange";
}

/**
 * Shared background component for prospect page diagrams
 * Dark gradient with grid pattern and glow effects
 */
export function DiagramBackground({
  children,
  theme = "teal",
}: DiagramBackgroundProps) {
  const colors = {
    purple: {
      primary: "rgba(138, 43, 226, 0.12)",
      secondary: "rgba(26, 153, 136, 0.1)",
      accent: "#a855f7",
    },
    teal: {
      primary: "rgba(26, 153, 136, 0.12)",
      secondary: "rgba(138, 43, 226, 0.1)",
      accent: "#14b8a6",
    },
    orange: {
      primary: "rgba(234, 88, 12, 0.15)",
      secondary: "rgba(220, 38, 38, 0.1)",
      accent: "#f97316",
    },
  };
  const c = colors[theme];

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #0f0a1e 0%, #1a1033 40%, #251545 100%)",
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${c.accent}10 1px, transparent 1px), linear-gradient(90deg, ${c.accent}10 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow effects */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
        style={{
          background: `radial-gradient(circle, ${c.primary} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full"
        style={{
          background: `radial-gradient(circle, ${c.secondary} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
