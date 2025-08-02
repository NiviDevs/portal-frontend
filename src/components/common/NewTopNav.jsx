import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserPopover from "./UserPopover";

// Accept optional props for integration with LandingPage
const NewTopNav = ({ activeSection = null, onNavigate = null }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Define navigation items
    const navItems = [
        { label: "HOME", id: "hero" }, 
        { label: "ABOUT", id: "about" },
        ...(user ? [{ label: "DASHBOARD", to: "/dashboard" }] : [])
    ];

    // Determine if a scroll-based nav item is active
    const isScrollItemActive = (itemId) => {
        return activeSection !== null && activeSection === itemId;
    };

    // Handle clicks for scroll items
    const handleScrollItemClick = (itemId) => {
        if (onNavigate) {
            onNavigate(itemId);
        }
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 border bg-[#eef0ca]/50 border-[#eef0ca]/50 shadow-lg rounded-2xl px-2 py-0.5 max-w-fit flex items-center space-x-4 dark:border-stone-300/30">
            <div className="flex items-center space-x-2 rounded-full">
                <AnimatedBackground
                    transition={{ type: "spring", bounce: 0.2, duration: 0.1 }}
                >
                    {navItems.map((item) => {
                        // Handle standard navigation links (Dashboard, Login/Profile)
                        if (item.to) {
                            const isActive =
                                location.pathname === item.to ||
                                (item.to !== "/" && location.pathname.startsWith(item.to));

                            return (
                                <Link key={item.label} to={item.to} data-id={item.label.toLowerCase()}>
                                    <Button
                                        variant={isActive ? "secondary" : "link"}
                                        className={isActive ?
                                            "text-sm font-medium font-polt px-4 py-1 rounded-full bg-[#eef0ca] hover:bg-[#eef0ca] text-[#6c5e3a] uppercase"
                                            : "text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase"
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        }

                        // Handle scroll-based links (Home, About)
                        const isActive = isScrollItemActive(item.id);

                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleScrollItemClick(item.id)}
                                data-id={item.label.toLowerCase()}
                                className={isActive ?
                                    "text-sm font-medium font-polt px-4 py-1 rounded-full bg-[#eef0ca] text-[#6c5e3a] uppercase cursor-pointer"
                                    : "text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase cursor-pointer"
                                }
                            >
                                {item.label}
                            </button>
                        );
                    })}

                    {/* Login/Profile button */}
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

            <div className="-ml-3">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default NewTopNav;