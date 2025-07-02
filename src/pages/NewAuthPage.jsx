import { useState } from "react";
import { Button } from "@/components/ui/button";
import authbg from "../assets/authbg.webp"; import lightauthbg from "../assets/lightauthbg.webp"
import { LoginCard, RegisterCard } from "../components/common/AuthCards";
import { useTheme } from "../components/theme-provider";
import { TextAnimate } from "../components/magicui/text-animate";
import { BlurFade } from "../components/magicui/blur-fade";

const NewAuthPage = () => {
	const [mode, setMode] = useState("login");
    const {theme} = useTheme();
	return (
		<BlurFade className="min-h-screen w-full flex items-center justify-center bg-background px-2">
			{/* Gradient Shadow Wrapper copied from some random website lmaooo */}
			<div className="relative w-full max-w-4xl h-[70vh]">
				{/* this was adding shadow and shi */}
				<div
					className="absolute -inset-2 rounded-3xl
                    bg-gradient-to-br
                    from-orange-600 to-slate-600
                    dark:from-cyan-600 dark:to-amber-500
                    dark:bg-gradient-to-b

                    md:bg-gradient-to-br
                    md:dark:bg-gradient-to-r
                    md:from-pink-900 md:via-sky-500 md:to-stone-800
                md:dark:from-amber-600 md:dark:via-cyan-500 md:dark:to-orange-400 
                opacity-100 blur-xl z-0
                dark:blur-3xl dark:opacity-40
                "
				/>

				{/* this boi wraps the real shi */}
				<div
					className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col md:flex-row md:items-center md:justify-center z-10"
					style={{
						backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${theme === "dark" ? authbg : lightauthbg})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* the real shi */}
					<div className="w-full md:w-1/2 h-full px-8 py-10 flex flex-col justify-center bg-black/30 backdrop-blur-md items-center md:items-start">
						
                        <TextAnimate  animation='blurInUp' by='word' as='h2' className="text-3xl font-bold mb-2 font-mono text-white text-center md:text-start">
							{mode === "login" ? "Welcome back." : "Create an account."}
						</TextAnimate>
						<p className="text-stone-400 text-sm mb-6">
							{mode === "login" ? (
								<>
									New here?{" "}
									<Button
										variant="link"
										className="px-1 text-white"
										onClick={() => setMode("register")}
									>
										Register
									</Button>
								</>
							) : (
								<>
									Already have an account?{" "}
									<Button
										variant="link"
										className="px-1 text-white"
										onClick={() => setMode("login")}
									>
										Login
									</Button>
								</>
							)}
						</p>

						{mode === "login" ? <LoginCard /> : <RegisterCard />}
					</div>

					{/* spacing because idk how to use masks */}
					<div className="hidden md:block md:w-1/2 h-full" />
				</div>
			</div>
		</BlurFade>
	);
};

export default NewAuthPage;
