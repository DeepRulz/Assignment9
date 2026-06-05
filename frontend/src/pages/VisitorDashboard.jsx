import Navbar from "../components/Navbar";
function VisitorDashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">
                    Visitor Dashboard
                </h1>
                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="text-xl font-semibold">
                        Welcome Visitor
                    </h2>
                    <p className="mt-2">
                        You can view your appointments and visitor passes here.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default VisitorDashboard;