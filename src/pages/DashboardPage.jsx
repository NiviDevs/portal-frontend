import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTeamInfo } from "@/lib/teamApi";
import TeamMembersList from "@/components/team/TeamMembersList";
import CreateJoinForm from "@/components/team/CreateJoinForm";
import { toast } from "react-hot-toast";
import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";
const Dashboard = () => {
    const { user, ready } = useAuth();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshTeam = async () => {
        try {
            setLoading(true);
            const data = await getTeamInfo(user.regId);
            setTeam(data);
        } catch (err) {
            if (err.response?.status === 404) {
                setTeam(null); // user not in a team
            } else {
                toast.error(
                    err.response?.data?.message || "Something went wrong."
                );
                setTeam(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ready && user?.regId) {
            refreshTeam();
        }
    }, [ready, user?.regId,]);

    if (!ready || loading) {
        return (
                <div className="text-center mt-10 text-muted-foreground">
                    Loading dashboard...
                </div>
        );
    }

    return (
        
            <div className="max-w-3xl mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-bold text-center">Your Dashboard</h1>
                {team ? (
                    <TeamMembersList
                        team={team}
                        currentUserRegId={user.regId}
                        refreshTeam={refreshTeam}
                    />
                ) : (
                    <CreateJoinForm
                        regId={user.regId}
                        onTeamCreated={refreshTeam}
                    />
                )}
            </div>

    );
};

export default Dashboard;
