import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RegisterCard } from "../components/common/AuthCards";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";

const RegisterPage = () => {
    // const { theme } = useTheme();
    // using tailwind classes for now
    return (
        <BlurFade
            className="flex justify-center items-center bg-gradient-to-r from-[#f8e4a2] dark:from-[#020c28] to-[#fff4d4] dark:to-[#05081c] pr-7 pl-20 w-full min-h-screen"
            duration={0.3}
            direction="down"
        >
            {/* Main container */}

            <div className="flex flex-col w-full h-screen py-20 overflow-hidden md:flex-row md:justify-center md:items-center max-w-screen">
                {/* Left: Register Card */}
                <div className="flex flex-col items-center justify-center w-full h-full md:items-start  md:w-1/2">
                    <TextAnimate
                        delay={0.2}
                        animation="blurInUp"
                        by="word"
                        as="h2"
                        className="-mb-3 text-3xl font-bold text-center text-black
                        dark:text-white font-polt md:text-start"
                    >
                        {/* using bottom margin as -3 to bring that shit closer to the big thing. will look into this thing later */}
                        
                        Create an account.
                    </TextAnimate>

                    <p className="mb-6 pl-0.5 text-black/60 text-sm dark:text-white/39">
                        Already have an account?{" "}
                        <Button variant="link" className="px-1 text-[#35405d] dark:text-white">
                            <Link to="/login">Login</Link>
                        </Button>
                    </p>

                    <RegisterCard />
                </div>

                {/* Right: whatever was in the figma file ngl */}
                <div className="hidden md:flex items-center bg-[url('/src/assets/regbg.svg')] bg-cover bg-no-repeat bg-center rounded-4xl md:w-1/2 h-full font-serif font-bold text-4xl text-center"></div>
            </div>
        </BlurFade>
    );
};

export default RegisterPage;
