import { useEffect, useState } from "react";
import backgroundImage from "../../assets/timeline-bg.png";

const Timeline = () => {
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Customize your schedule here (24-hr format)
    const hours = [
        { hour: 10, label: "review" },
        { hour: 11, label: "review" },
        { hour: 12, label: "attendance" },
        { hour: 13, label: "review" },
        { hour: 14, label: "review" },
    ];

    return (
        <div
            className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h1 className="text-white text-5xl font-bold mb-4">TIMELINE</h1>
            <h2 className="text-white text-xl mb-10 tracking-wide">DAY 1</h2>

            {/* SVG Circular Timeline */}
            <svg
                width="300"
                height="150"
                viewBox="0 0 300 150"
                className="mb-12"
            >
                <defs>
                    <path
                        id="arc"
                        d="M 30 140 A 120 120 0 0 1 270 140"
                        fill="none"
                    />
                </defs>

                {hours.map(({ hour, label }, i) => (
                    <text
                        key={i}
                        fontSize="12"
                        fill={
                            hour === currentHour ||
                            hour % 12 === currentHour % 12
                                ? "#FFD700"
                                : "#FFFFFF"
                        }
                    >
                        <textPath
                            href="#arc"
                            startOffset={`${(i / (hours.length - 1)) * 100}%`}
                            textAnchor="middle"
                        >
                            {`${hour % 12 || 12} - ${label}`}
                        </textPath>
                    </text>
                ))}
            </svg>

            <p className="text-white text-lg mt-2">
                DAY 2 <span className="text-yellow-400 font-bold">2</span> ↓
            </p>
        </div>
    );
};

export default Timeline;

