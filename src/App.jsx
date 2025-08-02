import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NewLandingPage from "./pages/NewLandingPage";
import RegisterPage from "./pages/RegisterPage";
// import NewAuthPage from "./pages/NewAuthPage";
import TestPage from "./pages/TestPage";

function App() {
	return (
		<div className="overflow-y-hidden">
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Routes>
					<Route path="/" element={<NewLandingPage />}></Route>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/dashboard" element={<DashboardPage />}></Route>
					<Route path="/test" element={<TestPage />}></Route>
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
