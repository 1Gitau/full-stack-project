import React from "react";

export default function Login() {
  return (
    <div>
      <div className="signup-container">
        <h2>Welcome back!</h2>
        <form className="signup-form">
          <label className="signup-label">Username/Email</label>
          <input
            type="text"
            name="usernameOrEmail"
            className="signup-input"
            placeholder="Enter a username or email"
          />
          <label className="signup-label">Password:</label>

          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Enter your password"
          />
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
