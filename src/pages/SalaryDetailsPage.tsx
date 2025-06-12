import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample data - In a real app, this would come from an API
const salaryData = {
  "software-engineer": {
    title: "Software Engineer",
    avgSalary: "₹8,22,225",
    salariesReported: "32.3k",
    lastUpdated: "1 June 2025",
    highestPayingCities: [
      { city: "Bengaluru, Karnataka", salary: "₹9,73,218", reports: "11.5k" },
      { city: "Gurgaon, Haryana", salary: "₹9,18,825", reports: "2.4k" },
      { city: "Noida, Uttar Pradesh", salary: "₹8,36,779", reports: "235" },
      { city: "Hyderabad, Telangana", salary: "₹8,34,583", reports: "4.9k" },
      { city: "New Delhi, Delhi", salary: "₹8,03,319", reports: "444" },
      { city: "Pune, Maharashtra", salary: "₹7,58,904", reports: "5.4k" },
    ],
    similarProfessions: [
        { role: "Entry Level Software Engineer", salary: "₹4,54,792", path: "entry-level-software-engineer" },
        { role: "Junior Software Engineer", salary: "₹4,56,249", path: "junior-software-engineer" },
        { role: "Principal Software Engineer", salary: "₹16,67,859", path: "principal-software-engineer" },
        { role: "Senior Software Engineer", salary: "₹12,54,033", path: "senior-software-engineer" },
    ],
  },
  // You can add more job details here following the same structure
};


const SalaryDetailsPage = () => {
    const { jobTitle: jobPath } = useParams();
    const navigate = useNavigate();
    
    // Find job data based on the URL path
    const jobData = salaryData[jobPath];

    if (!jobData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Not Found</h1>
                        <p className="text-gray-600 mb-6">Sorry, we couldn't find the salary details for this job.</p>
                        <Button onClick={() => navigate('/salary-guide')}>Back to Salary Guide</Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
  
  return (
    <div className="bg-gray-50 font-['Indeed_Sans',_sans-serif] text-[#2d2d2d] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#0d2d5e]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white p-4 md:p-6 rounded-md shadow-lg">
                    <form className="flex flex-col md:flex-row md:items-end gap-2">
                        <div className="flex-1">
                          <label htmlFor="input-title-details" className="block text-sm font-bold text-gray-800 mb-1">What</label>
                          <Input
                            id="input-title-details"
                            type="text"
                            defaultValue={jobData.title}
                            className="h-12 text-base border-gray-400 rounded-md focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_-2px_0_0_#2557a7]"
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="input-location-details" className="block text-sm font-bold text-gray-800 mb-1">Where</label>
                           <div className="relative">
                               <Input
                                  id="input-location-details"
                                  type="text"
                                  defaultValue="India"
                                  className="h-12 text-base border-gray-400 rounded-md focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_-2px_0_0_#2557a7]"
                               />
                               <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-gray-700" aria-label="clear location">
                                   <XCircle className="w-5 h-5" />
                               </button>
                           </div>
                        </div>
                        <Button type="submit" className="w-full md:w-auto h-12 text-base font-bold px-6">
                          Search
                        </Button>
                    </form>
                </div>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="py-5 text-sm" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
                    <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                    <li><Link to="/salary-guide" className="text-blue-600 hover:underline">Salary Guide</Link></li>
                    <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                    <li className="text-gray-500">{jobData.title} Salary</li>
                </ol>
            </nav>

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Software engineer salary in India</h1>
                <h2 className="text-gray-600">How much does a Software Engineer make in India?</h2>
            </div>
            
            <div className="bg-[#faf9f8] p-6 rounded-lg mb-8">
                <p className="text-sm font-bold text-gray-600 mb-1">Average base salary</p>
                <div className="flex items-center gap-4">
                    <p className="text-4xl font-bold text-[#2d2d2d]">{jobData.avgSalary}</p>
                    <span className="text-gray-600">per year</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">The average salary for a software engineer is {jobData.avgSalary} per year in India. {jobData.salariesReported} salaries reported, updated at {jobData.lastUpdated}.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Highest paying cities near India for Software Engineers</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {jobData.highestPayingCities.map(cityInfo => (
                         <li key={cityInfo.city}><Link to="#" className="flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition-colors"><div className="font-bold">{cityInfo.city}</div> <div className="text-gray-800">{cityInfo.salary}</div></Link></li>
                    ))}
                </ul>
            </div>
            
             <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">How much do similar professions as Software Engineer get paid in India?</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobData.similarProfessions.map(prof => (
                        <div key={prof.role} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-600 hover:shadow-lg transition-all">
                             <div>
                                 <h3 className="font-bold text-base mb-1">{prof.role}</h3>
                                 <Link to={`/career/${prof.path}/salaries`} className="text-blue-600 font-bold hover:underline">{prof.salary} per year</Link>
                             </div>
                            <Link to={`/jobs?q=${encodeURIComponent(prof.role)}`} className="text-sm text-gray-500 hover:text-blue-600 hover:underline mt-3">Job openings</Link>
                        </div>
                    ))}
                 </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalaryDetailsPage;