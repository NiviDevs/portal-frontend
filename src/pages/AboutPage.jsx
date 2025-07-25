import React, { useRef, useEffect, useState } from "react";
import { ArrowDown, Moon, Sun } from "lucide-react";

// ✅ Local image imports
import fannedCards from "../assets/fanned-cards.png";
import timelineBg from "../assets/timeline-bg.png";
import { useTheme } from "../components/theme-provider";

const AboutPage = () => {
    const timelineRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const {theme , setTheme} = useTheme();
    const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
    const HACKATHON_START_DATE = new Date("2025-07-21T09:00:00+05:30");
    const HACKATHON_DURATION_HOURS = 48;
    const isDark = theme === "dark";
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToTimeline = () => {
        timelineRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
        { hour: 12, label: "attendance", angle: 0 },
        { hour: 1, label: "review", angle: 30 },
        { hour: 2, label: "review", angle: 60 },
        { hour: 10, label: "review", angle: 300 },
        { hour: 11, label: "review", angle: 330 },
    ];

    const getEventPosition = (angle, radius = 45) => {
        const radian = (angle - 90) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(radian);
        const y = 50 + radius * Math.sin(radian);
        return { x, y };
    };

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${
                theme === "dark"
                    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-amber-100"
                    : "bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-slate-800"
            }`}
        >
            {/* Dark/Light Mode Toggle */}
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
                    theme === "dark"
                        ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                        : "bg-slate-700 text-amber-100 hover:bg-slate-600"
                } shadow-lg hover:scale-110`}
            >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* About Section */}
            <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 py-10 lg:py-20 max-w-7xl mx-auto min-h-screen">
                <div className="flex-1 lg:flex-[2] text-center lg:text-left">
                    <h1
                        className={`font-serif text-4xl md:text-6xl lg:text-7xl mb-6 tracking-wide drop-shadow-2xl ${
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
                            Imperium is a 48-hour hackathon focused on creating
                            accessible, inclusive digital solutions that
                            redefine how we experience the web. Bringing
                            together passionate developers, designers, and
                            problem-solvers, the event challenges participants
                            to break down digital barriers and build tools that
                            empower every user — regardless of ability. Whether
                            it's through thoughtful UX, assistive tech, or
                            innovative design, Imperium is where impactful
                            technology meets purpose.
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
                        className={`px-6 py-3 font-serif font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 ${
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
            <section
                ref={timelineRef}
                className="text-center py-16 lg:py-24 relative overflow-hidden px-4"
            >
                <h2
                    className={`font-serif text-4xl md:text-6xl lg:text-7xl mb-10 tracking-wide drop-shadow-2xl ${
                        theme === "dark" ? "text-amber-200" : "text-orange-700"
                    }`}
                >
                    TIMELINE
                </h2>

                <div
                    className={`font-serif text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-md ${
                        theme === "dark" ? "text-amber-100" : "text-slate-700"
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
                        {timelineEvents.map((event, index) => {
                            const position = getEventPosition(event.angle);
                            return (
                                <div
                                    key={index}
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
                                                hoveredTimeSlot === event.hour
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
                                theme === "dark" ? "bg-amber-400" : "bg-orange-600"
                            }`}
                            style={{
                                transform: `translateX(-50%) rotate(${hourAngle}deg)`,
                            }}
                        ></div>

                        <div
                            className={`absolute bottom-1/2 left-1/2 origin-bottom w-1 h-2/5 rounded-full transition-transform duration-500 ${
                                theme === "dark" ? "bg-amber-300" : "bg-orange-500"
                            }`}
                            style={{
                                transform: `translateX(-50%) rotate(${
                                    nowMinutes * 6
                                }deg)`,
                            }}
                        ></div>

                        <div
                            className={`absolute w-4 h-4 rounded-full ${
                                theme === "dark" ? "bg-amber-400" : "bg-orange-600"
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
                    className={`absolute bottom-8 right-8 lg:bottom-16 lg:right-16 font-serif text-xl md:text-2xl lg:text-3xl drop-shadow-md ${
                        theme === "dark" ? "text-amber-200" : "text-orange-700"
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
    );
};

export default AboutPage;







