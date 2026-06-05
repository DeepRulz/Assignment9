import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const login = async () => {

        try {

            const response =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success(
                "Login Successful"
            );

            navigate("/dashboard");

        } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Login Failed"
        );

    }

    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <div className="w-96 rounded-xl bg-white p-6 shadow">

                <h1 className="mb-6 text-center text-2xl font-bold">
                    Visitor Pass System
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="mb-4 w-full rounded border p-2"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 w-full rounded border p-2"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={login}
                    className="w-full rounded bg-blue-500 p-2 text-white"
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;