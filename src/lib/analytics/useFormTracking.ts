"use client";

import { useRef, useCallback, useEffect } from "react";
import { useAnalytics } from "./AnalyticsProvider";

/**
 * Custom hook for tracking form interactions including start, field changes, and abandonment.
 *
 * Usage:
 * ```tsx
 * function ContactForm() {
 *   const { formProps, fieldProps, markSubmitted } = useFormTracking("contact-form");
 *
 *   const handleSubmit = async (e: FormEvent) => {
 *     e.preventDefault();
 *     // ... submit logic
 *     markSubmitted(); // Prevents abandon tracking after successful submit
 *   };
 *
 *   return (
 *     <form {...formProps} onSubmit={handleSubmit}>
 *       <input {...fieldProps("email")} type="email" />
 *       <input {...fieldProps("name")} type="text" />
 *       <textarea {...fieldProps("message")} />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormTracking(formName: string) {
  const { trackFormStart, trackFormAbandon } = useAnalytics();

  const formStartedRef = useRef<boolean>(false);
  const formSubmittedRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const fieldsRef = useRef<Map<string, boolean>>(new Map());
  const lastFieldRef = useRef<string>("");
  const totalFieldsRef = useRef<number>(0);

  // Track first field focus (form start)
  const handleFieldFocus = useCallback((fieldName: string) => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      startTimeRef.current = Date.now();
      trackFormStart(formName, fieldName);
    }
    lastFieldRef.current = fieldName;
  }, [formName, trackFormStart]);

  // Track field blur (mark field as completed if it has a value)
  const handleFieldBlur = useCallback((fieldName: string, hasValue: boolean) => {
    if (hasValue) {
      fieldsRef.current.set(fieldName, true);
    }
    lastFieldRef.current = fieldName;
  }, []);

  // Mark form as submitted to prevent abandon tracking
  const markSubmitted = useCallback(() => {
    formSubmittedRef.current = true;
  }, []);

  // Manually trigger abandon tracking (useful for SPA navigation)
  const triggerAbandon = useCallback(() => {
    if (formStartedRef.current && !formSubmittedRef.current) {
      const fieldsCompleted = Array.from(fieldsRef.current.values()).filter(Boolean).length;
      if (fieldsCompleted > 0 && fieldsCompleted < totalFieldsRef.current) {
        const timeSpent = Date.now() - startTimeRef.current;
        trackFormAbandon(
          formName,
          fieldsCompleted,
          totalFieldsRef.current,
          lastFieldRef.current,
          timeSpent
        );
      }
    }
  }, [formName, trackFormAbandon]);

  // Generate props for the form element
  const formProps = {
    name: formName,
    "data-form-name": formName,
  };

  // Generate props for individual fields
  const fieldProps = useCallback((fieldName: string) => {
    // Register field in our tracking
    if (!fieldsRef.current.has(fieldName)) {
      fieldsRef.current.set(fieldName, false);
      totalFieldsRef.current = fieldsRef.current.size;
    }

    return {
      onFocus: () => handleFieldFocus(fieldName),
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        handleFieldBlur(fieldName, e.target.value.length > 0);
      },
      "data-field-name": fieldName,
    };
  }, [handleFieldFocus, handleFieldBlur]);

  // Clean up: track abandon on unmount if form was started but not submitted
  useEffect(() => {
    // Capture current ref values for cleanup
    const fieldsMap = fieldsRef.current;
    const formStarted = formStartedRef.current;
    const formSubmitted = formSubmittedRef.current;
    const totalFields = totalFieldsRef.current;

    return () => {
      if (formStarted && !formSubmitted) {
        const fieldsCompleted = Array.from(fieldsMap.values()).filter(Boolean).length;
        if (fieldsCompleted > 0 && fieldsCompleted < totalFields) {
          // Note: This may not reliably fire on page navigation
          // The beforeunload handler in AnalyticsProvider handles page exit
          triggerAbandon();
        }
      }
    };
  }, [triggerAbandon]);

  return {
    formProps,
    fieldProps,
    markSubmitted,
    triggerAbandon,
    // For manual control
    handleFieldFocus,
    handleFieldBlur,
  };
}
