import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const CompanyReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredStars, setHoveredStars] = useState(0);

  const allPopularCompanies = [
    {
      name: "EY",
      logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/2138292378140570afde98e7103dbb54",
      rating: 3.9,
      reviewsCount: 10409,
      url: "/cmp/Ey",
    },
    {
      name: "Concentrix",
      logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/dc0e868d737c929fab77e2fd6c770494",
      rating: 3.3,
      reviewsCount: 40605,
      url: "/cmp/Concentrix",
    },
    {
      name: "Kotak Mahindra Bank",
      logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/6dab2f9e01e4bb467ce4416015c323e8",
      rating: 3.9,
      reviewsCount: 2245,
      url: "/cmp/Kotak-Mahindra-Bank",
    },
    {
      name: "Bajaj Allianz Life Insurance",
      logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/441740d1c75766a9c1e51932a3873442",
      rating: 4.2,
      reviewsCount: 1072,
      url: "/cmp/Bajaj-Allianz-Life-Insurance",
    },
    {
        name: "LTIMindtree",
        logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/2e0b517595f581cc06939cc512e78d77",
        rating: 3.7,
        reviewsCount: 2942,
        url: "/cmp/Ltimindtree-1",
    },
    {
      name: "Capgemini",
      logoUrl: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/8df3e7301fa4f88e3d67e927be1689b2",
      rating: 3.7,
      reviewsCount: 10462,
      url: "/cmp/Capgemini",
    },
  ];

  const [displayedCompanies, setDisplayedCompanies] = useState(allPopularCompanies);

  const renderStars = (rating: number) => (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            let fillPercentage = '0%';
            if (starValue <= rating) {
                fillPercentage = '100%';
            } else if (starValue > rating && index < rating) {
                fillPercentage = `${(rating - index) * 100}%`;
            }
            return (
                <div key={index} className="relative w-5 h-5">
                    <Star className="absolute text-gray-300 w-5 h-5" />
                    <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: fillPercentage }}>
                        <Star className="text-[#9d2b6b] fill-[#9d2b6b] w-5 h-5" />
                    </div>
                </div>
            );
        })}
    </div>
  );
  
  const renderInteractiveStars = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Link
          key={star}
          to={`/survey/mc?campaignid=discovery&stars=${star}`}
          onMouseEnter={() => setHoveredStars(star)}
          onMouseLeave={() => setHoveredStars(0)}
          aria-label={`${star} star out of 5`}
          className="p-1"
        >
          <Star
            className={`w-6 h-6 transition-colors duration-200 ease-in-out ${
              star <= hoveredStars
                ? "text-blue-600 fill-blue-600"
                : "text-blue-600 fill-transparent"
            }`}
          />
        </Link>
      ))}
    </div>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
        setDisplayedCompanies(allPopularCompanies);
        return;
    }
    const filtered = allPopularCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedCompanies(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <main className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="w-full lg:w-3/4 xl:w-1/2 mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Find great places to work
                </h1>
                <p className="text-lg text-gray-500 mb-6">
                    Get access to millions of company reviews
                </p>
                
                <form onSubmit={handleSearch} className="w-full">
                    <div className="flex flex-col md:flex-row items-end gap-2">
                        <div className="flex-1 w-full text-left">
                            <label htmlFor="company-search" className="text-sm font-bold text-gray-700 mb-1 block">
                                Company name or job title
                            </label>
                            <div className="relative">
                                <Input
                                    id="company-search"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-12 text-base border-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full md:w-auto h-12 text-base font-bold px-6">
                            Find Companies
                        </Button>
                    </div>
                     <Link to="/career/salaries" className="text-blue-600 hover:underline mt-3 inline-block text-sm">
                        Do you want to search for salaries?
                    </Link>
                </form>
            </div>
        </div>
      </main>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Popular companies
                </h2>
                
                <ul className="space-y-4">
                  {displayedCompanies.map((company) => (
                    <li key={company.name} className="py-4 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Link to={company.url}>
                          <img src={company.logoUrl} alt={`${company.name} logo`} className="w-12 h-12 rounded-sm border border-gray-100" />
                        </Link>
                        
                        <div className="flex-1">
                          <Link to={company.url} className="text-lg font-bold text-blue-700 hover:underline">
                            {company.name}
                          </Link>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-gray-700">{company.rating.toFixed(1)}</span>
                                {renderStars(company.rating)}
                              </div>
                              <Link to={`${company.url}/reviews`} className="text-sm text-blue-700 hover:underline">
                                  {company.reviewsCount.toLocaleString()} reviews
                              </Link>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <Link to={`${company.url}/salaries`} className="text-gray-600 hover:text-blue-700 hover:underline">
                              Salaries
                            </Link>
                            <Link to={`${company.url}/faq`} className="text-gray-600 hover:text-blue-700 hover:underline">
                              Questions
                            </Link>
                            <Link to={`${company.url}/jobs`} className="text-gray-600 hover:text-blue-700 hover:underline">
                              Open jobs
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>

            <div className="lg:col-span-4 lg:mt-12">
                <Card className="bg-[#f5fbf9]">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Rate your recent employer
                        </h3>
                        <div className="bg-white p-2 rounded-md shadow-sm inline-block">
                           {renderInteractiveStars()}
                        </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CompanyReviews;