import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { LogOut, UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
const UserPopover = ({ className }) => {
    const { user, logout, ready } = useAuth();
    const [open, setOpen] = useState(false);

    const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0);

    if (!ready || !user) return null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className={`cursor-pointer flex items-center justify-center ${className}`}
                    onMouseEnter={() => !isTouch && setOpen(true)}
                    onMouseLeave={() =>
                        !isTouch && setTimeout(() => setOpen(false), 200)
                    }
                    onClick={() => isTouch && setOpen((prev) => !prev)}
                >

                        <UserIcon className="w-full h-full text-neutral-600 dark:text-neutral-300" />
                </div>
            </PopoverTrigger>

            <PopoverContent
                align="center"
                side="top"
                className="p-4 space-y-3 text-center"
                style={{ width: "fit-content" }}
                onMouseEnter={() => !isTouch && setOpen(true)}
                onMouseLeave={() =>
                    !isTouch && setTimeout(() => setOpen(false), 200)
                }
            >
                <div className="space-y-1 text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-muted-foreground capitalize">
                        {user.regId}
                    </p>
                </div>

                <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <LogOut className="w-4 h-4 stroke-muted-foreground" />
                    Logout
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default UserPopover;
