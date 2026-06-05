import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Passes from "./pages/Passes";
import CheckLogs from "./pages/CheckLogs";
import Scanner from "./pages/Scanner";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/visitors"
                    element={
                        <ProtectedRoute>
                            <Visitors />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/passes"
                    element={
                        <ProtectedRoute>
                            <Passes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checklogs"
                    element={
                        <ProtectedRoute>
                            <CheckLogs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/scanner"
                    element={
                        <ProtectedRoute>
                            <Scanner />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>

    );

}

export default App;