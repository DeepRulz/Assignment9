import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Visitors() {

    const [visitors, setVisitors] =
        useState([]);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [company, setCompany] =
        useState("");

    const loadVisitors = async () => {

        try {

            const response =
                await API.get(
                    "/visitors"
                );

            setVisitors(
                response.data.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadVisitors();

    }, []);

    const addVisitor = async () => {

        try {

            await API.post(
                "/visitors",
                {
                    name,
                    email,
                    phone,
                    company
                }
            );

            setName("");
            setEmail("");
            setPhone("");
            setCompany("");

            loadVisitors();

        }
        catch (error) {

            console.log(error);

        }

    };

    const deleteVisitor =
        async (id) => {

            try {

                await API.delete(
                    `/visitors/${id}`
                );

                loadVisitors();

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
                    Visitors
                </h1>

                <div className="mb-6 rounded-xl bg-white p-4 shadow">

                    <div className="grid gap-3 md:grid-cols-4">

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                        <input
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) =>
                                setCompany(
                                    e.target.value
                                )
                            }
                            className="rounded border p-2"
                        />

                    </div>

                    <button
                        onClick={addVisitor}
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Add Visitor
                    </button>

                </div>

                <div className="space-y-3">

                    {
                        visitors.map(
                            (visitor) => (

                                <div
                                    key={visitor._id}
                                    className="rounded-xl bg-white p-4 shadow"
                                >

                                    <h2 className="font-bold">
                                        {visitor.name}
                                    </h2>

                                    <p>
                                        {visitor.email}
                                    </p>

                                    <p>
                                        {visitor.phone}
                                    </p>

                                    <p>
                                        {visitor.company}
                                    </p>

                                    <button
                                        onClick={() =>
                                            deleteVisitor(
                                                visitor._id
                                            )
                                        }
                                        className="mt-3 rounded bg-red-500 px-3 py-1 text-white"
                                    >
                                        Delete
                                    </button>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Visitors;