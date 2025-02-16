"use client";

import React from "react";
import { useParams } from "next/navigation";
import BlogHeader from "@/components/blog-header";
import SectionNavigation from "@/components/section-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import ContentSection from "@/components/content-section";
import { blogData } from "@/lib/blogData";

export default function BlogPage() {
  const params = useParams(); // ✅ Fix: Get params using useParams()
  const slug = params?.slug as string; // Ensure it's a string

  const currentBlog = blogData[slug];

  if (!currentBlog) {
    return <div className="p-8">Blog post not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <main className="flex-1 p-4 md:p-8 lg:p-28 mb-4 pt-28">
        <BlogHeader
          image={currentBlog.image}
          badge={currentBlog.badge}
          title={currentBlog.title}
          author={currentBlog.author}
          description={currentBlog.description}
          timeAgo={currentBlog.timeAgo}
        />
        <div className="lg:hidden mb-4">
          <MobileNavigation sections={currentBlog.sections} />
        </div>
        <div className="flex flex-col lg:flex-row">
          <aside className="lg:w-1/4 p-4 hidden lg:block">
            <SectionNavigation sections={currentBlog.sections} />
          </aside>
          <div className="flex-1">
            {currentBlog.sections.map((section, index) => (
              <ContentSection key={index} title={section.title} content={section.content} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
