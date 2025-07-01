import { useState } from "react";
import { Button } from "@/components/ui/button";
import authbg from "../assets/authbg.webp";
import { LoginCard, RegisterCard } from "../components/common/AuthCards";

const TestPage = () => {
	const [mode, setMode] = useState("login");

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-background px-2">
			<div
				className="relative w-full max-w-4xl h-[70vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center md:justify-center "
				style={{
					backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${authbg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Left Section: Form */}
				<div className="w-full md:w-1/2 h-full px-8 py-10 flex flex-col justify-center bg-black/30  backdrop-blur-md items-center ">
					<h2 className="text-3xl font-bold mb-2 font-mono text-white">
						{mode === "login" ? "Welcome back." : "Create an account."}
					</h2>
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

				{/* Right Section: Spacer */}
				<div className="hidden md:block md:w-1/2 h-full" />
			</div>
		</div>
	);
};

export default TestPage;
