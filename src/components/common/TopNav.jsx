import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle"; // adjust path if needed
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserPopover from "./UserPopover";

const TopNav = () => {
	const { user, ready } = useAuth();
	const location = useLocation();
	if (!ready) return null;

	const tabs = [
		{ label: "Home", to: "/" },
		{ label: "About", to: "/about" },
		...(user ? [{ label: "Dashboard", to: "/dashboard" }] : []),
	];

	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-sm bg-background/20 border border-background/20 shadow-lg rounded-full px-2 py-2 max-w-fit flex items-center space-x-4">
			{/* Centered Nav Items */}
			<div className="flex items-center space-x-2 rounded-full">
				<AnimatedBackground
					className="bg-muted/30 p-1 rounded-full"
					transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
				>
					{tabs.map((tab) => {
						const isActive =
							location.pathname === tab.to ||
							(tab.to !== "/" && location.pathname.startsWith(tab.to));
						return (
							<Link key={tab.label} to={tab.to} data-id={tab.label}>
								<Button
									variant={isActive ? "secondary" : "link"}
									className="text-sm font-medium font-mono px-4 py-1 rounded-full"
								>
									{tab.label}
								</Button>
							</Link>
						);
					})}
					{!user ? (
						<Link key="Register" to="/auth" data-id="Register">
							<Button
								variant={
									location.pathname.startsWith("/auth") ? "secondary" : "ghost"
								}
								className="text-sm font-medium font-mono px-4 py-1 rounded-full"
							>
								Register
							</Button>
						</Link>
					) : (
						<UserPopover variant="link">Profile</UserPopover>
					)}
				</AnimatedBackground>
			</div>

			{/* Theme Toggle */}
			<div className="-ml-3">
				<ThemeToggle />
			</div>
		</div>
	);
};

export default TopNav;
