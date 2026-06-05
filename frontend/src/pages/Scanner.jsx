import { useState } from "react";
import { toast } from "react-toastify";
import { QrReader } from "react-qr-reader";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Scanner() {

    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");

    const handleScan = async (scanResult) => {

        if (!scanResult) {
            return;
        }

        try {

            const qrData = scanResult.text;

            setResult(qrData);

            const response = await API.post(
                "/checklog/scan",
                { qrData }
            );

            setMessage(response.data.message);

            toast.success(
                response.data.message
            );

        }
        catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                "Scan Failed";

            setMessage(errorMessage);

            toast.error(errorMessage);

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
                            facingMode: "environment"
                        }}
                        onResult={(result) => {

                            if (result) {
                                handleScan(result);
                            }

                        }}
                        style={{
                            width: "100%"
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