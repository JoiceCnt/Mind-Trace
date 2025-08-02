import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePatient() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5005/patients", formData);
      alert("Patient created successfully!");
      navigate("/professional-home");
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Create a New Patient</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
}

export default CreatePatient;
