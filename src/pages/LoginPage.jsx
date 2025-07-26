import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoginCard } from "../components/common/AuthCards";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";

const LoginPage = () => {
    return (
        <BlurFade
            className="flex justify-center items-center bg-gradient-to-r from-[#f8e4a2] dark:from-[#020c28] to-[#fff4d4] dark:to-[#05081c] pr-7 pl-20 w-full min-h-screen"
            duration={0.3}
            direction="down"
        >
            {/* Main container */}
            <div className="flex flex-col w-full h-screen py-20 overflow-hidden md:flex-row md:justify-center md:items-center max-w-screen">
                {/* Left: Login Card */}
                <div className="flex flex-col items-center justify-center w-full h-full md:items-start md:w-1/2">
                    <TextAnimate
                        delay={0.2}
                        animation="blurInUp"
                        by="word"
                        as="h2"
                        className="-mb-3 text-3xl font-bold text-center text-black
                        dark:text-white font-polt md:text-start"
                    >
                        Welcome back.
                    </TextAnimate>

                    <p className="mb-6 pl-0.5 text-black/60 text-sm dark:text-white/39">
                        New here?{" "}
                        <Button
                            variant="link"
                            className="px-1 text-[#35405d] dark:text-white"
                        >
                            <Link to="/register">Register</Link>
                        </Button>
                    </p>

                    <LoginCard />
                </div>

                {/* Right: Background image */}
                <div className="hidden md:flex items-center bg-[url('/src/assets/regbg.svg')] bg-cover bg-no-repeat bg-center rounded-4xl md:w-1/2 h-full font-polt font-bold text-4xl text-center"></div>
            </div>
        </BlurFade>
    );
};

export default LoginPage;