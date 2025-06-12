import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ExternalLink, Briefcase, FileText, MessageSquare, Bell, UserCircle, Star, Linkedin, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";



const IconWrapper = ({ colorClass, children }) => (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colorClass}`}>
        {children}
    </div>
);

const ArticleCard = ({ article }) => (
    <a href="#" className="block group bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="p-6">
            <IconWrapper colorClass={article.color}>
                {article.illustration}
            </IconWrapper>
            <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2 group-hover:text-indigo-600 transition-colors">{article.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{article.description}</p>
            <div className="mt-4">
                <span className="font-semibold text-indigo-600 flex items-center gap-2">
                    Read article
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </div>
    </a>
);


const CareerGuidePage = () => {
    const [activeTab, setActiveTab] = useState("career-guide");
    const [activeSubTab, setActiveSubTab] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const mainNav = [
        { id: "finding-a-job", label: "Finding a Job" },
        {
            id: "resumes-cover-letters",
            label: "Resumes & Cover Letters",
            subTabs: [
                { id: 'resumes-cover-letters', label: 'Resume & Cover Letter Articles' },
                { id: 'resume-samples', label: 'Resume Samples' },
                { id: 'cover-letter-samples', label: 'Cover Letter Samples' },
            ]
        },
        { id: "interviewing", label: "Interviewing" },
        { id: "pay-salary", label: "Pay & Salary" },
        {
            id: "career-development",
            label: "Career Development",
            subTabs: [
                { id: 'career-development', label: 'Career Development Articles' },
                { id: 'starting-a-new-job', label: 'Starting a New Job' }
            ]
        },
    ];

    const pageData = {
        "career-guide": { title: "Career Guide", subtitle: "Your one-stop resource for career advice, from job searching to professional development." },
        "finding-a-job": { title: "Finding a Job", subtitle: "Career ideas and guidance to pick the right role for you." },
        "resumes-cover-letters": { title: "Resumes & Cover Letters", subtitle: "Professional templates and examples to create standout applications." },
        "resume-samples": { title: "Resume Samples and Examples", subtitle: "Writing a great resume is a crucial step in your job search. Browse our selection of resume samples to get started." },
        "cover-letter-samples": { title: "Cover Letter Samples", subtitle: "Find inspiration for your own cover letter with our professional samples." },
        "interviewing": { title: "Interviewing", subtitle: "Common questions, answers and advice to help you prepare." },
        "pay-salary": { title: "Pay & Salary", subtitle: "Data and tips for talking about money at work." },
        "career-development": { title: "Career Development", subtitle: "Skills and steps to take your career to the next level." },
        "starting-a-new-job": { title: "Starting a New Job", subtitle: "Best practices to make a strong impression and transition smoothly." }
    };

    const articles = [
        { id: 1, category: 'finding-a-job', title: 'How To Write A Job Application Letter', description: 'Make a positive impression on recruiters and increase your chances of being shortlisted for an interview.', illustration: <FileText size={32} className="text-pink-800" />, color: 'bg-pink-100' },
        { id: 2, category: 'finding-a-job', title: 'Career Options in Humanities', description: 'Explore different career options in humanities and their scope, and learn about the highest-paying jobs.', illustration: <Briefcase size={32} className="text-fuchsia-800" />, color: 'bg-fuchsia-100' },
        { id: 3, category: 'finding-a-job', title: 'Top 10 Careers After BBA', description: 'Review a list of the top 10 types of careers after a Bachelor of Business Administration (BBA).', illustration: <Star size={32} className="text-purple-800" />, color: 'bg-purple-100' },
        { id: 4, category: 'interviewing', title: 'Top 16 Interview Questions and Answers', description: 'Tips and example answers for common interview questions to help you leave a lasting impression.', illustration: <MessageSquare size={32} className="text-indigo-800" />, color: 'bg-indigo-100' },
        { id: 5, category: 'interviewing', title: 'How To Prepare for a Job Interview', description: 'Interview preparation primarily involves researching the job and the company and thoughtfully considering your answers.', illustration: <UserCircle size={32} className="text-orange-800" />, color: 'bg-orange-100' },
        { id: 6, category: 'interviewing', title: 'A Detailed Guide To Mock Interview Preparation', description: 'Learn how to excel in job interviews with mock interview preparation. Discover tips for practicing and improving confidence.', illustration: <FileText size={32} className="text-blue-800" />, color: 'bg-blue-100' },
        { id: 7, category: 'pay-salary', title: 'Salary Negotiation Tips And Examples', description: 'Knowing how to negotiate salary offers is a valuable skill that can increase your earning potential.', illustration: <UserCircle size={32} className="text-teal-800" />, color: 'bg-teal-100' },
        { id: 8, category: 'pay-salary', title: 'How To Write A Request Letter For Salary', description: 'Discover how to write a request letter for salary, and look at templates and examples.', illustration: <FileText size={32} className="text-amber-800" />, color: 'bg-amber-100' },
        { id: 9, category: 'pay-salary', title: 'How To Write A Salary Increment Letter', description: 'Learn how to write an effective salary increment letter, including key tips, timing, and what to include.', illustration: <FileText size={32} className="text-sky-800" />, color: 'bg-sky-100' },
        { id: 10, category: 'career-development', title: '50 Self-Appraisal Comments For Reviews', description: 'Discover 50 sample self-appraisal comments you can reference for your next performance review.', illustration: <Star size={32} className="text-rose-800" />, color: 'bg-rose-100' },
        { id: 11, category: 'starting-a-new-job', title: 'How To Write A Job Offer Acceptance Letter', description: 'We discuss how to write a job offer acceptance letter and also present a template and sample letter.', illustration: <FileText size={32} className="text-violet-800" />, color: 'bg-violet-100' },
        { id: 12, category: 'starting-a-new-job', title: 'How To Write A Joining Date Email to HR', description: 'Learn how to write a joining date confirmation email with this guide, template, and confirmation email.', illustration: <Star size={32} className="text-purple-800" />, color: 'bg-purple-100' },
        { id: 13, category: 'starting-a-new-job', title: 'How To Apply For An Internship', description: 'Examine a step-by-step guide on how to apply for an internship and why they are important.', illustration: <Briefcase size={32} className="text-cyan-800" />, color: 'bg-cyan-100' },
        { id: 14, category: 'resumes-cover-letters', title: 'How to Make a Resume (With Examples)', description: 'Learn how to make a resume that is tailored to the job you are applying for and stands out.', illustration: <FileText size={32} className="text-lime-800" />, color: 'bg-lime-100' },
        { id: 15, category: 'resumes-cover-letters', title: '10 Best Skills to Include on a Resume', description: 'Learn how to highlight 10 of the best skills that employers look for on your resume.', illustration: <Star size={32} className="text-emerald-800" />, color: 'bg-emerald-100' },
        { id: 16, category: 'resumes-cover-letters', title: 'How to Write a Resume Headline (With Examples)', description: 'Here are some tips and resume title examples to help make sure your headline captivates recruiters.', illustration: <UserCircle size={32} className="text-green-800" />, color: 'bg-green-100' },
    ];

    // The Indeed HTML source shows these specific articles as "Editor's Picks"
    const editorPicks = [articles[4], articles[5], articles[15]];

    const resumeSamples = [
        "Accountant", "Accounts Payable", "Administrative Assistant", "Android Developer", "Architect", "Business Analyst", "Cashier", "Civil Engineer", "Content Writer", "Data Analyst", "Graphic Designer", "HR Manager", "iOS Developer", "Java Developer", "Marketing Manager", "Mechanical Engineer", "Nurse", "Operations Manager", "Product Manager", "Project Manager", "Sales Representative", "Software Engineer", "Web Developer"
    ];

    const currentContentKey = activeSubTab || activeTab;
    const currentContentData = pageData[currentContentKey] || {};
    let articlesForCurrentTab = articles.filter(a => a.category === currentContentKey);
    // On the main Resumes page, show articles from all sub-categories
    if (currentContentKey === 'resumes-cover-letters') {
        articlesForCurrentTab = articles.filter(a => a.category.includes('resumes') || a.category.includes('cover-letter'));
    }


    const handleTabClick = (tabId, subTabId = null) => {
        setActiveTab(tabId);
        const targetTab = mainNav.find(t => t.id === tabId);
        if (subTabId) {
            setActiveSubTab(subTabId);
        } else if (targetTab && targetTab.subTabs) {
            setActiveSubTab(targetTab.subTabs[0].id);
        } else {
            setActiveSubTab(null);
        }
        setOpenDropdown(null);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        setActiveTab("career-guide");
        setActiveSubTab(null);
        setOpenDropdown(null);
    }

    const handleDropdownToggle = (tabId) => {
        setOpenDropdown(openDropdown === tabId ? null : tabId);
    };

    const handleSubTabClick = (e, tabId, subTabId) => {
        e.preventDefault();
        e.stopPropagation();
        handleTabClick(tabId, subTabId);
    };

    const CategorySection = ({ categoryId }) => {
        const categoryData = pageData[categoryId];
        const categoryArticles = articles.filter(a => a.category === categoryId).slice(0, 3); // Get first 3 articles for the section

        return (
            <div className="py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{categoryData.title}</h2>
                    <p className="text-lg text-slate-600 mb-8">{categoryData.subtitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categoryArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                    <div className="mt-8 text-right">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick(categoryId) }} className="font-semibold text-indigo-600 hover:text-indigo-800">
                            See more articles about {categoryData.title.toLowerCase()} <ArrowRight className="inline w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const renderHomePage = () => {
        // These are the specific articles shown as "Editor's Picks" in the image.
        // I've added a placeholder `imageUrl` property to match the image format.
        const editorPicks = [
            { id: 5, category: 'Interviewing', title: 'How To Prepare for a Job Interview', description: 'Interview preparation primarily involves researching the job and the company and thoughtfully considering your answers to the interview questions.', imageUrl: 'https://images.ctfassets.net/pdf29us7flmy/2vZ6G4CQ8zv5bUOPHZr3i6/eb344d5e9b8528ef86f0dee3df0bab4f/5.svg' },
            { id: 6, category: 'Interviewing', title: 'A Detailed Guide To Mock Interview Preparation', description: 'Learn how to excel in job interviews with mock interview preparation. Discover tips for practicing, improving confidence, and mastering interview skills.', imageUrl: 'https://images.ctfassets.net/pdf29us7flmy/VqqQtH1Vtk54vHA3uvr2H/15febfbca04cd95b4e7fa5fe86c43793/1.svg' },
            { id: 16, category: 'Resumes & Cover Letters', title: 'How to Write a Resume Headline (With Examples)', description: 'Here are some tips and resume title examples to help make sure your headline captivates recruiters and hiring managers, and keeps them reading your resume.', imageUrl: 'https://images.ctfassets.net/pdf29us7flmy/2XAnFpDVJMCDx8sI4ftUZS/1208b97edba8f6c7f55cf36e1adc030e/resume-cover-letter-hero.svg' },
        ];

        // This card is for the sections on the white background (Editor's Picks, etc.)
        const HomePageArticleCard = ({ article }) => (
            <a href="#" className="block group text-left">
                <div className="overflow-hidden rounded-lg mb-4 h-40 bg-gray-200 shadow-md">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{article.category}</p>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600">
                    {article.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {article.description}
                </p>
            </a>
        );

        return (
            <>
                {/* Hero Section */}
                <div className="bg-[#0d2d5e] relative overflow-hidden">
                    {/* Decorative angled shapes for the background */}
                    <div className="absolute inset-0 z-0 opacity-10">
                        <div className="absolute bg-white transform rotate-[-12deg] -translate-x-1/4 -translate-y-1/4 h-[200%] w-1/2"></div>
                        <div className="absolute bg-white transform rotate-[-12deg] translate-x-1/4 translate-y-1/4 h-[200%] w-1/2 right-0 bottom-0"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            <span className="font-light">Indeed</span>
                            <br />
                            Career Guide
                        </h1>
                    </div>
                </div>

                {/* Content Section on white background */}
                <div className="bg-white">
                    {/* Editor's Picks Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-left">
                            Editor's Picks
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {editorPicks.map(article => (
                                <HomePageArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>

                    {/* The rest of the category sections will render below Editor's Picks */}
                    {mainNav.map(navItem => {
                        if (navItem.id === 'career-guide') return null; // Already handled
                        const categoryId = navItem.subTabs ? navItem.subTabs[0].id : navItem.id;
                        return <CategorySection key={categoryId} categoryId={categoryId} />;
                    })}
                </div>
            </>
        );
    };

    const renderContentPage = () => {
        const parentTab = mainNav.find(t => t.id === activeTab);

        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <p className="text-sm text-slate-500 mb-2 font-medium">
                        <a href="#" onClick={handleLogoClick} className="hover:text-indigo-600">Career Guide</a>
                        {parentTab && parentTab.id !== 'career-guide' && (
                            <>
                                <span className="mx-2">/</span>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick(parentTab.id) }} className="hover:text-indigo-600">{parentTab.label}</a>
                            </>
                        )}
                        {activeSubTab && activeSubTab !== parentTab.id && (
                            <>
                                <span className="mx-2">/</span>
                                <span>{pageData[activeSubTab].title}</span>
                            </>
                        )}
                    </p>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{currentContentData.title}</h1>
                    {currentContentData.subtitle && <p className="text-lg text-slate-600 max-w-4xl">{currentContentData.subtitle}</p>}
                </div>

                {currentContentKey === 'resume-samples' ? (
                    <div className="bg-white p-8 rounded-xl border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Resume Samples by Job Title</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
                            {resumeSamples.map(sample => (
                                <li key={sample}>
                                    <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline font-medium group">
                                        {sample}
                                        <ExternalLink className="w-4 h-4 ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {articlesForCurrentTab.length > 0 ? (
                                articlesForCurrentTab.map(article => (
                                    <ArticleCard key={article.id} article={article} />
                                ))
                            ) : (
                                <p className="text-slate-600 md:col-span-3">No articles found for this category.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        );
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <Header />
            <div className="flex-grow">
                <div className="bg-blue-800 sticky top-0 z-40" ref={navRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-start items-center">
                            <a href="#" onClick={handleLogoClick} className="mr-8 py-4">
                                <span className="font-bold text-white text-lg">Career Guide</span>
                            </a>
                            <nav className="hidden md:flex items-center space-x-1">
                                {mainNav.map(tab => (
                                    <div key={tab.id} className="relative">
                                        <button
                                            onClick={() => tab.subTabs ? handleDropdownToggle(tab.id) : handleTabClick(tab.id)}
                                            className={`flex items-center text-sm font-medium px-3 py-4 text-white transition-colors duration-200
                                            ${activeTab === tab.id
                                                    ? 'bg-blue-900'
                                                    : 'hover:bg-blue-700'}`
                                            }
                                        >
                                            {tab.label}
                                            {tab.subTabs && <ChevronDown className={`w-5 h-5 ml-1 transition-transform duration-200 ${openDropdown === tab.id ? 'rotate-180' : ''}`} />}
                                        </button>
                                        {tab.subTabs && openDropdown === tab.id && (
                                            <div className="absolute left-0 mt-1 w-60 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                                                {tab.subTabs.map(subTab => (
                                                    <a
                                                        key={subTab.id}
                                                        href="#"
                                                        onClick={(e) => handleSubTabClick(e, tab.id, subTab.id)}
                                                        className={`block px-4 py-2 text-sm transition-colors ${activeSubTab === subTab.id ? 'font-semibold text-indigo-600 bg-indigo-50' : 'text-slate-700'} hover:bg-slate-100`}
                                                    >
                                                        {subTab.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {activeTab === 'career-guide' ? renderHomePage() : renderContentPage()}
            </div>
            <Footer />
        </div>
    );
};

export default CareerGuidePage;