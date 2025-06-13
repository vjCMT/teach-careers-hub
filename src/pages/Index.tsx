import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  FileText,
  Check,
  Bookmark,
  Ban,
  Link as LinkIcon,
  Lightbulb,
  BookOpen,
  Globe,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Component Definitions
interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  backgroundGradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Find Your Dream Teaching Job",
    subtitle: "Connect with Excellence",
    description:
      "Connect with top schools and educational institutions. Discover opportunities that match your skills and passion for teaching.",
    primaryButton: { text: "Browse Jobs", href: "" },
    secondaryButton: { text: "Sign Up Now", href: "/signup" },
    backgroundGradient: "from-indigo-700 to-purple-800",
  },
  {
    id: 2,
    title: "Shape Young Minds",
    subtitle: "Make a Difference",
    description:
      "Join prestigious educational institutions and be part of shaping the future. Find teaching positions that align with your expertise and values.",
    primaryButton: { text: "Explore Opportunities", href: "/post-job" },
    secondaryButton: { text: "Join Today", href: "/signup" },
    backgroundGradient: "from-blue-700 to-indigo-800",
  },
  {
    id: 3,
    title: "Advance Your Career",
    subtitle: "Grow with Purpose",
    description:
      "Take your teaching career to the next level. Connect with schools and institutes that value professional growth and educational excellence.",
    primaryButton: { text: "View Positions", href: "/jobs" },
    secondaryButton: { text: "Get Started", href: "/auth/signup" },
    backgroundGradient: "from-purple-700 to-pink-800",
  },
  {
    id: 4,
    title: "For Educational Institutions",
    subtitle: "Find Quality Educators",
    description:
      "Post your teaching positions and connect with qualified, passionate educators. Build your team with the best teaching talent available.",
    primaryButton: { text: "Post a Job", href: "/auth/signup" },
    secondaryButton: { text: "Learn More", href: "/about" },
    backgroundGradient: "from-green-700 to-teal-800",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`bg-gradient-to-br ${currentSlideData.backgroundGradient} text-white relative transition-all duration-1000 ease-in-out`}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-16 hidden lg:block animate-float-delayed">
            <div className="bg-white rounded-xl shadow-2xl p-1 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Students learning"
                className="w-36 h-42 rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 hidden lg:block animate-float-slow">
            <div className="bg-white rounded-xl shadow-2xl p-1 transform rotate-6 hover:rotate-3 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Classroom"
                className="w-46 h-46 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center min-h-[600px] justify-center z-10">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white text-black font-bold bg-opacity-20 rounded-full text-md backdrop-blur-sm">
              {currentSlideData.subtitle}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            {currentSlideData.title}
          </h1>
          <p className="mt-6 text-xl max-w-3xl leading-relaxed opacity-90">
            {currentSlideData.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to={currentSlideData.primaryButton.href}
              className="px-8 py-4 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {currentSlideData.primaryButton.text}
            </Link>
            <Link
              to={currentSlideData.secondaryButton.href}
              className="px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white hover:text-gray-900 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
            >
              {currentSlideData.secondaryButton.text}
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={goToPrevious}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

const HowWeWork = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How We Work
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Empowering teachers with transparency and trust.
              </p>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Our mission is not just to help teachers find jobs, but to
                support them in their journey from the first step to success. We
                believe in fair practices and long-term impact.
              </p>
              <p className="text-lg">
                That's why we do <strong>not charge any fees upfront</strong>{" "}
                from teachers. Once you are successfully placed and receive your{" "}
                <strong>first salary</strong>, only then we collect our service
                charges. This is what makes us stand out in the industry — we
                grow when you grow.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Join as a Teacher
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Teacher celebrating a new job offer"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">
                    Upfront Fee-Free Placement
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-green-500 text-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <p className="text-lg font-bold">1st Salary</p>
                <p className="text-xs">Then We Charge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Insight {
  name: string;
  required: boolean;
  matched: boolean;
}

interface Job {
  id: number;
  title: string;
  school: string;
  location: string;
  salary: string;
  jobTypeDetails: Insight[];
  schedule: Insight[];
  urgent: boolean;
  easyApply: boolean;
  description: string;
  tags: string[];
  responsibilities: string[];
  qualifications: string[];
  profileInsights: {
    skills: Insight[];
    education: Insight[];
    languages: Insight[];
  };
  benefits: string[];
  employmentType: string;
  experienceRequired: string;
  openings: number;
  interviewProcess: string;
}

const JobDetails = ({ job }: { job: Job }) => {
  const { t } = useTranslation();

  const InsightPill = ({
    text,
    matched,
  }: {
    text: string;
    matched: boolean;
  }) => {
    const baseClasses =
      "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-sm font-medium border";
    const matchedClasses = "bg-green-50 text-green-800 border-green-200";
    const neutralClasses = "bg-gray-100 text-gray-700 border-gray-200";
    return (
      <div
        className={`${baseClasses} ${matched ? matchedClasses : neutralClasses}`}
      >
        {matched && <Check size={16} className="text-green-600" />}
        <span>{text}</span>
      </div>
    );
  };

  const DetailSubSection = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h4 className="font-semibold text-gray-800 text-md">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );

  const SectionWrapper = ({
    title,
    subtitle,
    children,
    isFirst = false,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    isFirst?: boolean;
  }) => (
    <div className={`px-6 py-6 ${!isFirst ? "border-t border-gray-200" : ""}`}>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );

  const JobInfoLine = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex">
      <p className="w-40 flex-shrink-0 font-semibold text-gray-800">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 animate-fadeIn">
      <div className="p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <div className="mt-1">
            <a
              href="#"
              className="text-md font-medium text-primary hover:underline"
            >
              {job.school}
            </a>
            <p className="text-sm text-gray-500 mt-0.5">{job.location}</p>
          </div>
        </div>

        <div className="my-6 flex items-center gap-2">
          <button className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-md">
            {t("homepage.jobCard.applyNow")}
          </button>
          <button className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Ban size={20} />
          </button>
          <button className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <LinkIcon size={20} />
          </button>
        </div>
      </div>

      <SectionWrapper
        title="Profile insights"
        subtitle="Here's how the job qualifications align with your profile."
        isFirst={true}
      >
        <div className="space-y-5">
          <DetailSubSection
            icon={<Lightbulb size={20} className="text-gray-500" />}
            title="Skills"
          >
            {job.profileInsights.skills.map((skill, i) => (
              <InsightPill
                key={i}
                text={`${skill.name} ${skill.required ? "(required)" : ""}`}
                matched={skill.matched}
              />
            ))}
          </DetailSubSection>
          <DetailSubSection
            icon={<BookOpen size={20} className="text-gray-500" />}
            title="Education"
          >
            {job.profileInsights.education.map((edu, i) => (
              <InsightPill
                key={i}
                text={`${edu.name} ${edu.required ? "(required)" : ""}`}
                matched={edu.matched}
              />
            ))}
          </DetailSubSection>
          <DetailSubSection
            icon={<Globe size={20} className="text-gray-500" />}
            title="Languages"
          >
            {job.profileInsights.languages.map((lang, i) => (
              <InsightPill
                key={i}
                text={`${lang.name} ${lang.required ? "(required)" : ""}`}
                matched={lang.matched}
              />
            ))}
          </DetailSubSection>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Job details"
        subtitle="Here's how the job details align with your profile."
      >
        <div className="space-y-5">
          <DetailSubSection
            icon={<Briefcase size={20} className="text-gray-500" />}
            title="Job type"
          >
            {job.jobTypeDetails.map((type, i) => (
              <InsightPill key={i} text={type.name} matched={type.matched} />
            ))}
          </DetailSubSection>
          <DetailSubSection
            icon={<Clock size={20} className="text-gray-500" />}
            title="Shift and schedule"
          >
            {job.schedule.map((item, i) => (
              <InsightPill key={i} text={item.name} matched={item.matched} />
            ))}
          </DetailSubSection>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Location">
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin size={20} className="text-gray-500" />
          <span>{job.location}</span>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Benefits"
        subtitle="Pulled from the full job description"
      >
        <div className="flex flex-wrap gap-2">
          {job.benefits.map((benefit, i) => (
            <span
              key={i}
              className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md"
            >
              {benefit}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Full job description">
        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <div className="space-y-3">
            <JobInfoLine label="Job Title:" value={job.title} />
            <JobInfoLine
              label="Location:"
              value={`${job.location} (On-site)`}
            />
            <JobInfoLine label="Employment Type:" value={job.employmentType} />
            <JobInfoLine
              label="Experience Required:"
              value={job.experienceRequired}
            />
            <JobInfoLine label="Openings:" value={job.openings} />
            <JobInfoLine
              label="Interview Process:"
              value={job.interviewProcess}
            />
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">Job Description:</p>
            <p>{job.description}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">
              Required Skills and Qualifications:
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              {job.qualifications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

// Main Page Component
const Index = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroCarousel />
        <HowWeWork />
        {/* Add other sections as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
