import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./components/common/TopNav";
import { ThemeProvider } from "./components/theme-provider";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NewAuthPage from "./pages/NewAuthPage";

function App() {
	return (
		<div className="overflow-y-hidden">
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<TopNav />
				<Routes>
					<Route path="" element={<LandingPage />}></Route>
					<Route path="/auth" element={<NewAuthPage />}></Route>
					<Route path="/about" element={<AboutPage />}></Route>
					<Route path="/dashboard" element={<DashboardPage />}></Route>
				</Routes>
				{/* <BottomNav/> */}
				<Toaster position="top-left" />
			</ThemeProvider>
		</div>
	);
}

export default App;

/* <Routes>
    <Route path="/" element={<AuthPage />} />
</Routes>; */
