// File: src/pages/ResourceDetailPage.tsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployerHeader from '@/components/EmployerHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Twitter, Linkedin, Link2 } from 'lucide-react';

// --- DUMMY DATA (Wahi data jo ResourcesPage mein tha) ---
const resources = [
  { id: 1, category: "Hiring Guides", title: "How to Write an Effective Teacher Job Description", description: "Learn how to attract the best candidates...", imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200", path: "/resources/writing-job-descriptions", slug: "writing-job-descriptions" },
  { id: 2, category: "Interview Tips", title: "Top 10 Interview Questions to Ask Educators", description: "Go beyond the basics...", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200", path: "/resources/interview-questions", slug: "interview-questions" },
  { id: 3, category: "Industry Insights", title: "The Future of EdTech: Trends to Watch in 2025", description: "Stay ahead of the curve...", imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200", path: "/resources/edtech-trends", slug: "edtech-trends" },
  { id: 4, category: "Hiring Guides", title: "A Guide to Onboarding New Teachers Successfully", description: "A strong onboarding process is key...", imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1200", path: "/resources/onboarding-teachers", slug: "onboarding-teachers" },
  { id: 5, category: "Legal & Compliance", title: "Understanding Teacher Employment Contracts", description: "Navigate the legal landscape...", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200", path: "/resources/employment-contracts", slug: "employment-contracts" },
  { id: 6, category: "Well-being", title: "Preventing Teacher Burnout: A Guide for Schools", description: "Learn proactive strategies...", imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200", path: "/resources/teacher-burnout", slug: "teacher-burnout" },
];

const Sidebar = ({ currentSlug }: { currentSlug: string }) => {
    const relatedResources = resources.filter(r => r.slug !== currentSlug).slice(0, 2);
    return (
        <aside className="sticky top-24 space-y-8">
            {/* Share Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Share this article</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="w-full"><Twitter className="w-5 h-5"/></Button>
                    <Button variant="outline" size="icon" className="w-full"><Linkedin className="w-5 h-5"/></Button>
                    <Button variant="outline" size="icon" className="w-full"><Link2 className="w-5 h-5"/></Button>
                </div>
            </div>
            {/* Read Next Section */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Read Next</h3>
                <div className="space-y-4">
                    {relatedResources.map(res => (
                        <Link to={res.path} key={res.id} className="group block">
                            <p className="font-semibold text-slate-800 group-hover:text-indigo-600">{res.title}</p>
                            <p className="text-sm text-slate-500">{res.category}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    )
}

const ResourceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const resource = resources.find(r => r.slug === slug);

  if (!resource) {
    return (
        <div className="flex items-center justify-center h-screen">
            <EmployerHeader />
            <h1 className="text-2xl font-bold">Resource not found!</h1>
        </div>
    );
  }

  const categoryColors: { [key: string]: string } = {
    "Hiring Guides": "bg-indigo-100 text-indigo-800", "Interview Tips": "bg-emerald-100 text-emerald-800", "Industry Insights": "bg-sky-100 text-sky-800", "Legal & Compliance": "bg-rose-100 text-rose-800", "Well-being": "bg-amber-100 text-amber-800",
  };
  const categoryClass = categoryColors[resource.category] || "bg-slate-100 text-slate-800";

  return (
    <div className="bg-slate-50 min-h-screen">
      <EmployerHeader />
      <main>
        {/* --- FULL-WIDTH IMAGE BANNER --- */}
        <section className="relative h-96 bg-slate-800">
          <img src={resource.imageUrl} alt={resource.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-end py-12 px-4 sm:px-6 lg:px-8">
             <span className={`text-sm font-bold px-3 py-1 rounded-full self-start ${categoryClass}`}>
                {resource.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4">{resource.title}</h1>
            <p className="text-lg text-slate-300 mt-2">Published on: Oct 26, 2023 • 5 min read</p>
          </div>
        </section>

        {/* --- MAIN CONTENT & SIDEBAR --- */}
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Article Content */}
                <article className="lg:col-span-2 prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-800">
                    <h2>Introduction</h2>
                    <p>{resource.description} Let's dive deeper into the key aspects you need to consider to make your next hire a resounding success.</p>
                    
                    <h2>Why a Great Job Description Matters</h2>
                    <p>A job description is your first point of contact with potential candidates. It's not just a list of duties; it's a marketing tool. A well-crafted description:</p>
                    <ul>
                        <li>Attracts the right talent by being specific about skills and qualifications.</li>
                        <li>Sets clear expectations for the role, reducing confusion later.</li>
                        <li>Reflects your school's culture and values.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    <h2>Conclusion</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </article>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Sidebar currentSlug={resource.slug}/>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResourceDetailPage;