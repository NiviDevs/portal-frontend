import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
// ✅ Local image imports
import fannedCards from "../assets/fanned-cards.png";
import timelineBg from "../assets/timeline-bg.png";
import { useTheme } from "../components/theme-provider";

const AboutPage = () => {
    const timelineRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { theme } = useTheme();
    const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
    
    // Move constant outside component or memoize it to prevent recreation
    const HACKATHON_START_DATE = useMemo(() => new Date("2025-07-21T09:00:00+05:30"), []);
    const HACKATHON_DURATION_HOURS = 48;
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []); // Empty dependency array is fine here

    const scrollToTimeline = () => {
        timelineRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Memoize this function since it's used in useMemo
    const getEventPosition = useCallback((angle, radius = 45) => {
        const radian = (angle - 90) * (Math.PI / 180);
        const x = 50 + radius * Math.cos(radian);
        const y = 50 + radius * Math.sin(radian);
        return { x, y };
    }, []);

    // Memoize the hackathon progress calculation
    const hackathonProgress = useMemo(() => {
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
    }, [HACKATHON_START_DATE]); // HACKATHON_DURATION_HOURS is a constant number, so no need to include

    const { currentHour, currentDay, isHackathonActive } = hackathonProgress;

    const nowHours = currentTime.getHours();
    const nowMinutes = currentTime.getMinutes();
    const nowSeconds = currentTime.getSeconds();
    const currentClockHour = nowHours % 12;
    const hourAngle = currentClockHour * 30 + 0.5 * nowMinutes + nowSeconds / 120;
    
    // Define timeline events with IDs
    const timelineEvents = useMemo(() => [
        { id: 1, hour: 12, label: "attendance", angle: 0 },
        { id: 2, hour: 1, label: "review", angle: 30 },
        { id: 3, hour: 2, label: "review", angle: 60 },
        { id: 4, hour: 10, label: "review", angle: 300 },
        { id: 5, hour: 11, label: "review", angle: 330 },
    ], []);

    // Memoize events with positions
    const timelineEventsWithPositions = useMemo(() => 
        timelineEvents.map(event => ({
            ...event,
            position: getEventPosition(event.angle)
        })),
        [timelineEvents, getEventPosition]
    );

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${
                theme === "dark"
                    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-amber-100"
                    : "bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-slate-800"
            }`}
        >
            {/* About Section */}
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
            <section
                ref={timelineRef}
                className="text-center py-16 lg:py-24 relative overflow-hidden px-4"
            >
                <h2
                    className={`font-polt text-4xl md:text-6xl lg:text-7xl mb-10 tracking-wide drop-shadow-2xl ${
                        theme === "dark" ? "text-amber-200" : "text-orange-700"
                    }`}
                >
                    TIMELINE
                </h2>
                <div
                    className={`font-polt text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-md ${
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
                        {/* Use the memoized events with positions */}
                        {timelineEventsWithPositions.map((eventData) => (
                            <div
                                key={eventData.id} // Use proper ID
                                className="absolute transition-all duration-300 cursor-pointer"
                                style={{
                                    left: `${eventData.position.x}%`,
                                    top: `${eventData.position.y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                                onMouseEnter={() =>
                                    setHoveredTimeSlot(eventData.hour)
                                }
                                onMouseLeave={() =>
                                    setHoveredTimeSlot(null)
                                }
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" ||
                                        e.key === " "
                                    ) {
                                        setHoveredTimeSlot(eventData.hour);
                                    }
                                }}
                                aria-label={`Event at ${eventData.hour}: ${eventData.label}`}
                            >
                                <div
                                    className={`text-center font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg transition-all duration-300 ${
                                        hoveredTimeSlot === eventData.hour
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
                                            hoveredTimeSlot === eventData.hour
                                                ? "animate-pulse"
                                                : ""
                                        }`}
                                    >
                                        {eventData.hour}
                                    </div>
                                    <div className="text-sm md:text-base lg:text-lg font-medium">
                                        {eventData.label}
                                    </div>
                                </div>
                            </div>
                        ))}
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