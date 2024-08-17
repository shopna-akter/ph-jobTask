import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const SocialLogin = () => {

    const handleSignInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            // eslint-disable-next-line no-unused-vars
            .then(result => {
                Swal.fire({
                    title: "Success!",
                    text: "Login successful with Google",
                    icon: "success"
                });
            })
            .catch(error => {
                console.log('Error during sign in:', error);
                Swal.fire({
                    title: "Login Failed with Google!",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleSignInWithGoogle} className="flex btn mb-2 w-full bg-yellow-300 hover:bg-orange-400">
                Sign in with <FaGoogle />
            </button>
        </div>
    );
};

export default SocialLogin;
