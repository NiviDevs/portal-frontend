import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import authbg from "../assets/dark auth back.webp";
import lightauthbg from "../assets/light auth back.webp";
import { LoginCard } from "../components/common/AuthCards";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";
import { useTheme } from "../components/theme-provider";

const LoginPage = () => {
	const { theme } = useTheme();
	return (
		<BlurFade
			className="min-h-screen w-full flex items-center justify-center bg-background px-2"
			duration={0.3}
		>
			{/* Gradient Shadow Wrapper copied from some random website lmaooo */}
			<div className="relative w-full max-w-4xl h-[70vh]">
				{/* this was adding shadow and shi */}
				<div
					className="absolute -inset-2 rounded-3xl
                    bg-gradient-to-br
                    from-blue-600 to-slate-600
                    dark:from-cyan-600 dark:to-blue-500

                    md:bg-gradient-to-br
                    md:dark:bg-gradient-to-b
                    md:from-sky-500  md:to-blue-800
                md:dark:from-cyan-600 md:dark:via-orange-500 md:dark:to-blue-700 
                opacity-100 blur-xl z-0
                dark:blur-3xl dark:opacity-40
                "
				/>

				{/* this boi wraps the real shi */}
				<div
					className=" relative w-full h-full rounded-3xl overflow-hidden flex flex-col md:flex-row md:items-center md:justify-center z-10"
					style={{
						backgroundImage: `url(${theme === "dark" ? authbg : lightauthbg}`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* the real shi */}
					<div className="w-full md:w-1/2 h-full px-8 py-10 flex flex-col justify-center dark:bg-black/60 backdrop-blur-xl items-center md:items-start">
						<TextAnimate
							delay={0.2}
							animation="blurInUp"
							by="word"
							as="h2"
							className="text-3xl font-bold mb-2 font-mono text-white text-center md:text-start"
						>
							Welcome back.
						</TextAnimate>
						<p className="text-stone-400 text-sm mb-6">
							New here?{" "}
							<Button variant="link" className="px-1 text-white">
								<Link to="/register">Register</Link>
							</Button>
						</p>

						<LoginCard />
					</div>

					{/* spacing because idk how to use masks */}
					<div className="hidden md:block dark:bg-black/60 md:w-2/3 h-full" />
				</div>
			</div>
		</BlurFade>
	);
};

export default LoginPage