// src/pages/admin/AdminLoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Paper, Title, Container, Notification } from "@mantine/core";
import axios from "axios";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (data.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", data.token);
        // Redirect to admin home/dashboard
        navigate("/admin/home");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container size={420} my={80}>
      <Title align="center" mb="xl">Admin Login</Title>
      <Paper shadow="sm" padding="lg" radius="md">
        {error && <Notification color="red" mb="sm">{error}</Notification>}
        <TextInput
          label="Email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="sm"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="sm"
        />
        <Button fullWidth mt="md" onClick={handleLogin}>Login</Button>
      </Paper>
    </Container>
  );
}
