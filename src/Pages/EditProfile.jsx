import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/EditProfile.css";

function EditProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    email: "",
    birthDate: "",
  });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const patientsId = localStorage.getItem("patientId");
    axios
      .get(`${import.meta.env.VITE_JSONSERVER_URL}/patients/${patientsId}`)
      .then((res) => {
        setProfile(res.data);
        setOriginalProfile(res.data);
      })
      .catch((err) => console.error("Error loading profile", err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`${import.meta.env.VITE_JSONSERVER_URL}/patients/${profile.id}`, profile)
      .then(() => {
        alert("Profile updated!");
        setIsEditing(false);
        setOriginalProfile(profile);
      })
      .catch((err) => console.error("Update failed", err));
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <h2 className="edit-profile-title">My Profile</h2>

        <label className="edit-label">Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <p className="edit-input">{profile.name}</p>
        )}

        <label className="edit-label">Username:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <p className="edit-input">{profile.username}</p>
        )}

        <label className="edit-label">Password:</label>
        {isEditing ? (
          <input
            type="text"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <p className="edit-input">{profile.password}</p>
        )}

        <label className="edit-label">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <p className="edit-input">{profile.email}</p>
        )}

        <label className="edit-label">Birthday date:</label>
        {isEditing ? (
          <input
            type="date"
            name="birthDate"
            value={profile.birthDate}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <p className="edit-input">{profile.birthDate}</p>
        )}

        {isEditing ? (
          <>
            <button onClick={handleSave} className="edit-save-button">
              Save
            </button>
            <button onClick={handleCancel} className="edit-cancel-button">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-save-button">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
