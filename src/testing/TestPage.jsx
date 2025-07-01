import LoginCard from "../components/common/LoginCard";

const TestPage = () => {
	return (
		<div className="h-screen flex items-center justify-center bg-muted">
			<div className="w-full max-w-[500px] h-[400px] flex rounded-xl overflow-hidden bg-background">
				{/* Left: Login Form */}
				<div className="w-full md:w-1/2 flex items-center justify-center m-1">
					<LoginCard />
				</div>

				{/* Right: Image */}
				<div className="hidden md:flex w-1/2 bg-red-500 rounded-lg m-1" />
			</div>
		</div>
	);
};

export default TestPage;
