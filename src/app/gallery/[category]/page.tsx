import Navbar from "@/components/Navbar";
import galleryService from "@/services/galleryService";
import CategoryView from "@/components/gallery/CategoryView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return galleryService.getCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await galleryService.resolveCategoryBySlug(categorySlug);
  return {
    title: category?.name ?? "Gallery",
    description: `Browse ${category?.name ?? "gallery"} photos by Kriva Pictures.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = await galleryService.resolveCategoryBySlug(categorySlug);

  if (!category) notFound();

  return (
    <>
      <Navbar />
      <CategoryView category={category} categorySlug={categorySlug} />
    </>
  );
}
