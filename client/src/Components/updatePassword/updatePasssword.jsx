// import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import apiUrl from '../../utils/apiUrl';
import './AccountSettings.css';

function AccountSettings() {
  // Fetch user data for pre-populating the form
  const { data, isLoading, isError, error } = useQuery('userProfile', async () => {
    const response = await fetch(`${apiUrl}/user/profile`, { credentials: 'include' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  });

  // State for profile update form
  const [profile, setProfile] = useState({
    profilePhoto: '',
    phoneNumber: '',
    occupation: '',
    bio: '',
    statusText: '',
    secondaryEmail: '',
  });

  // State for personal information update form
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    if (data) {
      // Pre-populate form with existing data
      setProfile({
        profilePhoto: data.profilePhoto || '',
        phoneNumber: data.phoneNumber || '',
        occupation: data.occupation || '',
        bio: data.bio || '',
        statusText: data.statusText || '',
        secondaryEmail: data.secondaryEmail || '',
      });
      setPersonalInfo({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        username: data.username || '',
      });
    }
  }, [data]);

  // Mutation for updating profile
  const profileMutation = useMutation(
    async (updatedProfile) => {
      const response = await fetch(`${apiUrl}/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    }
  );

  // Mutation for updating personal info
  const personalInfoMutation = useMutation(
    async (updatedInfo) => {
      const response = await fetch(`${apiUrl}/user/personal-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedInfo),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    }
  );

  // Handlers for input changes
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Submit handlers
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    profileMutation.mutate(profile);
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    personalInfoMutation.mutate(personalInfo);
  };

  // Loading and Error States
  if (isLoading) return <div>Loading, please wait...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="account-settings-page">
      <h2>Account Settings</h2>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileSubmit} className="profile-update-form">
        <h3>Profile Update</h3>

        <label>Profile Photo</label>
        <input type="text" name="profilePhoto" value={profile.profilePhoto} onChange={handleProfileChange} />

        <label>Phone Number</label>
        <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleProfileChange} />

        <label>Occupation</label>
        <input type="text" name="occupation" value={profile.occupation} onChange={handleProfileChange} />

        <label>Bio</label>
        <textarea name="bio" value={profile.bio} onChange={handleProfileChange} />

        <label>Status Text</label>
        <input type="text" name="statusText" value={profile.statusText} onChange={handleProfileChange} />

        <label>Secondary Email (must be unique)</label>
        <input type="email" name="secondaryEmail" value={profile.secondaryEmail} onChange={handleProfileChange} />

        <button type="submit">Update Profile</button>
      </form>

      {/* Personal Information Update Form */}
      <form onSubmit={handlePersonalInfoSubmit} className="personal-info-update-form">
        <h3>Personal Information Update</h3>

        <label>First Name</label>
        <input type="text" name="firstName" value={personalInfo.firstName} onChange={handlePersonalInfoChange} required />

        <label>Last Name</label>
        <input type="text" name="lastName" value={personalInfo.lastName} onChange={handlePersonalInfoChange} required />

        <label>Email Address (must be unique)</label>
        <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} required />

        <label>Username (must be unique)</label>
        <input type="text" name="username" value={personalInfo.username} onChange={handlePersonalInfoChange} required />

        <button type="submit">Update Personal Information</button>
      </form>
    </div>
  );
}

export default AccountSettings;
