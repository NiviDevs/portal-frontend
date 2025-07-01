import { CrownIcon, Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { deleteTeam, kickMember, leaveTeam } from "@/lib/teamApi";

const TeamMembersList = ({ team, refreshTeam }) => {
    const { user } = useAuth();

    const leader = team.members.find((member) => member.isLeader);
    const leaderRegId = leader?.regId;
    const isLeader = user?.regId === leaderRegId;
    const handleKick = async (regIdToKick) => {
        try {
            await kickMember({
                leaderRegId: user.regId,
                memberRegId: regIdToKick,
            });
            toast.success("Member kicked.");
            refreshTeam();
        } catch (err) {
            const msg = err?.response?.data?.error || "Failed to kick member.";
            toast.error(msg);
        }
    };

    const handleLeave = async () => {
        try {
            await leaveTeam();
            toast.success("Left team successfully.");
            refreshTeam();
        } catch (err) {
            const msg = err?.response?.data?.error || "Failed to leave team.";
            toast.error(msg);
        }
    };

    return (
        <div className="border p-6 rounded-xl shadow w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Team: {team.teamName}
            </h2>

            <ul className="space-y-3">
                {team.members.map((member) => {
                    const isThisLeader = member.isLeader;
                    const isSelf = member.regId === user.regId;

                    return (
                        <li
                            key={member.regId}
                            className="flex justify-between items-center border p-2 rounded"
                        >
                            <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted">
                                    {member.regId}
                                </p>
                                {isThisLeader && (
                                    <span className="text-yellow-600 inline-flex items-center text-sm">
                                        <CrownIcon className="w-4 h-4 mr-1" />{" "}
                                        Leader
                                    </span>
                                )}
                            </div>

                            {isLeader && !isThisLeader && !isSelf && (
                                <button
                                    onClick={() => handleKick(member.regId)}
                                    className="text-destructive hover:text-red-700"
                                    title="Kick member"
                                >
                                    <Trash2Icon className="w-5 h-5" />
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div className="mt-6 text-center">
                <button
                    onClick={handleLeave}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Leave Team
                </button>
                {/*the next 40 LOC are just conditional rendering of a damn dialog*/ }
                {isLeader && (
                    <AlertDialog>
                        <AlertDialogTrigger className="bg-[--primary] text-[--primary-foreground] px-4 py-2 rounded hover:opacity-90 transition">
                            Delete Team
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete your team and
                                    remove all members. This action cannot be
                                    undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-muted text-foreground px-3 py-1.5 rounded hover:opacity-90 transition">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-[--destructive] text-[--destructive-foreground] px-3 py-1.5 rounded hover:opacity-90 transition"
                                    onClick={async () => {
                                        try {
                                            await deleteTeam();
                                            toast.success("Team deleted.");
                                            refreshTeam(); // Re-fetch and reset state
                                        } catch (err) {
                                            const msg =
                                                err?.response?.data?.error ||
                                                "Failed to delete team.";
                                            toast.error(msg);
                                        }
                                    }}
                                >
                                    Yes, delete team
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </div>
    );
};
export default TeamMembersList;
