import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Passes() {

    const [appointments, setAppointments] =
        useState([]);

    const [passes, setPasses] =
        useState([]);

    const loadData = async () => {

        try {

            const appointmentResponse =
                await API.get(
                    "/appointments"
                );

            const approvedAppointments =
                appointmentResponse.data.data.filter(
                    (appointment) =>
                        appointment.status ===
                        "approved"
                );

            setAppointments(
                approvedAppointments
            );

            const passResponse =
                await API.get(
                    "/passes"
                );

            setPasses(
                passResponse.data.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    const generatePass =
        async (appointmentId) => {

            try {

                await API.post(
                    `/passes/generate/${appointmentId}`
                );

                loadData();

            }
            catch (error) {

                console.log(error);

            }

        };

    const checkIn =
        async (passId) => {

            try {

                await API.post(
                    `/checklog/checkin/${passId}`
                );

                alert("Visitor Checked In");

            }
            catch (error) {

                console.log(error);

            }

        };

    const checkOut =
        async (passId) => {

            try {

                await API.post(
                    `/checklog/checkout/${passId}`
                );

                alert("Visitor Checked Out");

            }
            catch (error) {

                console.log(error);

            }

        };

    const downloadPdf =
        (passId) => {

            window.open(
                `${import.meta.env.VITE_API_URL}/passes/pdf/${passId}`,
                "_blank"
            );

        };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-6">

                <h1 className="mb-6 text-3xl font-bold">
                    Passes
                </h1>

                <h2 className="mb-3 text-xl font-semibold">
                    Approved Appointments
                </h2>

                <div className="mb-8 space-y-3">

                    {
                        appointments.map(
                            (appointment) => {

                                const passExists =
                                    passes.some(
                                        (pass) =>
                                            pass.appointmentId?._id ===
                                            appointment._id
                                    );

                                return (

                                    <div
                                        key={appointment._id}
                                        className="rounded-xl bg-white p-4 shadow"
                                    >

                                        <h3 className="font-bold">
                                            {
                                                appointment
                                                    .visitorId
                                                    ?.name
                                            }
                                        </h3>

                                        <p>
                                            {
                                                appointment
                                                    .purpose
                                            }
                                        </p>

                                        <p>
                                            {
                                                new Date(
                                                    appointment.visitDate
                                                ).toLocaleDateString()
                                            }
                                        </p>

                                        {
                                            !passExists &&

                                            <button
                                                onClick={() =>
                                                    generatePass(
                                                        appointment._id
                                                    )
                                                }
                                                className="mt-2 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                Generate Pass
                                            </button>
                                        }

                                    </div>

                                );

                            }
                        )
                    }

                </div>

                <h2 className="mb-3 text-xl font-semibold">
                    Generated Passes
                </h2>

                <div className="space-y-3">

                    {
                        passes.map(
                            (pass) => (

                                <div
                                    key={pass._id}
                                    className="rounded-xl bg-white p-4 shadow"
                                >

                                    <p>
                                        Pass ID:
                                        {" "}
                                        {pass._id}
                                    </p>

                                    <p>
                                        Valid Till:
                                        {" "}
                                        {
                                            new Date(
                                                pass.validTill
                                            ).toLocaleDateString()
                                        }
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                        <button
                                            onClick={() =>
                                                downloadPdf(
                                                    pass._id
                                                )
                                            }
                                            className="rounded bg-blue-500 px-3 py-1 text-white"
                                        >
                                            Download PDF
                                        </button>

                                        <button
                                            onClick={() =>
                                                checkIn(
                                                    pass._id
                                                )
                                            }
                                            className="rounded bg-green-500 px-3 py-1 text-white"
                                        >
                                            Check In
                                        </button>

                                        <button
                                            onClick={() =>
                                                checkOut(
                                                    pass._id
                                                )
                                            }
                                            className="rounded bg-yellow-500 px-3 py-1 text-white"
                                        >
                                            Check Out
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

export default Passes;