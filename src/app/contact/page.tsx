import Navbar from "@/components/Navbar";
import ContactMain from "@/components/contact/ContactMain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kriva Pictures. Fill out our contact form or reach us via email, phone, or social media.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactMain />
    </>
  );
}
