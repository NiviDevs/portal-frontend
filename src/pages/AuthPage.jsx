import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/animate-ui/radix/tabs";
import { LoginCard, RegisterCard } from "../components/common/AuthCards";

export default function AuthPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true); // ✅ to block UI while checking auth
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("user");
		if (stored) {
			setIsAuthenticated(true);
			navigate("/dashboard");
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false); // ✅ done checking
	}, [navigate]);

	if (loading || isAuthenticated) return null; // ✅ prevent flash

	return (
		<BubbleBackground interactive={true}>
			<div className="flex items-center justify-center w-full min-h-screen ">
				<div className="w-full max-w-sm px-6 py-8 transition-all duration-300 border shadow-xl rounded-xl backdrop-blur-md bg-muted/30 border-muted/20">
					<Tabs defaultValue="Login" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="Login">Login</TabsTrigger>
							<TabsTrigger value="Register">Register</TabsTrigger>
						</TabsList>
						<div className="h-auto transition-all duration-300">
							<TabsContent value="Login">
								<LoginCard />
							</TabsContent>
							<TabsContent value="Register">
								<RegisterCard />
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</BubbleBackground>
	);
}
