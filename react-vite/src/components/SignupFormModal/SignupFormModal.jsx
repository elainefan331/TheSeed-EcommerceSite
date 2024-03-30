import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name,
        last_name,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
      <h1>Sign Up</h1>
        <label>
          Email
          <input
            className="signup-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            className="signup-username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          First Name
          <input
          className="signup-first-name-input"
          type="text"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
          required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label>
          Last Name
          <input
          className="signup-last-name-input"
          type="text"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}

        <label>
          Password
          <input
            className="signup-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            className="signup-confirm-password-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
