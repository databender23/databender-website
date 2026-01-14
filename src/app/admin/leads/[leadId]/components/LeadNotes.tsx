"use client";

import { useState } from "react";
import type { LeadNote } from "@/lib/leads/types";

interface LeadNotesProps {
  leadId: string;
  notes: LeadNote[];
  onNoteAdded: (note: LeadNote) => void;
}

function formatNoteDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadNotes({ leadId, notes, onNoteAdded }: LeadNotesProps) {
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add note");
      }

      const data = await response.json();
      onNoteAdded(data.note);
      setNewNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
        Notes
      </h3>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
        />
        {error && <p className="text-error text-sm mt-1">{error}</p>}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isSubmitting || !newNote.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Note
              </>
            )}
          </button>
        </div>
      </form>

      {/* Notes List */}
      {sortedNotes.length === 0 ? (
        <p className="text-text-muted text-sm text-center py-4">
          No notes yet. Add one above.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className="border-l-2 border-teal-500 pl-4 py-1"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-text-muted">
                  {formatNoteDate(note.createdAt)}
                </span>
                {note.author && (
                  <>
                    <span className="text-text-muted">-</span>
                    <span className="text-xs text-text-secondary">
                      {note.author}
                    </span>
                  </>
                )}
              </div>
              <p className="text-text-primary text-sm whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
