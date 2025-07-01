import { LogOut } from "lucide-react";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/animate-ui/radix/popover.jsx";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

const UserPopover = ({ className = "", variant = "link", children }) => {
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
				<Button
					variant={variant}
					className={`text-sm font-medium font-mono px-4 py-1 rounded-full ${className}`}
					onMouseEnter={() => !isTouch && setOpen(true)}
					onMouseLeave={() => !isTouch && setTimeout(() => setOpen(false), 200)}
					onClick={() => isTouch && setOpen((prev) => !prev)}
				>
					{children}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="center"
				side="top"
				className="p-3 space-y-2 text-center"
				style={{ width: "fit-content" }}
				onMouseEnter={() => !isTouch && setOpen(true)}
				onMouseLeave={() => !isTouch && setTimeout(() => setOpen(false), 200)}
			>
				<div className="space-y-1 text-sm">
					<p className="font-mono font-medium">{user.name}</p>
					<p className="font-mono text-muted-foreground">{user.email}</p>
					<p className="font-mono text-muted-foreground capitalize">
						{user.regId}
					</p>
				</div>

				<Button
					onClick={logout}
					variant="destructive"
					className="w-full text-center"
				>
					<LogOut />
					Logout
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default UserPopover;
