import { useState } from "react";
import { Button } from "@/components/ui/button";
import authbg from "../assets/dark auth back.webp";
import lightauthbg from "../assets/light auth back.webp";
import { LoginCard, RegisterCard } from "../components/common/AuthCards";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";
import { useTheme } from "../components/theme-provider";

const NewAuthPage = () => {
	const [mode, setMode] = useState("login");
    const {theme} = useTheme();
	return (
		<BlurFade className="flex items-center justify-center w-full min-h-screen px-2 bg-background">
			{/* Gradient Shadow Wrapper copied from some random website lmaooo */}
			<div className="relative w-full max-w-4xl h-[70vh]">
				{/* this was adding shadow and shi */}
				<div
					className="absolute z-0 opacity-100 -inset-2 dark:opacity-40 blur-xl dark:blur-3xl rounded-3xl"
				/>

				{/* this boi wraps the real shi */}
				<div
					className="relative z-10 flex flex-col w-full h-full overflow-hidden md:flex-row md:justify-center md:items-center rounded-3xl"
					style={{
						backgroundImage: `url(${theme === "dark" ? authbg : lightauthbg}`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* the real shi */}
					<div className="flex flex-col items-center justify-center w-full h-full px-8 py-10 md:items-start dark:bg-black/60 backdrop-blur-xl md:w-1/2">
						
                        <TextAnimate  animation='blurInUp' by='word' as='h2' className="mb-2 font-mono text-3xl font-bold text-center text-white md:text-start">
							{mode === "login" ? "Welcome back." : "Create an account."}
						</TextAnimate>
						<p className="mb-6 text-sm text-stone-400">
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
					<div className="hidden h-full md:block dark:bg-black/60 md:w-1/2" />
				</div>
			</div>
		</BlurFade>
	);
};

export default NewAuthPage;
