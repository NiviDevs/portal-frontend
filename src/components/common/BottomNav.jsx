import {
    HomeIcon,
    UserIcon,
    LayoutListIcon,
    BadgeInfoIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserPopover from "./UserPopover";
import { useAuth } from "@/context/AuthContext";
import {
    Dock,
    DockItem,
    DockIcon,
    DockLabel,
} from "@/components/motion-primitives/dock";
import ThemeToggle from "./ThemeToggle";
const BottomNav = () => {
    const { user, ready } = useAuth();
    if (!ready) return null;

    return (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 max-w-full">
            <Dock className="items-end pb-3">
                {/* Home */}
                <Link to="/">
                    <DockItem className="aspect-square rounded-full bg-muted">
                        <DockLabel>Home</DockLabel>
                        <DockIcon>
                            <HomeIcon className="w-full h-full text-neutral-600 dark:text-neutral-300" />
                        </DockIcon>
                    </DockItem>
                </Link>

                {/* Auth or Profile */}
                {!user ? (
                    <Link to="/auth">
                        <DockItem className="aspect-square rounded-full bg-muted">
                            <DockLabel>Login</DockLabel>
                            <DockIcon>
                                <UserIcon className="w-full h-full text-neutral-600 dark:text-neutral-300" />
                            </DockIcon>
                        </DockItem>
                    </Link>
                ) : (
                    <DockItem className="aspect-square rounded-full bg-muted">
                        <DockLabel>Login</DockLabel>
                        <DockIcon>
                            <UserPopover />
                        </DockIcon>
                    </DockItem>
                )}

                {/* Dashboard */}
                <Link to="/dashboard">
                    <DockItem className="aspect-square rounded-full bg-muted">
                        <DockLabel>Dashboard</DockLabel>
                        <DockIcon>
                            <LayoutListIcon className="w-full h-full text-neutral-600 dark:text-neutral-300" />
                        </DockIcon>
                    </DockItem>
                </Link>

                {/* About */}
                <Link to="/about">
                    <DockItem className="aspect-square rounded-full bg-muted">
                        <DockLabel>About</DockLabel>
                        <DockIcon>
                            <BadgeInfoIcon className="w-full h-full text-neutral-600 dark:text-neutral-300" />
                        </DockIcon>
                    </DockItem>
                </Link>

                <DockItem className="aspect-square rounded-full bg-muted">
                    <DockLabel>Theme</DockLabel>
                    <DockIcon>
                        <ThemeToggle></ThemeToggle>
                    </DockIcon>
                </DockItem>
            </Dock>
        </div>
    );
};

export default BottomNav;
