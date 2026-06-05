import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
function VisitorDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [passes, setPasses] = useState([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            const appointmentResponse =
                await API.get(
                    "/appointments"
                );
            const passResponse =
                await API.get(
                    "/passes"
                );
            setAppointments(
                appointmentResponse.data.data
            );
            setPasses(
                passResponse.data.data
            );
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    Visitor Dashboard
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            My Appointments
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {appointments.length}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            My Passes
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {passes.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VisitorDashboard;