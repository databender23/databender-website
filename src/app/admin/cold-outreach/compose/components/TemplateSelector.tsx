"use client";

import { useEffect, useState } from "react";

interface Template {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
}

interface TemplateSelectorProps {
  onSelect: (subject: string, body: string, templateId: string) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch("/api/admin/email/templates");
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.templates || []);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedId(templateId);

    if (!templateId) {
      return;
    }

    const template = templates.find((t) => t.id === templateId);
    if (template) {
      onSelect(template.subject, template.body, template.id);
    }
  };

  // Group templates by category
  const groupedTemplates = templates.reduce(
    (acc, template) => {
      const category = template.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    },
    {} as Record<string, Template[]>
  );

  const categoryLabels: Record<string, string> = {
    trigger: "Trigger-Based",
    audit: "Audit Delivery",
    intro: "Introduction",
    other: "Other",
  };

  return (
    <div>
      <label
        htmlFor="template"
        className="block text-sm font-medium text-text-primary mb-1"
      >
        Template
      </label>
      <select
        id="template"
        value={selectedId}
        onChange={handleChange}
        disabled={loading}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white"
      >
        <option value="">
          {loading ? "Loading templates..." : "Select a template (optional)"}
        </option>
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <optgroup key={category} label={categoryLabels[category] || category}>
            {categoryTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <p className="mt-1 text-xs text-text-muted">
        Templates support variables: {"{{firstName}}"}, {"{{lastName}}"},{" "}
        {"{{company}}"}, {"{{email}}"}
      </p>
    </div>
  );
}
