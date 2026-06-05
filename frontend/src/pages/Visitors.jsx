import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Visitors() {
    const [visitors, setVisitors] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [photo, setPhoto] = useState(null);
    const [search, setSearch] = useState("");

    const loadVisitors = async () => {
        try {
            const response = await API.get("/visitors");
            setVisitors(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load visitors");
        }
    };

    useEffect(() => {
        loadVisitors();
    }, []);

    const searchVisitors = async (query) => {
        try {
            if (!query) {
                loadVisitors();
                return;
            }
            const response = await API.get(`/visitors/search?q=${query}`);
            setVisitors(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Search failed");
        }
    };

    const addVisitor = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("company", company);
            if (photo) formData.append("photo", photo);

            await API.post("/visitors", formData);

            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            setPhoto(null);
            loadVisitors();
            toast.success("Visitor Added Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add visitor");
        }
    };

    const deleteVisitor = async (id) => {
        try {
            await API.delete(`/visitors/${id}`);
            loadVisitors();
            toast.success("Visitor Deleted");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete visitor");
        }
    };
    const exportCSV = () => {

        const headers = [
            "Name",
            "Email",
            "Phone",
            "Company"
        ];

        const rows = visitors.map((visitor) => [
            visitor.name,
            visitor.email,
            visitor.phone,
            visitor.company
        ]);

        const csvContent =
            [headers, ...rows]
                .map((row) => row.join(","))
                .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv"
            }
        );
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "visitors.csv";
        link.click();
        toast.success("Visitors CSV Exported");
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Visitors</h1>
                <div className="mb-6 rounded-xl bg-white p-4 shadow">
                    <input
                        type="text"
                        placeholder="Search by name, email or company"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            searchVisitors(e.target.value);
                        }}
                        className="mb-4 w-full rounded border p-2"
                    />
                    <div className="grid gap-3 md:grid-cols-5">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded border p-2" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border p-2" />
                        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded border p-2" />
                        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="rounded border p-2" />
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="rounded border p-2" />
                    </div>
                    <button onClick={addVisitor} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Add Visitor</button>
                    <button onClick={exportCSV} className="ml-3 mt-4 rounded bg-purple-500 px-4 py-2 text-white">Export CSV</button>
                </div>
                <div className="space-y-3">
                    {visitors.map((visitor) => (
                        <div key={visitor._id} className="rounded-xl bg-white p-4 shadow">
                            {visitor.photo && (
                                <img
                                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${visitor.photo}`}
                                    alt="visitor"
                                    className="mb-3 h-20 w-20 rounded-full object-cover"
                                />
                            )}
                            <h2 className="font-bold">{visitor.name}</h2>
                            <p>{visitor.email}</p>
                            <p>{visitor.phone}</p>
                            <p>{visitor.company}</p>
                            <button onClick={() => deleteVisitor(visitor._id)} className="mt-3 rounded bg-red-500 px-3 py-1 text-white">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Visitors;