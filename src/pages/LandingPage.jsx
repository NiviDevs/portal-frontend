// src/pages/LandingPage.jsx
import { useEffect, useRef } from 'react'; // Add useRef
import { Link } from "react-router-dom";
import AboutPage from "./AboutPage";

const LandingPage = () => {
        const aboutSectionRef = useRef(null);
    
    // Handle scrolling when navigated to with #about-section
    useEffect(() => {
        if (window.location.hash === '#about-section' && aboutSectionRef.current) {
            // Small delay to ensure DOM is fully rendered
            const timer = setTimeout(() => {
                aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                // Clear hash after scrolling if desired
                // window.location.hash = '';
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []); // Run only on mount
    
    return (
        <>
            {/* Pass necessary props to TopNav if needed, e.g., handleNavigate */}
            {/* <TopNav onNavigate={handleNavigate} />  */}
            {/* Or if TopNav finds the element by ID, you might not need onNavigate yet */}

            <div className="relative h-screen w-full">
                {/* Background */}
                <div className="absolute inset-0 bg-cover bg-center bg-[url('/src/assets/landingbg.webp')] z-0" />

                {/* Blue overlay */}
                <div className="absolute inset-0 bg-blue-900/30 z-10" />
                <div className="absolute inset-0 bg-black/55 z-9" />

                {/* Content */}
                <div className="relative z-20 flex items-center h-full px-6 sm:px-10 md:px-0">
                    <div className="text-[#fff7e3] w-full md:pl-20 md:text-left text-center">
                        {/* pixelate - Sans-serif */}
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight font-sans">
                            pixelate
                        </h1>

                        {/* IMPERIUM 2025 - Serif */}
                        <h2 className="text-6xl sm:text-7xl md:text-8xl font-polt mb-3 leading-tight">
                            IMPERIUM 2025
                        </h2>

                        {/* Subtitle - Serif */}
                        <p className="text-2xl sm:text-3xl font-polt leading-snug mb-6">
                            innovate for inclusion
                        </p>

                        {/* Register button - Serif */}
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

            {/* Wrap AboutPage with ref and id for scrolling */}
            <div ref={aboutSectionRef} id="about-section">
                <AboutPage />
            </div>
        </>
    );
};

export default LandingPage;