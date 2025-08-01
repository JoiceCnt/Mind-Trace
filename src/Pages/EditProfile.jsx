import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/EditProfile.css";

function EditProfile() {
  const [profile, setProfile] = useState({ name: "", email: "", birthday: "" });

  useEffect(() => {
    // Simulamos una carga de datos del perfil actual
    const patientsId = localStorage.getItem("user"); // o donde guardes tu info
    axios.get(`http://localhost:5005/patients/${patientsId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error loading profile", err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5005/patients/${profile.id}`, profile)
      .then(() => alert("Profile updated!"))
      .catch((err) => console.error("Update failed", err));
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>

      <label className="edit-label">Name:</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        className="edit-input"
      />
      <label className="edit-label">Email:</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        className="edit-input"
      />
      <label className="edit-label">Birthday date:</label>
      <input
        type="date"
        name="birthday"
        value={profile.birthday}
        onChange={handleChange}
        className="edit-input"
      />     
      <button onClick={handleSave} className="edit-save-button">
        Save
      </button>
    </div>
  );
}

export default EditProfile;
