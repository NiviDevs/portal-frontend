import React, { useRef, useState } from "react";
import Timeline from "../components/common/Timeline.jsx";

import { RainbowButton } from "../components/magicui/rainbow-button.jsx";


const AboutPage = () => {
    const [showTimeline, setShowTimeline] = useState(false);
    const timelineRef = useRef(null);

    const handleShowTimeline = () => {
        setShowTimeline(true);
        setTimeout(() => {
            timelineRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleBack = () => {
        setShowTimeline(false);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0f1a28] to-[#1c2b3e] flex flex-col items-center justify-center px-1 py-4">
            {!showTimeline ? (
                <>
                    <div className="max-w-xl w-full flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex flex-col items-center">
                            <img
                                src="/tarot-cards.png"
                                alt="Tarot Cards"
                                className="w-full max-w-[160px] h-auto object-contain"
                            />
                            <RainbowButton
                                className="mt-3 px-4 py-1 text-base font-semibold rounded-full bg-gradient-to-r from-[#f0c084] to-[#f4d6c6] text-[#1c2b3e] shadow-lg hover:scale-105 transition-transform magic-pulse"
                                onClick={handleShowTimeline}
                            >
                                View Timeline 
                            </RainbowButton>
                        </div>
                        <div className="flex-1 mt-3 md:mt-0">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide font-serif text-[#E6E1DC]">
                                ABOUT IMPERIUM
                            </h2>
                            <p className="text-base md:text-lg leading-snug font-light text-[#f0c084]">
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
                </>
            ) : (
                <div
                    ref={timelineRef}
                    className="w-full flex flex-col items-center justify-center mt-3 magic-fadeInUp"
                >
                    <RainbowButton
                        className="mb-2 px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-[#f0c084] to-[#f4d6c6] text-[#1c2b3e] shadow hover:scale-105 transition-transform"
                        onClick={handleBack}
                    >
                        ← Back to About
                    </RainbowButton>
                    <div className="w-full flex justify-center">
                        <Timeline
                            className="w-full"
                            style={{
                                maxWidth: "340px",
                                minHeight: "220px",
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutPage;


