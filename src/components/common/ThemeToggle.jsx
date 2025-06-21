import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <Button
            variant="disabled"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? (
                <SunIcon className="w-5 h-5" />
            ) : (
                <MoonIcon className="w-5 h-5" />
            )}
        </Button>
    );
};

export default ThemeToggle;
