import { BrowserRouter, Route, Routes } from "react-router-dom";
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
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/confirm-token" element={<ConfirmToken />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/profile" index element={<Profile />} />
                    <Route path="/groups" index element={<Groups />} />
                    <Route path="/contributions" index element={<Contributions />} />
                    <Route path="/loans" index element={<Loans />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
