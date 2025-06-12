
import React from 'react';
import { CheckCircle, Users, Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PostJob = () => {
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
              <a href="/post-job" className="px-3 py-2 text-sm font-medium text-white border-b-2 border-white">
                Post a Job
              </a>
              <a href="/find-cvs" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                Find CVs
              </a>
              <a href="/products" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                Products
              </a>
              <a href="/resources" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                Resources
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <a href="/" className="text-sm font-medium text-gray-300 hover:text-white">
                Jobseeker
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-employer-dark to-primary py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Let's hire your next great teacher. Fast.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                No matter the skills, experience, or qualifications you're looking for, 
                you'll find the right people for your school on Teacher-Connect.
              </p>
              <Button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg">
                Post a Job
              </Button>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-full h-80 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Professional teacher interaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to make great hires
            </h2>
            <p className="text-xl text-gray-600">
              Our platform simplifies the hiring process for educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Post Your Job</h3>
              <p className="text-gray-600">
                Reach thousands of qualified teachers across India with a single post.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Quality Candidates</h3>
              <p className="text-gray-600">
                Our team helps you identify and connect with the best-matched teachers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hire Confidently</h3>
              <p className="text-gray-600">
                Make informed decisions with detailed profiles, reviews, and our expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Schools Across India
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl text-primary mb-6">"</div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                Teacher-Connect helped us find a qualified Physics PGT in just two weeks. 
                The process was seamless and the quality of candidates was exceptional.
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Dr. Rajesh Kumar</p>
                  <p className="text-gray-600">Principal, Delhi Public School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to find your next hired candidate?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of schools that trust Teacher-Connect for their hiring needs.
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

export default PostJob;
