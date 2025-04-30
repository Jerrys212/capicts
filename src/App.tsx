import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./views/admin/Dashboard";
import Profile from "./views/admin/Profile";
import Contributions from "./views/admin/Contributions";
import Groups from "./views/admin/Groups";
import ConfirmToken from "./views/auth/ConfirmToken";
import Loans from "./views/admin/Loans";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/confirm-token" element={<ConfirmToken />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/contributions" element={<Contributions />} />
                    <Route path="/loans" element={<Loans />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
