import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function VisitorDashboard() {

    const [appointments, setAppointments] = useState([]);
    const [passes, setPasses] = useState([]);
    const [purpose, setPurpose] = useState("");
    const [visitDate, setVisitDate] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const appointmentResponse =
                await API.get("/appointments");

            const passResponse =
                await API.get("/passes");

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

    const createAppointment = async () => {

        try {

            await API.post(
                "/appointments",
                {
                    visitorId: "TEMP_VISITOR",
                    purpose,
                    visitDate
                }
            );

            alert(
                "Appointment Request Submitted"
            );

            setPurpose("");
            setVisitDate("");

            loadData();

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create appointment"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-6">

                <h1 className="mb-6 text-3xl font-bold">
                    Visitor Dashboard
                </h1>

                <div className="mb-6 rounded-xl bg-white p-4 shadow">

                    <h2 className="mb-3 text-xl font-semibold">
                        Request Appointment
                    </h2>

                    <input
                        type="text"
                        placeholder="Purpose"
                        value={purpose}
                        onChange={(e) =>
                            setPurpose(e.target.value)
                        }
                        className="mb-3 w-full rounded border p-2"
                    />

                    <input
                        type="date"
                        value={visitDate}
                        onChange={(e) =>
                            setVisitDate(e.target.value)
                        }
                        className="mb-3 w-full rounded border p-2"
                    />

                    <button
                        onClick={createAppointment}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Submit Request
                    </button>

                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2">

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

                <h2 className="mb-3 text-xl font-semibold">
                    Appointment Requests
                </h2>

                <div className="space-y-3">

                    {appointments.map((appointment) => (

                        <div
                            key={appointment._id}
                            className="rounded-xl bg-white p-4 shadow"
                        >

                            <p>
                                Purpose: {appointment.purpose}
                            </p>

                            <p>
                                Status: {appointment.status}
                            </p>

                            <p>
                                Date: {new Date(
                                appointment.visitDate
                            ).toLocaleDateString()}
                            </p>

                        </div>

                    ))}

                </div>

                <h2 className="mt-8 mb-3 text-xl font-semibold">
                    Passes
                </h2>

                <div className="space-y-3">

                    {passes.map((pass) => (

                        <div
                            key={pass._id}
                            className="rounded-xl bg-white p-4 shadow"
                        >

                            <p>
                                Pass ID: {pass._id}
                            </p>

                            <p>
                                Valid Till: {new Date(
                                pass.validTill
                            ).toLocaleDateString()}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default VisitorDashboard;