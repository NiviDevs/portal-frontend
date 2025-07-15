import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
// import { getTeamInfo } from "@/lib/teamApi";
import { getTeamInfo } from "../lib/teamApi";

const DashboardPage = () => {
	const { user, ready } = useAuth();
	const [team, setTeam] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (ready && user?.regId) {
			(async () => {
				try {
					setLoading(true);
					const data = await getTeamInfo();
					setTeam(data);
				} catch (err) {
					if (err.response?.status === 404) {
						setTeam(null); // not in a team
					} else {
						toast.error(err.response?.data?.message || "Something went wrong.");
						setTeam(null);
					}
				} finally {
					setLoading(false);
				}
			})();
		}
	}, [ready, user?.regId]);

	if (!ready || loading) {
		return (
			<div className="text-center mt-10 text-muted-foreground">
				Loading dashboard...
			</div>
		);
	}

	const initials = user?.name
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className="h-screen bg-muted">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
				{/* Left Section */}
				<div className="md:col-span-2 space-y-6">
					{/* Welcome Message */}
					<div className="bg-card p-6 rounded-xl shadow font-mono font-bold text-2xl">
						Welcome back, {user?.name?.split(" ")[0]}! 👋
					</div>

					{/* Team Members */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-4">Team Members</h2>

						{team?.members?.length > 0 ? (
							<div className="flex flex-wrap gap-4">
								{team.members.map((member) => (
									<div
										key={member.regId}
										className="flex items-center gap-2 bg-muted p-2 rounded-lg w-full"
									>
										<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm uppercase">
											{member.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.slice(0, 2)}
										</div>
										<div className="text-sm">
											<p className="font-medium">
												{member.name}
												{member.isLeader && (
													<span className="ml-1 text-xs text-blue-500">
														(Leader)
													</span>
												)}
											</p>
											<p className="text-muted-foreground">{member.regId}</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-muted-foreground">You're not in a team yet.</p>
						)}
					</div>

					{/* Hackathon Prompt */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-4">Hackathon Prompt</h2>
						<p>Build something idk</p>
					</div>

					{/* GitHub/Vercel Submission */}
					{team ? (
						<div className="bg-card p-6 rounded-xl shadow space-y-4">
							<h2 className="text-lg font-semibold">Submit Your Project</h2>
							<input
								type="text"
								placeholder="GitHub Repo URL"
								defaultValue={team?.submissionLink?.github || ""}
								className="w-full px-4 py-2 rounded-md bg-background border"
							/>
							<input
								type="text"
								placeholder="Vercel Live Link"
								defaultValue={team?.submissionLink?.vercel || ""}
								className="w-full px-4 py-2 rounded-md bg-background border"
							/>
							<button
								type="submit"
								className="bg-primary text-white px-4 py-2 rounded-md"
							>
								Submit
							</button>
						</div>
					) : (
						<div className="bg-card p-6 rounded-xl shadow text-muted-foreground">
							<p>You need to join a team to submit a project.</p>
						</div>
					)}
				</div>

				{/* Right Section */}
				<div className="space-y-6">
					{/* User PFP */}
					<div className="flex justify-end">
						<div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center font-bold text-white uppercase">
							{initials}
						</div>
					</div>

					{/* Countdown / Timeline */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-2">Time Remaining</h2>
						<p className="text-2xl font-bold text-red-500">03:12:47</p>
					</div>

					{/* Admin Messages */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-2">Admin Updates</h2>
						<ul className="list-disc ml-4 space-y-1 text-sm">
							{/* Placeholder for real-time socket updates later */}
							<li>Hackathon starts at 10 AM</li>
							<li>Join the Discord for mentor help</li>
							<li>Submit before 11:59 PM!</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
