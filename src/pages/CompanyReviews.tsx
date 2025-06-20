import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Megaphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const allPopularCompanies = [
  {
    name: "EY",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/2138292378140570afde98e7103dbb54",
    rating: 3.9,
    reviewsCount: 10409,
    url: "/cmp/Ey",
  },
  {
    name: "Concentrix",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/dc0e868d737c929fab77e2fd6c770494",
    rating: 3.3,
    reviewsCount: 40605,
    url: "/cmp/Concentrix",
  },
  {
    name: "Kotak Mahindra Bank",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/6dab2f9e01e4bb467ce4416015c323e8",
    rating: 3.9,
    reviewsCount: 2245,
    url: "/cmp/Kotak-Mahindra-Bank",
  },
  {
    name: "Bajaj Allianz Life Insurance",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/441740d1c75766a9c1e51932a3873442",
    rating: 4.2,
    reviewsCount: 1072,
    url: "/cmp/Bajaj-Allianz-Life-Insurance",
  },
  {
    name: "LTIMindtree",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/2e0b517595f581cc06939cc512e78d77",
    rating: 3.7,
    reviewsCount: 2942,
    url: "/cmp/Ltimindtree-1",
  },
  {
    name: "Capgemini",
    logoUrl:
      "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/8df3e7301fa4f88e3d67e927be1689b2",
    rating: 3.7,
    reviewsCount: 10462,
    url: "/cmp/Capgemini",
  },
];

const CompanyReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredStars, setHoveredStars] = useState(0);
  const [displayedCompanies, setDisplayedCompanies] =
    useState(allPopularCompanies);

  const renderStars = (rating: number) => (
    <div
      className="flex items-center"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        let fillPercentage = "0%";
        if (starValue <= rating) {
          fillPercentage = "100%";
        } else if (starValue > rating && index < rating) {
          fillPercentage = `${(rating - index) * 100}%`;
        }
        return (
          <div key={index} className="relative w-4 h-4">
            <Star className="absolute text-slate-300 w-4 h-4" />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: fillPercentage }}
            >
              <Star className="text-amber-400 fill-amber-400 w-4 h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderInteractiveStars = () => (
    <div
      className="flex items-center space-x-1"
      onMouseLeave={() => setHoveredStars(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Link
          key={star}
          to={`/survey/mc?campaignid=discovery&stars=${star}`}
          onMouseEnter={() => setHoveredStars(star)}
          aria-label={`${star} star out of 5`}
          className="p-1.5 rounded-full transition-transform duration-200 hover:scale-125"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-200 ease-in-out ${
              star <= hoveredStars
                ? "text-amber-400 fill-amber-400"
                : "text-white/40"
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
    const filtered = allPopularCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedCompanies(filtered);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />

      <main>
        <div className="relative bg-gradient-to-br from-indigo-700 to-blue-700 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="w-full lg:w-4/5 mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                Find Great Places to Work
              </h1>
              <p className="mt-4 text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto">
                Get insider access to millions of company reviews, salary
                reports, and interview questions.
              </p>

              <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
                <div className="relative rounded-full shadow-2xl shadow-indigo-900/40">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="company-search"
                    type="text"
                    placeholder="Company name or job title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 pl-14 pr-40 text-md bg-white text-slate-800 border-transparent focus:ring-2 focus:ring-indigo-400 rounded-full"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 text-sm font-semibold px-6 rounded-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Find Companies
                  </Button>
                </div>
                <Link
                  to="/career/salaries"
                  className="text-indigo-300 hover:text-white mt-5 inline-block text-sm font-medium transition-colors"
                >
                  Looking for salaries instead?
                </Link>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
                  Popular companies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedCompanies.map((company) => (
                    <Card
                      key={company.name}
                      className="bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className="flex items-start space-x-4">
                            <img
                              src={company.logoUrl}
                              alt={`${company.name} logo`}
                              className="w-16 h-16 rounded-lg border border-slate-100"
                            />
                            <div className="flex-1">
                              <Link to={company.url}>
                                <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors leading-tight">
                                  {company.name}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-sm font-bold text-slate-700">
                                  {company.rating.toFixed(1)}
                                </span>
                                {renderStars(company.rating)}
                                <span className="text-sm text-slate-500 ml-1">
                                  ({company.reviewsCount.toLocaleString()})
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-sm font-medium">
                          <Link
                            to={`${company.url}/salaries`}
                            className="text-slate-600 hover:text-indigo-600 transition-colors"
                          >
                            Salaries
                          </Link>
                          <Link
                            to={`${company.url}/faq`}
                            className="text-slate-600 hover:text-indigo-600 transition-colors"
                          >
                            Q&A
                          </Link>
                          <Link
                            to={`${company.url}/jobs`}
                            className="text-slate-600 hover:text-indigo-600 transition-colors"
                          >
                            Open jobs
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                <Card className="rounded-2xl shadow-xl shadow-indigo-900/10 text-white overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-600">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-white/10 rounded-full mb-4">
                        <Megaphone className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">
                        Do you work here?
                      </h3>
                      <p className="text-indigo-200 mb-6">
                        Help others find their dream job. Rate your company.
                      </p>
                      {renderInteractiveStars()}
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyReviews;