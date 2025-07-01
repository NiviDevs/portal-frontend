import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { getTeamInfo } from "@/lib/teamApi";

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
				toast.error(err.response?.data?.message || "Something went wrong.");
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
	}, [ready, user?.regId]);

	{
		/* TODO: uncomment this pls i just put it for testing okay*/
	}
	// if (!ready || loading) {
	// 	return (
	// 		<div className="text-center mt-10 text-muted-foreground">
	// 			Sign in to continue.
	// 		</div>
	// 	);
	// }

	return (
		<div className="h-screen bg-muted">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Section */}
				<div className="md:col-span-2 space-y-6">
					{/* Welcome Message */}
					<div className="bg-card p-6 rounded-xl shadow font-mono font-bold text-2xl">
						Welcome back, Nevedya! 👋
					</div>

					{/* Team Members */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-4">Team Members</h2>
						{/* Replace with avatar grid or list */}

						<div className="flex space-x-4">
							<div className="w-12 h-12 bg-gray-300 rounded-full" />
							<div className="w-12 h-12 bg-gray-300 rounded-full" />
							<div className="w-12 h-12 bg-gray-300 rounded-full" />
						</div>
					</div>

					{/* Hackathon Prompt */}
					<div className="bg-card p-6 rounded-xl shadow">
						<h2 className="text-lg font-semibold mb-4">Hackathon Prompt</h2>
						<p>Build something idk</p>
					</div>

					{/* GitHub/Vercel Links Input */}
					<div className="bg-card p-6 rounded-xl shadow space-y-4">
						<h2 className="text-lg font-semibold">Submit Your Project</h2>
						<input
							type="text"
							placeholder="GitHub Repo URL"
							className="w-full px-4 py-2 rounded-md bg-background border"
						/>
						<input
							type="text"
							placeholder="Vercel Live Link"
							className="w-full px-4 py-2 rounded-md bg-background border"
						/>
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded-md"
						>
							Submit
						</button>
					</div>
				</div>

				{/* Right Section */}
				<div className="space-y-6">
					{/* User PFP */}
					<div className="flex justify-end">
						<div className="w-14 h-14 rounded-full bg-gray-400" />
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
							<li>point one idk</li>
							<li>follow insta ??</li>
							<li>remember to take a break lol</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
