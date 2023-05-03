import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const id = e.currentTarget.id;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //If user account exists sign in and redirect home
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log("No User");
    }
  };

  return (
    <div className="lg:flex flex-col items-center justify-center lg:h-[80vh]">
      <div className="lg:bg-base-300 lg:p-12 lg:py-20 lg:shadow-2xl lg:rounded-xl animate__animated animate__fadeInUp">
        <header>
          <h3 className="text-3xl lg:text-5xl my-6 ml-3 font-bold text-primary">
            Welcome Back!
          </h3>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col mx-2 w-82 lg:w-96">
          <div className="emailDiv">
            <input
              onChange={onChange}
              type="email"
              placeholder="Email"
              id="email"
              className="input input-bordered input-primary-focus w-full "
            />
          </div>

          <div className="passwordDiv my-4 flex relative">
            <input
              onChange={onChange}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="input input-bordered input-primary-focus w-full "
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-3 cursor-pointer"
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
              )}
            </div>
          </div>

          <button className="btn lg:btn-info my-1" type="submit">
            Sign In
          </button>
          <Link
            to="/forgotPassword"
            className="text-primary font-bold my-2 ml-2"
          >
            Forgot Password?
          </Link>

          <Link className=" text-primary font-bold my-2 ml-2" to="/signUp">
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
