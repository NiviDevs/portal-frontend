import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle"; 
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserPopover from "./UserPopover";

const TopNav = () => {
    const { user, ready } = useAuth();
    const location = useLocation();
    if (!ready) return null;

    const tabs = [
        { label: "HOME", to: "/" },
        { label: "ABOUT", to: "/about" },
        // Only show Dashboard when user is logged in
        ...(user ? [{ label: "DASHBOARD", to: "/dashboard" }] : [])
    ];

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50  border bg-[#eef0ca]/50  border-[#eef0ca]/50 shadow-lg rounded-2xl px-2 py-0.5 max-w-fit flex items-center space-x-4 dark:border-stone-300/30">
            {/* Centered Nav Items */}
            <div className="flex items-center space-x-2 rounded-full">
                <AnimatedBackground
                    transition={{ type: "spring", bounce: 0.2, duration: 0.1 }}
                >
                    {tabs.map((tab) => {
                        const isActive =
                            location.pathname === tab.to ||
                            (tab.to !== "/" && location.pathname.startsWith(tab.to));
                        return (
                            <Link key={tab.label} to={tab.to} data-id={tab.label}>
                                <Button
                                    variant={isActive ? "secondary" : "link"}
                                    className={isActive ? 
                                        "text-sm font-medium font-polt px-4 py-1 rounded-full bg-[#eef0ca] hover:bg-[#eef0ca] text-[#6c5e3a] uppercase"
                                        : "text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase"
                                    }
                                >
                                    {tab.label}
                                </Button>
                            </Link>
                        );
                    })}
                    
                    {/* Login/Profile button - only show when user is not logged in */}
                    {!user ? (
                        <Link key="LOGIN" to="/login" data-id="login">
                            <Button
                                variant={
                                    location.pathname.startsWith("/login") ||
                                    location.pathname.startsWith("/register")
                                        ? "secondary"
                                        : "link"
                                }
                                className={
                                    (location.pathname.startsWith("/login") ||
                                    location.pathname.startsWith("/register"))
                                        ? "text-sm font-medium font-polt px-4 py-1 rounded-full bg-[#eef0ca] hover:bg-[#eef0ca] text-[#6c5e3a] uppercase"
                                        : "text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase"
                                }
                            >
                                LOGIN
                            </Button>
                        </Link>
                    ) : (
                        <div className="rounded-full">
                            <UserPopover 
                                variant="link"
                                className="text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase"
                            >
                                PROFILE
                            </UserPopover>
                        </div>
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