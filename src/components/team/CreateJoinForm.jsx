import { useState } from "react";
import { createTeam, joinTeam } from "@/lib/teamApi";
import { toast } from "react-hot-toast";

const CreateJoinForm = ({ regId, onTeamCreated }) => {
    const [mode, setMode] = useState(null); // "create" | "join"
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teamName) return toast.error("Please enter a team name");

        setLoading(true);
        try {
            if (mode === "create") {
                await createTeam({ teamName, regId });
                toast.success("Team created successfully!");
            } else if (mode === "join") {
                await joinTeam({ teamName, regId });
                toast.success("Joined team successfully!");
            }
            onTeamCreated();
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || "Something went wrong.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!mode) {
        return (
            <div className="space-y-4 text-center">
                <p>You are not in a team yet.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded"
                        onClick={() => setMode("create")}
                    >
                    Create Team
                    </button>
                    <button
                        className="bg-secondary px-4 py-2 rounded"
                        onClick={() => setMode("join")}
                    >
                        Join Team
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-center">
                {mode === "create"
                    ? "Create a New Team"
                    : "Join an Existing Team"}
            </h2>
            <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full border px-4 py-2 rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded w-full"
            >
                {loading
                    ? "Submitting..."
                    : mode === "create"
                    ? "Create Team"
                    : "Join Team"}
            </button>
            <button
                type="button"
                className="text-sm text-muted-foreground underline"
                onClick={() => setMode(null)}
            >
                ← Go back
            </button>
        </form>
    );
};

export default CreateJoinForm;
