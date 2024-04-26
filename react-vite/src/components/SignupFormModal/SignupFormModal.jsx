import { useState, useEffect } from "react";
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
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(errors).length) {
      return null;
    }

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

  useEffect(() => {
    const err = {};
    setHasSubmitted(false);
    if (username.length < 4 || username.length > 15) err.username = 'Username must be 4-15 characters';
    if (email.length === 0) err.email = 'Email is required';
    if (first_name.length === 0) err.first_name = 'First Name is required';
    if (last_name.length === 0) err.last_name = 'Last Name is required';
    if (password.length < 8) err.password = 'Password must be 8-20 characters';
    if (confirmPassword.length < 8) err.confirmPassword = "Confirmed password must be 8-20 characters"
    setErrors(err);
  }, [username, email, first_name, last_name, password, confirmPassword])

  

  return (
    <>
      {hasSubmitted && errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
      <h1>Sign Up</h1>
        <div className="signup-label-container">
          <label>
            Email
          </label>
            <input
              className="signup-email-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>{hasSubmitted && errors.email && <p>{errors.email}</p>}</div>
          {/* {errors.email && <p>{errors.email}</p>} */}
        </div>

        <div className="signup-label-container">
          <label>
            Username
          </label>
            <input
              className="signup-username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div>{hasSubmitted && errors.username && <p>{errors.username}</p>}</div>
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>

        <div className="signup-label-container">
          <label>
            First Name
          </label>
            <input
            className="signup-first-name-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirst_Name(e.target.value)}
            required
            />
            <div>{hasSubmitted && errors.first_name && <p>{errors.first_name}</p>}</div>
          {/* {errors.first_name && <p>{errors.first_name}</p>} */}
        </div>

        <div className="signup-label-container">
          <label>
            Last Name
          </label>
            <input
            className="signup-last-name-input"
            type="text"
            value={last_name}
            onChange={(e) => setLast_Name(e.target.value)}
            required
            />
            <div>{hasSubmitted && errors.last_name && <p>{errors.last_name}</p>}</div>
          {/* {errors.last_name && <p>{errors.last_name}</p>} */}
        </div>

        <div className="signup-label-container">
          <label>
            Password
          </label>
            <input
              className="signup-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>{hasSubmitted && errors.password && <p>{errors.password}</p>}</div>
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>

        <div className="signup-label-container">
          <label>
            Confirm Password
          </label>
            <input
              className="signup-confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div>{hasSubmitted && errors.confirmPassword && <p>{errors.confirmPassword}</p>}</div>
          {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}

        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
