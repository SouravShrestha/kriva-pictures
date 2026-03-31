"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import texts from "@/resources/texts";

const MAX_MESSAGE_LENGTH = 300;

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormTouched = Partial<Record<keyof FormState, boolean>>;

const ContactFormInner = () => {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const packageName = searchParams.get("package");
    if (packageName) {
      setForm((prev) => ({
        ...prev,
        message: `I would like to enquire about ${packageName} package.`,
      }));
    }
  }, [searchParams]);

  const validateField = (
    name: keyof FormState,
    value: string,
    forceRequired = false,
  ): string => {
    switch (name) {
      case "name":
        return !value.trim() && (forceRequired || touched.name)
          ? "Name is required."
          : "";
      case "email":
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Enter a valid email address.";
        }
        return "";
      case "phone": {
        if (!value.trim())
          return forceRequired || touched.phone
            ? "Phone number is required."
            : "";
        const phoneDigits = value.replace(/[^\d]/g, "");
        return phoneDigits.length < 7 ? "Enter a valid phone number." : "";
      }
      case "message":
        if (!value.trim())
          return forceRequired || touched.message ? "Message is required." : "";
        if (value.length > MAX_MESSAGE_LENGTH)
          return `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
        return "";
      default:
        return "";
    }
  };

  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {};
    (Object.keys(form) as Array<keyof FormState>).forEach((key) => {
      const err = validateField(key, form[key], true);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormState;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
    if (fieldName !== "name" || value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    const fieldName = name as keyof FormState;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, form[fieldName]),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const validationErrors = validateAll();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && !loading) {
      setLoading(true);
      setSubmitMessage({ type: "", text: "" });
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        setSubmitMessage({
          type: "success",
          text: "🎉 Thank you! We'll be in touch soon.",
        });
        setForm({ name: "", email: "", phone: "", message: "" });
        setTouched({});
      } catch {
        setSubmitMessage({
          type: "error",
          text: "Something went wrong. Please try again. 🥺",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6 mt-8 w-full" onSubmit={handleSubmit}>
      {(["name", "email", "phone", "message"] as Array<keyof FormState>).map(
        (field) => (
          <label key={field} className="flex flex-col gap-1 font-ttjenevers">
            <div className="flex flex-row justify-between items-center w-full">
              <span>{texts.footer.form[field]}</span>
              {errors[field] && (
                <span className="text-red-500 text-xs ml-2 whitespace-nowrap">
                  {errors[field]}
                </span>
              )}
            </div>
            {field === "message" ? (
              <>
                <textarea
                  className="border-borderColor bg-[#ede7df] outline-none py-2 resize-none font-almarai px-3 mt-2"
                  rows={4}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                <div className="flex justify-end items-center">
                  <span className="text-xs text-gray-500 ml-auto">
                    {form.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </>
            ) : (
              <input
                className="border-borderColor bg-[#ede7df] outline-none py-2 font-almarai px-3 mt-2"
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                      ? "tel"
                      : "text"
                }
                name={field}
                value={form[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
            )}
          </label>
        ),
      )}

      {submitMessage.text && (
        <div
          className={`text-sm p-3 rounded border ${
            submitMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <button
        type="submit"
        className="border border-borderColor px-8 py-2 mt-2 w-fit self-end font-barlow tracking-wider bg-white hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Sending..." : texts.footer.form.submit}
      </button>
    </form>
  );
};

export default ContactFormInner;
