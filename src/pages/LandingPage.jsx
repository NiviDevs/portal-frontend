import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/imperium-bg.png"; // Check path is correct

const LandingPage = () => {
    return (
        <div className="relative h-screen w-full">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Blue overlay */}
            <div className="absolute inset-0 bg-blue-950/60 z-10" />

            {/* Content */}
            <div className="relative z-20 flex items-center h-full px-6 sm:px-10 md:px-0">
                <div className="text-white w-full md:pl-20 md:text-left text-center">
                    {/* pixelate - Sans-serif */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight font-sans">
                        pixelate
                    </h1>

                    {/* IMPERIUM 2025 - Serif */}
                    <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold mb-3 leading-tight">
                        IMPERIUM 2025
                    </h2>

                    {/* Subtitle - Serif */}
                    <p className="text-2xl sm:text-3xl font-serif leading-snug mb-6">
                        innovate for inclusion
                    </p>

                    {/* Register button - Serif */}
                    <div className="md:text-left text-center">
                        <Link
                            to="/register"
                            className="inline-block px-8 py-3 border border-white rounded-full text-white font-serif text-lg hover:bg-white hover:text-blue-900 transition duration-300"
                        >
                            register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

