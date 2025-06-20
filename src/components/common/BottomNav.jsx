import { Button } from "@/components/ui/button";
import {
    HomeIcon,
    UserIcon,
    LayoutListIcon,
    BadgeInfoIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserPopover from "./UserPopover";
import { useAuth } from "@/context/AuthContext";

const BottomNav = () => {
    const { user, ready } = useAuth();

    if (!ready) return null; // 🧠 wait for auth to finish

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/30 backdrop-blur-md shadow-lg rounded-full px-4 py-2 flex gap-2 items-center border border-white/20 outline-2">
            <Link to="/">
                <Button variant="ghost" size="icon" className="text-foreground">
                    <HomeIcon className="w-5 h-5" />
                </Button>
            </Link>

            {!user ? (
                <Link to="/auth">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground"
                    >
                        <UserIcon className="w-5 h-5" />
                    </Button>
                </Link>
            ) : (
                <UserPopover />
            )}

            <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-foreground">
                    <LayoutListIcon className="w-5 h-5" />
                </Button>
            </Link>

            <Link to="/about">
                <Button variant="ghost" size="icon" className="text-foreground">
                    <BadgeInfoIcon className="w-5 h-5" />
                </Button>
            </Link>
        </div>
    );
};

export default BottomNav;
