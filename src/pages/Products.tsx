import React from "react";
import { CheckCircle, Users, Search, Target, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Employer Header */}
      <header className="bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">Teacher-Connect</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/post-job"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Post a Job
              </a>
              <a
                href="/findcv"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Find CVs
              </a>
              <a
                href="/products"
                className="px-3 py-2 text-sm font-medium text-white border-b-2 border-white"
              >
                Products
              </a>
              <a
                href="/resources"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Resources
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                Jobseeker
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                Matching and hiring made easy
              </h1>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                Products for Schools & Institutions
              </h2>
              <p className="text-lg mb-8 text-gray-600">
                We have all the tools you need to find the right teaching talent
                and to start hiring today.
              </p>
              <Button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-lg">
                Post a Job
              </Button>
            </div>

            <div className="hidden lg:block">
              <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-primary">
                  <Users className="w-24 h-24 mx-auto mb-4" />
                  <p className="text-lg font-medium">Professional educators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Hiring Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start with a Free Teacher Job Post
              <span className="text-sm text-gray-500 ml-2">*</span>
            </h2>
            <p className="text-gray-600">*Terms and conditions apply</p>
          </div>

          <div className="space-y-16">
            {/* Job Post Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-primary">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Job post template interface</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Search templates for any subject
                </h3>
                <p className="text-gray-600 text-lg">
                  Craft the perfect job post with one of our pre-built templates
                  for roles like PGT, TGT, PRT, and more. Includes guidance on
                  writing an attention-grabbing job description.
                </p>
              </div>
            </div>

            {/* Screening Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Add screening questions
                </h3>
                <p className="text-gray-600 text-lg">
                  Filter candidates by asking crucial questions upfront, such as
                  'Do you have a B.Ed degree?' or 'Are you proficient with
                  online teaching tools?'
                </p>
              </div>
              <div>
                <div className="w-full h-64 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-green-600">
                    <Filter className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Screening checklist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All-in-One Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-full h-64 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-purple-600">
                    <Target className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Hiring dashboard</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hiring, all in one place
                </h3>
                <p className="text-gray-600 text-lg">
                  Your first job post unlocks your dashboard, where you can
                  track applications, message candidates, schedule interviews,
                  and manage your entire hiring process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upgrade to Reach More Quality Teachers
            </h2>
          </div>

          <div className="space-y-16">
            {/* Sponsored Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get better visibility with Sponsored Posts
                </h3>
                <p className="text-gray-600 text-lg">
                  Sponsored Jobs appear for longer and are more visible in
                  relevant search results, which is ideal for urgent roles or
                  competitive positions. Pause or cancel anytime.
                </p>
              </div>
              <div>
                <div className="w-full h-64 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-yellow-600">
                    <Star className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Sponsored visibility boost</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Sourcing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-full h-64 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-indigo-600">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Matched candidate profiles</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get access to matched candidates
                </h3>
                <p className="text-gray-600 text-lg">
                  Our Smart Sourcing subscription instantly shows you teachers
                  whose profiles match your job description. Filter by skills,
                  experience, and qualifications, and invite top candidates to
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to build your dream team?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Your next great teacher is looking for you, too!
          </p>
          <Button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Post a Job
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
