import { Button } from "../ui/button";
import { ArrowRight, Zap, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <div className="min-h-screen max-h-screen bg-background relative overflow-hidden">
            {/* Background gradients and bloom effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 mt-0">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Badge */}


                    {/* Main heading */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            BUILD
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            COMPETE
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            WIN
                        </span>
                    </h1>

                    {/* Subheading */}
                    {/* <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The ultimate platform to organize, manage, and scale
                        hackathons.
                        <span className="text-white font-semibold">
                            {" "}
                            From registration to judging
                        </span>
                        , we've got everything covered.
                    </p> */}

                    {/* Feature highlights */}
                    {/* <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                            <Users className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">
                                Team Management
                            </span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                            <Trophy className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">
                                Smart Judging
                            </span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                            <Zap className="w-5 h-5 text-pink-400" />
                            <span className="text-white font-medium">
                                Real-time Analytics
                            </span>
                        </div>
                    </div> */}

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to='/auth'>
                            
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                            >
                                Start Your Hackathon
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                10K+
                            </div>
                            <div className="text-gray-400 font-medium">
                                Participants
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                500+
                            </div>
                            <div className="text-gray-400 font-medium">
                                Hackathons
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                99.9%
                            </div>
                            <div className="text-gray-400 font-medium">
                                Uptime
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
        </div>
    );
}
