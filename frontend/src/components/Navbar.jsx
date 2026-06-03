import { Link } from "react-router-dom";

function Navbar() {

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

            </div>

        </nav>

    );

}

export default Navbar;