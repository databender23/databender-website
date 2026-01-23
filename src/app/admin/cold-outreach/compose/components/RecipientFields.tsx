"use client";

interface RecipientFieldsProps {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  onChange: (field: string, value: string) => void;
  emailError?: string;
}

export default function RecipientFields({
  email,
  firstName,
  lastName,
  company,
  onChange,
  emailError,
}: RecipientFieldsProps) {
  return (
    <div className="space-y-4">
      {/* To (Email) */}
      <div>
        <label
          htmlFor="to"
          className="block text-sm font-medium text-text-primary mb-1"
        >
          To <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="to"
          name="to"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          required
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all ${
            emailError ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
          placeholder="john@company.com"
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-600">{emailError}</p>
        )}
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-text-primary mb-1"
        >
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => onChange("company", e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
          placeholder="Acme Inc."
        />
      </div>
    </div>
  );
}
