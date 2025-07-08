const hours = [
    { hour: 10, label: "review" },
    { hour: 11, label: "review" },
    { hour: 12, label: "attendance" },
    { hour: 1, label: "review" },
    { hour: 2, label: "review" },
];

export default function Timeline({ className = "", style = {} }) {
    return (
        <div className={`text-center ${className}`} style={style}>
            <h2 className="text-4xl tracking-widest font-serif text-[#f4d6c6] mb-8">
                TIMELINE
            </h2>
            <h3 className="text-2xl font-serif text-white mb-6">DAY 1</h3>
            <div className="relative w-[95vw] max-w-[900px] min-h-[500px] mx-auto">
                <img
                    src="/bg-stars.png"
                    alt="Zodiac Dial"
                    className="w-full rounded-full"
                />
                {hours.map((item, idx) => {
                    const positions = [
                        { top: "30%", left: "5%" },
                        { top: "10%", left: "20%" },
                        { top: "0%", left: "47%" },
                        { top: "10%", right: "20%" },
                        { top: "20%", right: "5%" },
                    ];
                    const style = positions[idx];
                    return (
                        <div
                            key={idx}
                            className="absolute text-lg text-white font-serif"
                            style={{ ...style }}
                        >
                            <p className="text-base">{item.hour}</p>
                            <p>{item.label}</p>
                        </div>
                    );
                })}
                <p className="absolute bottom-4 right-4 text-base tracking-wider text-[#e0c091] font-serif">
                    DAY 2
                </p>
            </div>
        </div>
    );
}
