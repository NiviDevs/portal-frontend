import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fannedCards from "../assets/fanned-cards.png";
import timelineBg from "../assets/timeline-bg.png";
import NewTopNav from "../components/common/NewTopNav";
import { useTheme } from "../components/theme-provider";

const NewLandingPage = () => {
    // --- Refs for Section Containers ---
    const heroRef = useRef(null);
    const aboutRef = useRef(null);

    // --- State ---
    const [activeSection, setActiveSection] = useState("hero"); // Track which section is in view
    const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());

    // --- Hackathon Logic (Copied from AboutPage) ---
    const HACKATHON_START_DATE = new Date("2025-07-21T09:00:00+05:30");
    const HACKATHON_DURATION_HOURS = 48;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getHackathonProgress = () => {
        const now = new Date();
        const diffMs = now.getTime() - HACKATHON_START_DATE.getTime();
        if (diffMs < 0) {
            return { currentHour: -1, currentDay: 0, isHackathonActive: false };
        }
        const diffHours = diffMs / (1000 * 60 * 60);
        const currentHour = Math.floor(diffHours);
        const currentDay = Math.floor(currentHour / 24) + 1;
        const isHackathonActive = currentHour < HACKATHON_DURATION_HOURS;
        return { currentHour, currentDay, isHackathonActive };
    };

    const { currentHour, currentDay, isHackathonActive } =
        getHackathonProgress();

    const nowHours = currentTime.getHours();
    const nowMinutes = currentTime.getMinutes();
    const nowSeconds = currentTime.getSeconds();
    const currentClockHour = nowHours % 12;
    const hourAngle =
        currentClockHour * 30 + 0.5 * nowMinutes + nowSeconds / 120;

    const timelineEvents = [
        { id: 1, hour: 12, label: "attendance", angle: 0 },
        { id: 2, hour: 1, label: "review", angle: 30 },
        { id: 3, hour: 2, label: "review", angle: 60 },
        { id: 4, hour: 10, label: "review", angle: 300 },
        { id: 5, hour: 11, label: "review", angle: 330 },
    ];

    const getEventPosition = (angle, radius = 45) => {
        const radian = (angle - 90) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(radian);
        const y = 50 + radius * Math.sin(radian);
        return { x, y };
    };

    const scrollToTimeline = () => {
        const timelineElement =
            aboutRef.current?.querySelector("#timeline-section");
        timelineElement?.scrollIntoView({ behavior: "smooth" });
    };    

    useEffect(() => {
        const handleScroll = () => {
            const heroElement = heroRef.current;
            const aboutElement = aboutRef.current;

            if (!heroElement || !aboutElement) return;

            // Get the vertical midpoint of the viewport
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const midViewport = scrollY + viewportHeight / 2;

            // Get element boundaries
            const heroTop = heroElement.offsetTop;
            const heroBottom = heroTop + heroElement.offsetHeight;
            const aboutTop = aboutElement.offsetTop;
            const aboutBottom = aboutTop + aboutElement.offsetHeight;

            // Determine active section based on where the midpoint is
            if (midViewport >= aboutTop && midViewport < aboutBottom) {
                setActiveSection("about");
            } else if (midViewport >= heroTop && midViewport < heroBottom) {
                setActiveSection("hero");
            }
            // If scrolled above or below both, we can keep the last known state
        };

        // Add event listener
        window.addEventListener("scroll", handleScroll);
        // Initial check on mount
        handleScroll();

        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionName) => {
        let targetRef = null;
        if (sectionName === "hero") {
            targetRef = heroRef;
        } else if (sectionName === "about") {
            targetRef = aboutRef;
        }

        if (targetRef?.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen">
            {/* Pass activeSection and scrollToSection to TopNav */}
            <NewTopNav
                activeSection={activeSection}
                onNavigate={scrollToSection}
            />

            {/* Hero Section */}
            <div ref={heroRef} className="relative h-screen w-full">
                {/* Background */}
                <div className="absolute inset-0 bg-cover bg-center bg-[url('/src/assets/landingbg.webp')] z-0" />
                {/* Overlays */}
                <div className="absolute inset-0 bg-blue-900/30 z-10" />
                <div className="absolute inset-0 bg-black/55 z-9" />
                {/* Content */}
                <div className="relative z-30 flex items-center h-full px-6 sm:px-10 md:px-0">
                    <div className="text-[#fff7e3] w-full md:pl-20 md:text-left text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight font-sans">
                            pixelate
                        </h1>
                        <h2 className="text-6xl sm:text-7xl md:text-8xl font-polt mb-3 leading-tight">
                            IMPERIUM 2025
                        </h2>
                        <p className="text-2xl sm:text-3xl font-polt leading-snug mb-6">
                            innovate for inclusion
                        </p>
                        <div className="md:text-left text-center">
                            <Link
                                to="/register"
                                className="inline-block px-4 py-1 border-2 border-[#fff7e3] rounded-xl text-[#fff7e3] font-polt text-xl hover:bg-[#fff7e3] hover:text-blue-900 transition duration-300"
                            >
                                register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section (Content from AboutPage.jsx integrated) */}
            <div
                ref={aboutRef}
                className={`min-h-screen transition-all duration-500 ${
                    theme === "dark"
                        ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-amber-100"
                        : "bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-slate-800"
                }`}
            >
                {/* About Content Section */}
                <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 py-10 lg:py-20 max-w-7xl mx-auto min-h-screen">
                    <div className="flex-1 lg:flex-[2] text-center lg:text-left">
                        <h1
                            className={`font-polt text-4xl md:text-6xl lg:text-7xl mb-6 tracking-wide drop-shadow-2xl ${
                                theme === "dark"
                                    ? "text-amber-300"
                                    : "text-orange-600"
                            }`}
                        >
                            ABOUT IMPERIUM
                        </h1>
                        <div className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto lg:mx-0 text-justify leading-relaxed">
                            <p
                                className={
                                    theme === "dark"
                                        ? "text-amber-100"
                                        : "text-slate-700"
                                }
                            >
                                Imperium is a 48-hour hackathon focused on
                                creating accessible, inclusive digital solutions
                                that redefine how we experience the web.
                                Bringing together passionate developers,
                                designers, and problem-solvers, the event
                                challenges participants to break down digital
                                barriers and build tools that empower every user
                                — regardless of ability. Whether it's through
                                thoughtful UX, assistive tech, or innovative
                                design, Imperium is where impactful technology
                                meets purpose.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 lg:flex-[1] flex flex-col items-center relative w-full lg:w-auto">
                        <div className="relative mb-8">
                            <img
                                src={fannedCards}
                                alt="Fanned Tarot Cards"
                                className="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-full drop-shadow-2xl rounded-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <button
                            type="button"
                            className={`px-6 py-3 font-polt font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 ${
                                theme === "dark"
                                    ? "bg-amber-600 hover:bg-amber-500 text-slate-900"
                                    : "bg-orange-600 hover:bg-orange-500 text-white"
                            }`}
                            onClick={scrollToTimeline}
                        >
                            See Timeline <ArrowDown size={20} />
                        </button>
                    </div>
                </section>

                {/* Timeline Section */}
                {/** biome-ignore lint/nursery/useUniqueElementIds: <i dont give a shi> */}
                <section
                    id="timeline-section"
                    className="text-center py-16 lg:py-24 relative overflow-hidden px-4"
                >
                    <h2
                        className={`font-polt text-4xl md:text-6xl lg:text-7xl mb-10 tracking-wide drop-shadow-2xl ${
                            theme === "dark"
                                ? "text-amber-200"
                                : "text-orange-700"
                        }`}
                    >
                        TIMELINE
                    </h2>
                    <div
                        className={`font-polt text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-md ${
                            theme === "dark"
                                ? "text-amber-100"
                                : "text-slate-700"
                        }`}
                    >
                        DAY {currentDay}
                        {isHackathonActive && (
                            <p className="text-lg mt-2">
                                (Hackathon Hour: {currentHour + 1})
                            </p>
                        )}
                    </div>
                    {/* Clock Container */}
                    <div className="relative w-full max-w-4xl mx-auto aspect-square flex justify-center items-center">
                        <img
                            src={timelineBg}
                            alt="Timeline Background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl opacity-90"
                        />
                        <div
                            className={`absolute inset-0 rounded-full ${
                                theme === "dark"
                                    ? "bg-slate-900 bg-opacity-40"
                                    : "bg-white bg-opacity-30"
                            }`}
                        ></div>
                        <div className="absolute inset-0">
                            {timelineEvents.map((event) => {
                                const position = getEventPosition(event.angle);
                                return (
                                    <div
                                        key={event.id}
                                        className="absolute transition-all duration-300 cursor-pointer"
                                        style={{
                                            left: `${position.x}%`,
                                            top: `${position.y}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                        onMouseEnter={() =>
                                            setHoveredTimeSlot(event.hour)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredTimeSlot(null)
                                        }
                                        // biome-ignore lint/a11y/useSemanticElements: <idc>
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                setHoveredTimeSlot(event.hour);
                                            }
                                        }}
                                        aria-label={`Event at ${event.hour}: ${event.label}`}
                                    >
                                        <div
                                            className={`text-center font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg transition-all duration-300 ${
                                                hoveredTimeSlot === event.hour
                                                    ? `scale-110 ${
                                                          theme === "dark"
                                                              ? "text-amber-200"
                                                              : "text-orange-700"
                                                      }`
                                                    : theme === "dark"
                                                    ? "text-amber-300"
                                                    : "text-orange-600"
                                            }`}
                                        >
                                            <div
                                                className={`text-2xl md:text-3xl lg:text-4xl font-bold ${
                                                    hoveredTimeSlot ===
                                                    event.hour
                                                        ? "animate-pulse"
                                                        : ""
                                                }`}
                                            >
                                                {event.hour}
                                            </div>
                                            <div className="text-sm md:text-base lg:text-lg font-medium">
                                                {event.label}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Clock Hands */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div
                                className={`absolute bottom-1/2 left-1/2 origin-bottom w-2 h-1/3 rounded-full transition-transform duration-1000 ease-out ${
                                    theme === "dark"
                                        ? "bg-amber-400"
                                        : "bg-orange-600"
                                }`}
                                style={{
                                    transform: `translateX(-50%) rotate(${hourAngle}deg)`,
                                }}
                            ></div>
                            <div
                                className={`absolute bottom-1/2 left-1/2 origin-bottom w-1 h-2/5 rounded-full transition-transform duration-500 ${
                                    theme === "dark"
                                        ? "bg-amber-300"
                                        : "bg-orange-500"
                                }`}
                                style={{
                                    transform: `translateX(-50%) rotate(${
                                        nowMinutes * 6
                                    }deg)`,
                                }}
                            ></div>
                            <div
                                className={`absolute w-4 h-4 rounded-full ${
                                    theme === "dark"
                                        ? "bg-amber-400"
                                        : "bg-orange-600"
                                } shadow-lg`}
                            ></div>
                        </div>
                        <div
                            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-xl md:text-2xl lg:text-3xl px-4 py-2 rounded-lg shadow-lg ${
                                theme === "dark"
                                    ? "bg-slate-800 bg-opacity-90 text-amber-300 border border-amber-500"
                                    : "bg-white bg-opacity-90 text-orange-600 border border-orange-300"
                            }`}
                        >
                            {currentTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        </div>
                    </div>
                    <div
                        className={`absolute bottom-8 right-8 lg:bottom-16 lg:right-16 font-polt text-xl md:text-2xl lg:text-3xl drop-shadow-md ${
                            theme === "dark"
                                ? "text-amber-200"
                                : "text-orange-700"
                        }`}
                    >
                        <div className="text-center">
                            DAY 2
                            <br />
                            <span className="text-3xl md:text-4xl lg:text-5xl">
                                ☀️
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NewLandingPage;
