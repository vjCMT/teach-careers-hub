import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronRight, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalaryGuide = () => {
  const [roleQuery, setRoleQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("India");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const navigate = useNavigate();

  const allCareers = [
    {
      role: "Software Engineer",
      salary: "₹8,22,225 per year",
      industry: "Technology",
      path: "software-engineer",
    },
    {
      role: "Registered Nurse",
      salary: "₹2,11,107 per year",
      industry: "Healthcare",
      path: "registered-nurse",
    },
    {
      role: "Accountant",
      salary: "₹2,49,128 per year",
      industry: "Finance & Accounting",
      path: "accountant",
    },
    {
      role: "Business Analyst",
      salary: "₹8,32,049 per year",
      industry: "Technology",
      path: "business-analyst",
    },
    {
      role: "Nursing Assistant",
      salary: "₹2,37,336 per year",
      industry: "Healthcare",
      path: "nursing-assistant",
    },
    {
      role: "Sales Executive",
      salary: "₹2,42,787 per year",
      industry: "Sales & Retail",
      path: "sales-executive",
    },
    {
      role: "Human Resources Specialist",
      salary: "₹2,72,598 per year",
      industry: "Human Resources & Staffing",
      path: "human-resources-specialist",
    },
    {
      role: "Customer Service Representative",
      salary: "₹2,48,352 per year",
      industry: "Business Management, Administrative & Customer Support",
      path: "customer-service-representative",
    },
    {
      role: "Elementary School Teacher",
      salary: "₹2,48,338 per year",
      industry: "Education & Instruction",
      path: "elementary-school-teacher",
    },
  ];

  const industries = [
    { id: "all", name: "All Industries" },
    { id: "Technology", name: "Technology" },
    { id: "Healthcare", name: "Healthcare" },
    { id: "Finance & Accounting", name: "Finance & Accounting" },
    { id: "Sales & Retail", name: "Sales & Retail" },
    { id: "Human Resources & Staffing", name: "Human Resources & Staffing" },
    { id: "Education & Instruction", name: "Education & Instruction" },
    {
      id: "Business Management, Administrative & Customer Support",
      name: "Business Management, Administrative & Customer Support",
    },
  ];

  const filteredCareers =
    selectedIndustry === "all"
      ? allCareers
      : allCareers.filter((career) => career.industry === selectedIndustry);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleQuery.trim()) {
      const formattedRole = roleQuery.trim().toLowerCase().replace(/\s+/g, "-");
      navigate(`/career/${formattedRole}/salaries`);
    }
  };

  return (
    <div className="bg-gray-50 font-['Indeed_Sans',_sans-serif] text-[#2d2d2d] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative z-[3]">
          <div className="absolute top-0 left-0 w-full h-[90%] bg-[#0d2d5e] rounded-br-[70px] z-[-1]"></div>
          <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <div className="flex justify-between items-end">
              <div className="text-white p-6 md:p-8 flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  Discover your earning potential
                </h1>
                <p className="text-sm md:text-base">
                  Explore high-paying careers, salaries and job openings by
                  industry and location.
                </p>
              </div>
              <div className="hidden md:block self-end pr-6 relative top-[25px]">
                <img
                  src="https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/landing-header-95618769fed834ee2af073db8fedaa1e.svg"
                  alt="Career illustration"
                  width="160"
                  height="127"
                />
              </div>
            </div>

            <div
              className="bg-white p-4 md:p-6 rounded-md shadow-lg"
              style={{ borderRadius: "5px 30px 5px 5px" }}
            >
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row md:items-end gap-2"
              >
                <div className="flex-1">
                  <label
                    htmlFor="input-title"
                    className="block text-sm font-bold text-gray-800 mb-1"
                  >
                    What
                  </label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Job title"
                    value={roleQuery}
                    onChange={(e) => setRoleQuery(e.target.value)}
                    className="h-12 text-base border-gray-400 rounded-md focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_-2px_0_0_#2557a7]"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="input-location"
                    className="block text-sm font-bold text-gray-800 mb-1"
                  >
                    Where
                  </label>
                  <div className="relative">
                    <Input
                      id="input-location"
                      type="text"
                      placeholder="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="h-12 text-base border-gray-400 rounded-md focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_-2px_0_0_#2557a7]"
                    />
                    {locationQuery && (
                      <button
                        type="button"
                        onClick={() => setLocationQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-gray-700"
                        aria-label="clear location"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto h-12 text-base font-bold px-6"
                  disabled={!roleQuery.trim() || !locationQuery.trim()}
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 md:pb-16">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Browse top-paying jobs by industry
          </h2>
          <div className="mb-6">
            <label
              htmlFor="industry-select"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              Choose an industry
            </label>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger
                id="industry-select"
                className="w-full md:w-80 h-11 text-base border-gray-400 rounded-md focus:border-blue-600 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_-2px_0_0_#2557a7]"
              >
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCareers.map((career) => (
              <li key={career.role} className="list-none h-full">
                <Link
                  to={`/career/${career.path}/salaries`}
                  className="flex flex-col justify-between h-full group p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-base leading-tight mb-1 group-hover:underline">
                      {career.role}
                    </h3>
                    <p className="font-bold text-blue-600 text-base">
                      {career.salary}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 group-hover:text-blue-600 group-hover:underline">
                      Job openings
                    </span>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:bg-blue-600 group-hover:text-white rounded-full p-0.5 transition-colors" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default SalaryGuide;
