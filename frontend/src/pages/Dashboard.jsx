import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [visitorCount, setVisitorCount] =
        useState(0);

    const [appointmentCount,
        setAppointmentCount] =
        useState(0);

    const [passCount, setPassCount] =
        useState(0);

    const [checklogCount,
        setChecklogCount] =
        useState(0);

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

            setVisitorCount(
                visitors.data.data.length
            );

            setAppointmentCount(
                appointments.data.data.length
            );

            setPassCount(
                passes.data.data.length
            );

            setChecklogCount(
                logs.data.data.length
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

                </div>

            </div>

        </div>

    );

}

export default Dashboard;