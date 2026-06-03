import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CheckLogs() {

    const [logs, setLogs] =
        useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const response =
                await API.get(
                    "/checklog"
                );

            setLogs(
                response.data.data
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
                    Check Logs
                </h1>

                <div className="space-y-3">

                    {
                        logs.map(
                            (log) => (

                                <div
                                    key={log._id}
                                    className="rounded-xl bg-white p-4 shadow"
                                >

                                    <p>
                                        Pass:
                                        {" "}
                                        {log.passId?._id}
                                    </p>

                                    <p>
                                        Check In:
                                        {" "}
                                        {
                                            log.checkInTime
                                                ? new Date(
                                                    log.checkInTime
                                                ).toLocaleString()
                                                : "-"
                                        }
                                    </p>

                                    <p>
                                        Check Out:
                                        {" "}
                                        {
                                            log.checkOutTime
                                                ? new Date(
                                                    log.checkOutTime
                                                ).toLocaleString()
                                                : "-"
                                        }
                                    </p>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default CheckLogs;