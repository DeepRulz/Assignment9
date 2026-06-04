import { Link } from "react-router-dom";

function Navbar() {
    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        window.location.href =
            "/";

    };
    return (

        <nav className="bg-blue-600 p-4 text-white">

            <div className="flex gap-6">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/visitors">
                    Visitors
                </Link>

                <Link to="/appointments">
                    Appointments
                </Link>

                <Link to="/passes">
                    Passes
                </Link>
                
                <Link to="/checklogs">
                    Check Logs
                </Link>
                <Link to="/scanner">
                    Scanner
                </Link>
                <button
                    onClick={logout}
                    className="rounded bg-red-500 px-3 py-1 text-white"
                >
                    Logout
                </button>
            </div>

        </nav>

    );

}

export default Navbar;