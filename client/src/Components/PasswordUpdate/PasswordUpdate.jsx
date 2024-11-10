import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import apiBase from "../../utils/apiUrl.js";

import { Toaster, toast } from "sonner";
import userStoreDetails from "../../Store/userStoreDetails.js";

function PasswordUpdate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
 
  const user = userStoreDetails((state) => state.user);
  const setUser = userStoreDetails((state) => state.setUser); 
  const navigate = useNavigate();

  useEffect(()=> {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setUsername(user.username);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = {
      firstName,
      lastName,
      email,
      username,
    };

    mutate(updatedUser);
  }

  const { mutate, isLoading, isError} = useMutation({
    mutationFn: async function (userObject) {
      const response = await fetch(`${apiBase}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
        credentials: "include",
      })
      console.log(response);
      
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      setUser(data);
      toast.success("User information updated successfully", {
        duration: 3000,
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  })

  return (
    <div className="signup-container">
      <h2>User information Update</h2>
      <Toaster richColors position="top-center" />
      <form className="signup-form">
        <label className="signup-label">First Name:</label>
        <input
          type="text"
          name="firstName"
          className="signup-input"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="signup-label">Last Name:</label>
        <input
          type="text"
          name="lastName"
          className="signup-input"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="signup-label">Email:</label>
        <input
          type="email"
          name="email"
          className="signup-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="signup-label">Username:</label>
        <input
          type="text"
          name="username"
          className="signup-input"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          type="submit"
          className="signup-button"
          onClick={handleSubmit}
        >
          update user information
          {/* {isLoading ? "Loading..." : "update"} */}
        </button>
       
      </form>
    </div>
  );
}

export default PasswordUpdate;






