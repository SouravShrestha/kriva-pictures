import { Suspense } from "react";
import ContactFormInner from "./ContactFormInner";

interface ContactFormProps {
  initialMessage?: string;
}

const ContactForm = ({ initialMessage }: ContactFormProps) => (
  <Suspense fallback={<div className="h-64 flex items-center justify-center"><span className="font-almarai text-sm">Loading form...</span></div>}>
    <ContactFormInner initialMessage={initialMessage} />
  </Suspense>
);

export default ContactForm;
