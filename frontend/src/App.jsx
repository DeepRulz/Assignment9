import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Passes from "./pages/Passes";

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
                    element={<Dashboard />}
                />

                <Route
                    path="/visitors"
                    element={<Visitors />}
                />

                <Route
                    path="/appointments"
                    element={<Appointments />}
                />

                <Route
                    path="/passes"
                    element={<Passes />}
                />

                <Route
                    path="/checklogs"
                    element={<CheckLogs />}
                />
            </Routes>

        </BrowserRouter>

    );

}

export default App;