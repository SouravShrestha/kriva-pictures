import Navbar from "@/components/nav/Navbar";
import ContactMain from "@/components/contact/ContactMain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kriva Pictures. Fill out our contact form or reach us via email, phone, or social media.",
};

interface ContactPageProps {
  searchParams: Promise<{ package?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { package: packageName } = await searchParams;
  const initialMessage = packageName
    ? `I would like to enquire about the ${packageName} package.`
    : undefined;

  return (
    <>
      <Navbar />
      <ContactMain initialMessage={initialMessage} />
    </>
  );
}
