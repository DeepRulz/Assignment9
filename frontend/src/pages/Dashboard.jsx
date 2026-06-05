import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Dashboard() {

    const [visitorCount, setVisitorCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [passCount, setPassCount] = useState(0);
    const [checklogCount, setChecklogCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [todayCheckins, setTodayCheckins] = useState(0);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const visitors =
                await API.get(
                    "/visitors"
                );
            const appointments =
                await API.get(
                    "/appointments"
                );
            const passes =
                await API.get(
                    "/passes"
                );
            const logs =
                await API.get(
                    "/checklog"
                );
            setVisitorCount(visitors.data.data.length);
            setAppointmentCount(appointments.data.data.length);
            setPassCount(passes.data.data.length);
            setChecklogCount(logs.data.data.length);
            setApprovedCount(
                appointments.data.data.filter(
                    (a) =>
                        a.status ===
                        "approved"
                ).length
            );

            setRejectedCount(
                appointments.data.data.filter(
                    (a) =>
                        a.status ===
                        "rejected"
                ).length
            );

            setPendingCount(
                appointments.data.data.filter(
                    (a) =>
                        a.status ===
                        "pending"
                ).length
            );
            const today = new Date().toDateString();
            setTodayCheckins(
                logs.data.data.filter(
                    (log) =>
                        log.checkInTime &&
                        new Date(
                            log.checkInTime
                        ).toDateString() ===
                        today
                ).length
            );
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard data"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    Dashboard
                </h1>
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            Visitors
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {visitorCount}
                        </p>

                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">

                        <h2 className="text-lg font-semibold">
                            Appointments
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {appointmentCount}
                        </p>

                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">

                        <h2 className="text-lg font-semibold">
                            Passes
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {passCount}
                        </p>

                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">

                        <h2 className="text-lg font-semibold">
                            Check Logs
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {checklogCount}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            Approved
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {approvedCount}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            Rejected
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {rejectedCount}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            Pending
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {pendingCount}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">
                            Today's Check-ins
                        </h2>
                        <p className="mt-2 text-3xl font-bold">
                            {todayCheckins}
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;