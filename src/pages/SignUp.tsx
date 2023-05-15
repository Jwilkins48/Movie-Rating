import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface formInfoProps {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<formInfoProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

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
    if (password == confirmPassword) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password!
        );
        const user = userCredential.user;
        updateProfile(auth.currentUser!, { displayName: name });

        //Copy info without password to store
        const formDataCopy = { ...formData };
        delete formDataCopy.password;

        await setDoc(doc(db, "users", user.uid), formDataCopy);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords must match");
    }
  };

  return (
    <div className="lg:flex flex-col items-center justify-center lg:h-[90vh] overflow-hidden">
      <div className="lg:bg-base-300 lg:p-12 lg:py-20 lg:shadow-2xl lg:rounded-xl animate__animated animate__fadeIn animate border-accent lg:border-[1px]">
        <header>
          <h3 className="text-3xl lg:text-5xl my-6 ml-3 font-bold text-primary">
            Welcome!
          </h3>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col mx-2 w-82 lg:w-96">
          <div className="nameDiv">
            <input
              onChange={onChange}
              type="text"
              placeholder="Name"
              id="name"
              className="input input-bordered input-primary-focus w-full mb-4"
            />
          </div>

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

          <div className="passwordDiv mb-4 flex relative">
            <input
              onChange={onChange}
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered input-primary-focus w-full "
            />
          </div>

          <button className="btn lg:btn-info my-1" type="submit">
            Sign Up
          </button>
          <Link
            to="/forgot-password"
            className="text-primary font-bold my-2 ml-2"
          >
            Forgot Password?
          </Link>

          <Link className=" text-primary font-bold my-2 ml-2" to="/sign-in">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
