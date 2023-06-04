import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert("Sent");
      navigate("/sign-in");
    } catch (error) {
      console.log("cant find email");
    }
  };

  return (
    <div className="lg:flex flex-col items-center justify-center lg:h-[90vh] overflow-hidden">
      <div className="lg:bg-base-300 lg:p-12 lg:py-10 lg:shadow-2xl lg:rounded-xl animate__animated animate__fadeIn border-accent lg:border-[1px]">
        <header>
          <h3 className="text-3xl lg:text-5xl mb-3 sm:mb-6 mt-4 sm:mt-0 ml-3 sm:ml-0 sm:text-center font-bold text-accent">
            Forgot Password
          </h3>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col mx-2 w-82 lg:w-96">
          <div className="emailDiv">
            <input
              defaultValue={email}
              onChange={onChange}
              type="email"
              placeholder="Email"
              id="email"
              className="input input-bordered text-primary input-primary-focus w-full "
            />
          </div>

          <div className="flex text-secondary hover:text-accent text-xl">
            <div className="signInText ml-1 mt-3 cursor-pointer">
              Send Reset Link
            </div>
            <button className="signInButton">
              <i className=" fa-solid fa-arrow-right mt-4 px-2 "></i>
            </button>
          </div>
          <Link
            className="text-secondary hover:text-accent text-lg ml-1 mt-1"
            to="/sign-In"
          >
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
