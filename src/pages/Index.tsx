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
                That’s why we do <strong>not charge any fees upfront</strong>{" "}
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

  const jobs: Job[] = [
    {
      id: 1,
      title: "TGT Geography",
      school: "City Children's Academy",
      location: "Chhibramau, Uttar Pradesh",
      salary: "₹30,000 - ₹35,000 a month",
      employmentType: "Full-Time",
      experienceRequired: "2 Years",
      openings: 1,
      interviewProcess: "Walk-in & Online",
      jobTypeDetails: [
        { name: "Full-time", required: true, matched: true },
        { name: "Permanent", required: false, matched: true },
      ],
      schedule: [
        { name: "Day shift", required: true, matched: true },
        { name: "Monday to Friday", required: true, matched: false },
      ],
      urgent: true,
      easyApply: true,
      description:
        "We are seeking a passionate and qualified TGT Geography teacher to join our dedicated team. The ideal candidate will have strong knowledge of geographical concepts and the ability to engage students effectively in a positive and dynamic classroom environment.",
      tags: ["Social Studies", "Geography", "CBSE"],
      responsibilities: [
        "Develop and implement engaging lesson plans.",
        "Assess and evaluate student performance.",
        "Maintain a disciplined and supportive classroom.",
        "Collaborate with colleagues and parents.",
        "Participate in school events and activities.",
      ],
      qualifications: [
        "Bachelor's degree in Geography.",
        "B.Ed or equivalent teaching certification.",
        "Minimum 2 years of teaching experience.",
        "Excellent communication and interpersonal skills.",
      ],
      profileInsights: {
        skills: [
          { name: "Teaching", required: true, matched: true },
          { name: "Classroom Management", required: true, matched: true },
          { name: "Lesson Planning", required: true, matched: false },
        ],
        education: [
          { name: "Bachelor's Degree", required: true, matched: true },
        ],
        languages: [{ name: "English", required: true, matched: true }],
      },
      benefits: ["Health insurance", "Provident Fund", "Paid time off"],
    },
    {
      id: 2,
      title: "PGT Physics",
      school: "Delhi Public School",
      location: "New Delhi, Delhi",
      salary: "₹45,000 - ₹55,000 a month",
      employmentType: "Full-Time",
      experienceRequired: "3-5 Years",
      openings: 2,
      interviewProcess: "Scheduled Online Interview",
      jobTypeDetails: [
        { name: "Full-time", required: true, matched: true },
        { name: "Permanent", required: false, matched: true },
      ],
      schedule: [{ name: "Day shift", required: true, matched: true }],
      urgent: false,
      easyApply: true,
      description:
        "Join our esteemed institution as a PGT Physics teacher and inspire the next generation of scientists. We offer excellent facilities, a collaborative work environment, and opportunities for professional growth.",
      tags: ["Physics", "Senior Secondary", "Science"],
      responsibilities: [
        "Teach Physics to classes XI and XII.",
        "Prepare students for board examinations and competitive tests.",
        "Manage and maintain physics laboratory equipment.",
        "Conduct practical sessions and experiments.",
      ],
      qualifications: [
        "Master's degree in Physics.",
        "B.Ed. is mandatory.",
        "Proven experience as a PGT Physics teacher.",
        "In-depth knowledge of the CBSE curriculum.",
      ],
      profileInsights: {
        skills: [
          { name: "Physics", required: true, matched: true },
          { name: "Lab Management", required: true, matched: false },
        ],
        education: [{ name: "Master's Degree", required: true, matched: true }],
        languages: [{ name: "English", required: true, matched: true }],
      },
      benefits: ["Life insurance", "Commuter benefits"],
    },
    {
      id: 3,
      title: "Primary School Teacher",
      school: "St. Mary's Convent School",
      location: "Mumbai, Maharashtra",
      salary: "From ₹35,000 a month",
      employmentType: "Full-Time",
      experienceRequired: "1-2 Years",
      openings: 3,
      interviewProcess: "Walk-in Only",
      jobTypeDetails: [{ name: "Full-time", required: true, matched: true }],
      schedule: [{ name: "Morning shift", required: true, matched: true }],
      urgent: true,
      easyApply: false,
      description:
        "We are looking for a dedicated and creative Primary School Teacher who can create a nurturing and stimulating learning environment for young learners. You will be responsible for teaching all subjects to students in grades 1-3.",
      tags: ["Primary School", "All Subjects", "ICSE"],
      responsibilities: [
        "Create a fun and interactive learning atmosphere.",
        "Teach basic literacy, numeracy, and other subjects.",
        "Monitor the social and emotional development of children.",
        "Communicate effectively with parents about student progress.",
      ],
      qualifications: [
        "Graduate with a Diploma in Elementary Education (D.El.Ed).",
        "Experience working with young children is preferred.",
        "Patient, energetic, and creative personality.",
        "Strong classroom management skills.",
      ],
      profileInsights: {
        skills: [
          { name: "Child Development", required: true, matched: true },
          { name: "Creativity", required: true, matched: true },
        ],
        education: [{ name: "D.El.Ed", required: true, matched: false }],
        languages: [{ name: "English", required: true, matched: true }],
      },
      benefits: ["School lunch", "Professional development"],
    },
  ];

  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0]);
  const [activeTab, setActiveTab] = useState("for-you");
  const [searchWhat, setSearchWhat] = useState("");
  const [searchWhere, setSearchWhere] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { searchWhat, searchWhere });
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <HeroCarousel />
      <HowWeWork />
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight animate-fadeInUp">
            {
              t("homepage.hero.title").split(
                t("homepage.hero.titleHighlight")
              )[0]
            }
            <span className="text-primary">
              {t("homepage.hero.titleHighlight")}
            </span>
            {
              t("homepage.hero.title").split(
                t("homepage.hero.titleHighlight")
              )[1]
            }
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            {t("homepage.hero.subtitle")}
          </p>
          <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto mt-10 animate-fadeInUp animation-delay-400"
          >
            <div className="flex flex-col md:flex-row gap-2 md:bg-white md:p-2 md:rounded-lg md:shadow-md md:border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("homepage.hero.searchPlaceholder.what")}
                  value={searchWhat}
                  onChange={(e) => setSearchWhat(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 py-3 border border-gray-300 rounded-lg md:border-none focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="hidden md:block border-l border-gray-200"></div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("homepage.hero.searchPlaceholder.where")}
                  value={searchWhere}
                  onChange={(e) => setSearchWhere(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 py-3 border border-gray-300 rounded-lg md:border-none focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
              >
                {t("homepage.hero.findJobs")}
              </button>
            </div>
          </form>
          <div className="mt-8 text-sm space-x-6 animate-fadeInUp animation-delay-600">
            <Link
              to="/post-resume"
              className="text-primary hover:underline font-medium"
            >
              {t("homepage.hero.postResume")}
            </Link>
            <Link
              to="/employers"
              className="text-primary hover:underline font-medium"
            >
              {t("homepage.hero.employers")}
            </Link>
          </div>
        </div>
      </section>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("for-you")}
              className={`px-4 py-3 font-semibold transition-colors text-base ${
                activeTab === "for-you"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t("homepage.tabs.forYou")}
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-4 py-3 font-semibold transition-colors text-base ${
                activeTab === "recent"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t("homepage.tabs.recent")}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
            {/* === CHANGE HERE: Increased height === */}
            <div className="lg:col-span-5 space-y-4 lg:h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-4">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-slideInLeft"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    onClick={() => handleJobClick(job)}
                    className={`bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-lg transform hover:-translate-y-1 ${
                      selectedJob?.id === job.id
                        ? "border-primary shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="p-5">
                      {job.urgent && (
                        <div className="mb-3">
                          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                            {t("homepage.jobCard.urgentHiring")}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 hover:text-primary">
                        {job.title}
                      </h3>
                      <p className="text-md font-semibold text-gray-700 mt-1">
                        {job.school}
                      </p>
                      <p className="text-sm text-gray-500">{job.location}</p>

                      <div className="mt-4 space-y-1 text-sm text-gray-600">
                        <p>{job.salary}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {job.easyApply && (
                        <div className="flex items-center text-green-600 text-sm font-semibold mt-4">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          {t("homepage.jobCard.easyApply")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:hidden mt-2">
                    {selectedJob?.id === job.id && (
                      <JobDetails job={selectedJob} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* === CHANGE HERE: Increased height === */}
            <div className="hidden lg:block lg:col-span-7 lg:h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-4">
              {selectedJob ? (
                <JobDetails job={selectedJob} />
              ) : (
                <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center h-[500px] flex flex-col justify-center items-center animate-fadeIn">
                  <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("homepage.jobDetails.selectJob")}
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    {t("homepage.jobDetails.selectJobDescription")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
