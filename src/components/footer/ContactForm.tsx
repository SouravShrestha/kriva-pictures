"use client";

import { Suspense } from "react";
import ContactFormInner from "./ContactFormInner";

const ContactForm = () => (
  <Suspense fallback={<div className="h-64 flex items-center justify-center"><span className="font-almarai text-sm">Loading form...</span></div>}>
    <ContactFormInner />
  </Suspense>
);

export default ContactForm;
