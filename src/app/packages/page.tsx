import Navbar from "@/components/Navbar";
import PackageMain from "@/components/packages/PackageMain";
import packagesService from "@/services/packagesService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Explore our flexible photography packages — baby sessions, maternity, newborn, family, and special occasions. All beautifully edited and delivered digitally.",
};

export default function PackagesPage() {
  const packages = packagesService.getPackages();

  return (
    <>
      <Navbar />
      <PackageMain packages={packages} />
    </>
  );
}
