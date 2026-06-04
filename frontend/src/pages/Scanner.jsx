import { useState } from "react";
import { QrReader } from "react-qr-reader";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Scanner() {

    const [result, setResult] =
        useState("");

    const [message, setMessage] =
        useState("");

    const handleScan =
        async (scanResult) => {

            if (!scanResult) {

                return;

            }

            try {

                const qrData =
                    scanResult?.text;

                setResult(
                    qrData
                );

                const passesResponse =
                    await API.get(
                        "/passes"
                    );

                const pass =
                    passesResponse.data.data.find(
                        (pass) =>
                            pass.qrData ===
                            qrData
                    );

                if (!pass) {

                    setMessage(
                        "Pass not found"
                    );

                    return;

                }

                await API.post(
                    `/checklog/checkin/${pass._id}`
                );

                setMessage(
                    "Visitor Checked In Successfully"
                );

            }
            catch (error) {

                console.log(error);

                setMessage(
                    "Check In Failed"
                );

            }

        };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-6">

                <h1 className="mb-6 text-3xl font-bold">
                    QR Scanner
                </h1>

                <div className="rounded-xl bg-white p-4 shadow">

                    <QrReader
                        constraints={{
                            facingMode:
                                "environment"
                        }}
                        onResult={(
                            result,
                            error
                        ) => {

                            if (result) {

                                handleScan(
                                    result
                                );

                            }

                        }}
                        style={{
                            width:
                                "100%"
                        }}
                    />

                </div>

                <div className="mt-6">

                    <p className="font-semibold">
                        QR Data:
                    </p>

                    <p>
                        {result}
                    </p>

                    <p className="mt-4 font-semibold">
                        Status:
                    </p>

                    <p>
                        {message}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Scanner;