import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Rate } from "./pages/Rate";
import { Spin } from "./pages/Spin";
import PrivateRoute from "./components/PrivateRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [active, setActive] = useLocalStorage("active", []);

  return (
    <>
      <Navbar setActive={setActive} />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={<Home active={active} setActive={setActive} />}
          />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/rate"
          element={<Rate active={active} setActive={setActive} />}
        />
        <Route
          path="/spin"
          element={<Spin active={active} setActive={setActive} />}
        />
      </Routes>
    </>
  );
}

export default App;
