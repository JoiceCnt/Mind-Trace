import { useState, useEffect } from "react";
import axios from "axios";

function EditProfile() {
  const [profile, setProfile] = useState({ name: "", email: "" });

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
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Edit Profile</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSave} style={{ padding: "10px 20px" }}>
        Save
      </button>
    </div>
  );
}

export default EditProfile;
