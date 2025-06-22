import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; 
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import BottomNav from "./components/common/BottomNav";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";
function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                    <Route path="" Component={LandingPage}></Route>
                    <Route path="/auth" Component={AuthPage}></Route>
                    <Route path="/about" Component={AboutPage}></Route>
                    <Route path="/dashboard" Component={DashboardPage}></Route>
                </Routes>
                <BottomNav/>
                <Toaster position="top-left" />
            </ThemeProvider>
        </>
    );
}

export default App;

/* <Routes>
    <Route path="/" element={<AuthPage />} />
</Routes>; */
