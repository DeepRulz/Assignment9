import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [visitorId, setVisitorId] = useState("");
    const [purpose, setPurpose] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const loadData = async () => {
        try {
            const visitorResponse = await API.get("/visitors");
            setVisitors(visitorResponse.data.data);
            const appointmentResponse = await API.get("/appointments");
            setAppointments(appointmentResponse.data.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load data"
            );
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const createAppointment = async () => {
        try {

            await API.post("/appointments", {
                visitorId,
                purpose,
                visitDate
            });

            setVisitorId("");
            setPurpose("");
            setVisitDate("");

            loadData();

            toast.success(
                "Appointment Created"
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create appointment"
            );

        }
    };

    const approveAppointment = async (id) => {
        try {
            await API.patch(`/appointments/${id}/approve`);
            loadData();
        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to approve appointment"
            );

        }
    };

    const rejectAppointment = async (id) => {
        try {
            await API.patch(`/appointments/${id}/reject`);
            loadData();
        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to reject appointment"
            );

        }
    };

    const exportCSV = () => {
        const headers = ["Visitor", "Host", "Purpose", "Visit Date", "Status"];
        const rows = appointments.map((appointment) => [
            appointment.visitorId?.name,
            appointment.hostId?.name,
            appointment.purpose,
            new Date(appointment.visitDate).toLocaleDateString(),
            appointment.status,
        ]);
        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "appointments.csv";
        link.click();
    };
return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-6">

                <h1 className="mb-6 text-3xl font-bold">
                    Appointments
                </h1>

                <div className="mb-6 rounded-xl bg-white p-4 shadow">

                    <div className="grid gap-3 md:grid-cols-3">

                        <select
                            value={visitorId}
                            onChange={(e) =>
                                setVisitorId(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        >

                            <option value="">
                                Select Visitor
                            </option>

                            {
                                visitors.map(
                                    (visitor) => (

                                        <option
                                            key={visitor._id}
                                            value={visitor._id}
                                        >
                                            {visitor.name}
                                        </option>

                                    )
                                )
                            }

                        </select>

                        <input
                            type="text"
                            placeholder="Purpose"
                            value={purpose}
                            onChange={(e) =>
                                setPurpose(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                        <input
                            type="date"
                            value={visitDate}
                            onChange={(e) =>
                                setVisitDate(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                    </div>

                    <button
                        onClick={
                            createAppointment
                        }
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Create Appointment
                    </button>

                </div>
                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                    className="mb-4 rounded border p-2"
                >

                    <option value="all">
                        All Appointments
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="rejected">
                        Rejected
                    </option>

                </select>
                <button
                    onClick={exportCSV}
                    className="mb-4 ml-3 rounded bg-purple-500 px-4 py-2 text-white"
                >
                    Export CSV
                </button>
                <div className="space-y-3">

                    {
                        appointments
                            .filter(
                                (appointment) =>

                                    statusFilter ===
                                    "all"

                                        ? true

                                        : appointment.status ===
                                        statusFilter
                            )
                            .map(
                            (appointment) => (

                                <div
                                    key={appointment._id}
                                    className="rounded-xl bg-white p-4 shadow"
                                >

                                    <h2 className="text-lg font-bold">
                                        {
                                            appointment
                                                .visitorId
                                                ?.name
                                        }
                                    </h2>

                                    <p className="text-gray-600">
                                        Purpose: {
                                        appointment
                                            .purpose
                                    }
                                    </p>

                                    <p className="text-gray-600">
                                        Host: {
                                        appointment
                                            .hostId
                                            ?.name
                                    }
                                    </p>

                                    <p className="text-gray-600">
                                        Visit Date: {
                                        new Date(
                                            appointment.visitDate
                                        ).toLocaleDateString()
                                    }
                                    </p>

                                    <p className="mt-1 font-medium">
                                        Status: {
                                        appointment
                                            .status
                                    }
                                    </p>

                                    <div className="mt-3 flex gap-2">

                                        <button
                                            onClick={() =>
                                                approveAppointment(
                                                    appointment._id
                                                )
                                            }
                                            className="rounded bg-green-500 px-3 py-1 text-white"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                rejectAppointment(
                                                    appointment._id
                                                )
                                            }
                                            className="rounded bg-red-500 px-3 py-1 text-white"
                                        >
                                            Reject
                                        </button>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}
export default Appointments;