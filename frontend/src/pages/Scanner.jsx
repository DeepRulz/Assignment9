import { useState } from "react";
import { toast } from "react-toastify";
import { Scanner as QRScanner } from "@yudiel/react-qr-scanner";
import API from "../services/api";
import Navbar from "../components/Navbar";
function Scanner() {
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const handleScan = async (scanResult) => {
        if (!scanResult || isScanning) {
            return;
        }
        setIsScanning(true);
        try {
            const qrData = scanResult.text;
            setResult(qrData);
            const response = await API.post(
                "/checklog/scan",
                { qrData }
            );
            setMessage(response.data.message);
            toast.success(response.data.message);
        }
        catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Scan Failed";
            setMessage(errorMessage);
            toast.error(errorMessage);
        }
        setTimeout(() => {
            setIsScanning(false);
        }, 5000);
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    QR Scanner
                </h1>
                <div className="rounded-xl bg-white p-4 shadow">
                    {
                        !isScanning ? (
                            <QRScanner
                                onScan={(result) => {
                                    if (
                                        result &&
                                        result.length > 0
                                    ) {
                                        handleScan({
                                            text: result[0].rawValue
                                        });
                                    }
                                }}
                            />
                        ) : (
                            <div className="p-10 text-center">
                                <p className="text-lg font-semibold">
                                    Processing Scan...
                                </p>
                                <p className="mt-2 text-gray-500">
                                    Please move the QR code away from the camera.
                                </p>
                            </div>
                        )
                    }
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
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
export default Scanner;