import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);

    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        })
        .then(result => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged out!",
                            text: "You have been successfully logged out.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `Failed to log out: ${error.message}`,
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {user ? (
                                <button onClick={handleSignOut} className="btn bg-orange-400 hover:bg-orange-600">Sign Out</button>
                            ) : null}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {user ? (
                            <button onClick={handleSignOut} className="btn bg-orange-400 hover:bg-orange-600">Sign Out</button>
                        ) : null}
                    </ul>
                </div>
                <div className="navbar-end">
                    {!user && (
                        <>
                            <NavLink to='/Register' className="btn mr-2 btn-ghost">Register</NavLink>
                            <NavLink to='/Login' className="btn mr-2 btn-ghost">Login</NavLink>
                        </>
                    )}
                    {
                        user && (
                            <>
                                <img
                                    className='h-9 w-9 rounded-full mt-2 mr-2' src='https://i.ibb.co/yWR8BCV/user.png' alt="" />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
