import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const DemoUserLogin = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
      <h1>Log In</h1>
      <div className="login-label-container">
        <label>
          Email
        </label>
          <input
            className="login-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
      </div>
        <div className="login-label-container">
        <label>
          Password
        </label>
        
          <input
            className="login-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" className="login-button">Log In</button>
        <button type="submit" className="demo-login-button" onClick={DemoUserLogin}>Log in as Demo User </button>
      </form>
    </>
  );
}

export default LoginFormModal;
