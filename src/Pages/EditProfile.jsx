import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/EditProfile.css";

function EditProfile() {
  const [profile, setProfile] = useState({ id: "", name: "", email: "", birthDate: "" });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  const patientsId = localStorage.getItem("patientId");
  axios.get(`http://localhost:5005/patients/${patientsId}`)
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
    axios.put(`http://localhost:5005/patients/${profile.id}`, profile)
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

        <label>Birthday date:</label>
        {isEditing ? (
          <input
            type="date"
            name="birthday"
            value={profile.birthDate}
            onChange={handleChange}
            className="edit-input"
          />     
          ) : (
            <p className="edit-input">{profile.birthDate}</p>
        )}

      {isEditing ? (
        <>
          <button onClick={handleSave} className="edit-save-button">Save</button>
          <button onClick={handleCancel} className="edit-cancel-button">Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-save-button">Edit Profile</button>
      )}
    </div>
  );
}


export default EditProfile;
