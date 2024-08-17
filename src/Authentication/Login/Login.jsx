import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import groovyWalkAnimation from "../../../Animation - 1715749319003.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import SocialLogin from "../SocialLogin/SocialLogin";
const Login = () => {
    const { SignIn } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        SignIn(email, password)
            .then(result => {
                console.log(result);
                Swal.fire({
                    title: "Success!",
                    text: "Login successful",
                    icon: "success"
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Login Failed!",
                    text: `${error.message}`,
                    icon: "error"
                })
            })
    }
    return (
        <div>
            <div className="hero min-h-screen ">
                <Helmet>
                    <title>|| Login</title>
                </Helmet>
                <div className="hero-content flex-col lg:flex-row">
                    <Lottie
                        animationData={groovyWalkAnimation}
                        aria-aria-labelledby="use lottie animation"
                    />
                    <div className="card shrink-0 text-center w-full max-w-sm shadow-2xl bg-base-100">
                        <h2 className="text-4xl font-bold mt-2">Login!!</h2>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="rounded-md relative w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                <div className="form-control mt-6">
                                    <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Login</button>
                                </div>
                                <SocialLogin></SocialLogin>
                                <h2>Dont have an account ? <Link to='/Register' className="btn-link">Register</Link></h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;