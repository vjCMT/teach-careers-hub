import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

// --- DUMMY RESOURCE DATA ---
const resources = [
  {
    id: 1,
    category: "Hiring Guides",
    title: "How to Write an Effective Teacher Job Description",
    description:
      "Learn how to attract the best candidates by crafting a clear, concise, and compelling job description that stands out.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    path: "/resources/writing-job-descriptions",
  },
  {
    id: 2,
    category: "Interview Tips",
    title: "Top 10 Interview Questions to Ask Educators",
    description:
      "Go beyond the basics. These questions will help you assess a candidate’s teaching philosophy, classroom management skills, and passion.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    path: "/resources/interview-questions",
  },
  {
    id: 3,
    category: "Industry Insights",
    title: "The Future of EdTech: Trends to Watch in 2025",
    description:
      "Stay ahead of the curve by understanding the key technological trends shaping modern education and how to leverage them.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800",
    path: "/resources/edtech-trends",
  },
  {
    id: 4,
    category: "Hiring Guides",
    title: "A Guide to Onboarding New Teachers Successfully",
    description:
      "A strong onboarding process is key to retention. Discover the steps to make new teachers feel welcome, supported, and effective from day one.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=800",
    path: "/resources/onboarding-teachers",
  },
];

const ResourcesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Employer Resources
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Guides, articles, and insights to help you build an outstanding
              educational team.
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                to={resource.path}
                key={resource.id}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={resource.imageUrl}
                      alt={resource.title}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm font-medium text-primary">
                      {resource.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:underline">
                      {resource.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 flex-grow">
                      {resource.description}
                    </p>
                    <div className="mt-6 flex items-center">
                      <div className="text-sm">
                        <p className="font-semibold text-primary group-hover:underline">
                          Read more{" "}
                          <ArrowRight className="inline h-4 w-4 transition-transform transform group-hover:translate-x-1" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ResourcesPage;
