// src/components/navigation/TopNav.jsx
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserPopover from "./UserPopover";

// Accept props for active section and navigation handler
const TopNav = ({ activeSection, onNavigate }) => {
    const { user } = useAuth();
    const location = useLocation(); // Still useful for Dashboard/Login logic if needed

    // Tabs for navigation - these will scroll, not navigate (except Dashboard/Login)
    // We can represent Home/Hero and About as scroll targets
    const navItems = [
        { label: "HOME", id: "home" }, // ID corresponds to section
        { label: "ABOUT", id: "about" },
        // Dashboard and Login/Profile remain as navigation links
        ...(user ? [{ label: "DASHBOARD", to: "/dashboard" }] : [])
    ];

    // Determine if a nav item (scroll target) is active
    const isNavItemActive = (itemId) => {
        return activeSection === itemId;
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 border bg-[#eef0ca]/50 border-[#eef0ca]/50 shadow-lg rounded-2xl px-2 py-0.5 max-w-fit flex items-center space-x-4 dark:border-stone-300/30">
            <div className="flex items-center space-x-2 rounded-full">
                <AnimatedBackground
                    transition={{ type: "spring", bounce: 0.2, duration: 0.1 }}
                >
                    {navItems.map((item) => {
                        // Handle Dashboard and Login/Profile (navigation)
                        if (item.to) { // Items with 'to' are navigation links
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

                        // Handle Home and About (scroll targets)
                        // These are buttons that trigger scroll, not Links that navigate
                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => onNavigate?.(item.id)} // Call scroll function
                                data-id={item.label.toLowerCase()}
                                className={isNavItemActive(item.id) ?
                                    "text-sm font-medium font-polt px-4 py-1 rounded-full bg-[#eef0ca] text-[#6c5e3a] uppercase cursor-pointer" // Active style
                                    : "text-sm font-medium font-polt px-4 py-1 rounded-full text-[#fff8e6] hover:text-[#6c5e3a] uppercase cursor-pointer" // Inactive style
                                }
                            >
                                {item.label}
                            </button>
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

            <div className="-ml-3">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default TopNav;