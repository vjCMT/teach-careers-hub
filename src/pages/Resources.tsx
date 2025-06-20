// File: src/pages/ResourcesPage.tsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"; // Button component import karein

// --- PLACEHOLDER COMPONENTS (Kept as is) ---
const EmployerHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/post-job", label: "Post a Job" },
    { href: "/products", label: "Products" },
    { href: "/resources", label: "Resources" },
  ];
  return (
    <header className="bg-[#2d2d2d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">
              TeacherConnect
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  currentPath === link.href
                    ? "font-semibold text-white bg-white/10"
                    : "font-medium text-gray-300 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              For Jobseekers
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- DUMMY DATA (Same as before) ---
const resources = [
  {
    id: 1,
    category: "Hiring Guides",
    title: "How to Write an Effective Teacher Job Description",
    description:
      "Learn how to attract the best candidates with a compelling job description that stands out.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    path: "/resources/writing-job-descriptions",
  },
  {
    id: 4,
    category: "Hiring Guides",
    title: "A Guide to Onboarding New Teachers Successfully",
    description:
      "A strong onboarding process is key to retention. Discover the essential steps for success.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1200",
    path: "/resources/onboarding-teachers",
  },
  {
    id: 2,
    category: "Interview Tips",
    title: "Top 10 Interview Questions to Ask Educators",
    description:
      "Go beyond the basics and identify truly exceptional candidates with these insightful questions.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
    path: "/resources/interview-questions",
  },
  {
    id: 3,
    category: "Industry Insights",
    title: "The Future of EdTech: Trends to Watch in 2025",
    description:
      "Stay ahead of the curve by understanding the technological shifts shaping modern education.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200",
    path: "/resources/edtech-trends",
  },
  {
    id: 5,
    category: "Legal & Compliance",
    title: "Understanding Teacher Employment Contracts",
    description:
      "Navigate the legal landscape of educational hiring with confidence. We break down the key clauses.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    path: "/resources/employment-contracts",
  },
  {
    id: 6,
    category: "Well-being",
    title: "Preventing Teacher Burnout: A Guide for Schools",
    description:
      "A happy teacher is an effective teacher. Learn proactive strategies to support your staff's well-being.",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200",
    path: "/resources/teacher-burnout",
  },
];

// --- Functional Navbar (Unchanged) ---
const ResourcesNav = ({
  items,
  activeItem,
  onItemClick,
}: {
  items: string[];
  activeItem: string;
  onItemClick: (item: string) => void;
}) => {
  return (
    <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto h-14">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => onItemClick(item)}
              className={`flex-shrink-0 px-3 py-2 text-sm font-semibold h-full flex items-center border-b-2 transition-all duration-200 ${activeItem === item ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-600 hover:text-indigo-600 hover:border-indigo-300"}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// --- [UPDATED] Featured Resource Card with a proper Button ---
const FeaturedResourceCard = ({
  resource,
}: {
  resource: (typeof resources)[0];
}) => (
  <Link
    to={resource.path}
    className="group block md:grid md:grid-cols-2 md:gap-12 items-center"
  >
    <div className="overflow-hidden rounded-2xl">
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        src={resource.imageUrl}
        alt={resource.title}
      />
    </div>
    <div className="mt-6 md:mt-0">
      <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
        {resource.category}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
        {resource.title}
      </h2>
      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        {resource.description}
      </p>
      {/* Updated Button */}
      <Button
        asChild
        variant="link"
        className="p-0 h-auto text-indigo-600 font-semibold group mt-6 text-md"
      >
        <span>
          Read Article
          <ArrowRight className="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
    </div>
  </Link>
);

// --- [UPDATED] Standard Resource Card with a proper Button ---
const ResourceCard = ({ resource }: { resource: (typeof resources)[0] }) => (
  <Link
    to={resource.path}
    className="group flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
  >
    <div className="overflow-hidden">
      <img
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        src={resource.imageUrl}
        alt={resource.title}
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
        {resource.category}
      </p>
      <h3 className="mt-2 text-lg font-bold text-slate-800 flex-grow">
        {resource.title}
      </h3>
      {/* Updated Button */}
      <Button
        asChild
        variant="link"
        className="p-0 h-auto text-sm text-indigo-600 font-semibold group mt-4 justify-start"
      >
        <span>
          Read More
          <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
    </div>
  </Link>
);

// --- Main Page Component ---
const ResourcesPage = () => {
  const navItems = [
    "All Resources",
    ...new Set(resources.map((r) => r.category)),
  ];
  const [activeFilter, setActiveFilter] = useState(navItems[0]);

  const filteredResources = resources.filter((resource) => {
    if (activeFilter === "All Resources") return true;
    return resource.category === activeFilter;
  });

  const featuredArticle = filteredResources[0];
  const otherArticles = filteredResources.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      <EmployerHeader />
      <ResourcesNav
        items={navItems}
        activeItem={activeFilter}
        onItemClick={setActiveFilter}
      />

      <main>
        {/* --- [COLOR UPDATED] - Hero Section with Indigo/Purple Gradient --- */}
        <section className="relative bg-gradient-to-br from-indigo-700 to-purple-800 text-white overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl opacity-70"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center py-20 sm:py-24 px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Employer Resource Library
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-indigo-200">
              Hiring made simple. Learn more about tools, hiring with
              TeacherConnect, trends, and more. It’s all here in our resource
              center.
            </p>
          </div>
        </section>

        {/* --- MAIN CONTENT AREA (No structural change) --- */}
        <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="space-y-20">
              {featuredArticle && (
                <section>
                  <FeaturedResourceCard resource={featuredArticle} />
                </section>
              )}
              {otherArticles.length > 0 && (
                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-700">
                No Resources Found
              </h3>
              <p className="text-slate-500 mt-2">
                There are currently no articles in the "{activeFilter}"
                category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ResourcesPage;