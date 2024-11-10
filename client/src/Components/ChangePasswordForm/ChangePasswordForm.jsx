import React from 'react'
import { useState } from "react";
import { Toaster, toast } from 'sonner';
import{useMutation} from 'react-query';
import apiUrl from '../../utils/apiUrl';




function ChangePasswordForm() {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async function(userObject){
      const response = await fetch(`${apiUrl}/user/update-password`, {
        method: "PATCH",
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
      console.log(data);
      return data;
    },

    onSuccess: () => {
      toast.success("Password changed successfully", {
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      })
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 3000,
      });
      return;
    }
    const userObject = {
      previousPassword,
      newPassword,
    };
    mutate(userObject);
  };

  return (
    <div>
      <div className="signup-container">
        <Toaster position="top-center" richColors expand={true} />
        <h2>Change Password</h2>
        <form className="signup-form">
        <label className="signup-label"> Previous Password:</label>

<input
  type="password"
  name="password"
  className="signup-input"
  placeholder="Enter your  previous password"
  value={previousPassword}
  onChange={(e) => setPreviousPassword(e.target.value)}
/>
<label className="signup-label">New Password:</label>

<input
  type="password"
  name="password"
  className="signup-input"
  placeholder="Enter your new password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
/>
          <label className="signup-label">Confirm New Password:</label>

          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="signup-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
          {
            isLoading ? "Changing Password..." : "Change Password"
          }
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm
