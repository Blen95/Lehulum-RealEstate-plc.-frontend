// src/pages/admin/AdminLoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
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
        localStorage.setItem("authToken", data.token);
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
      <Title
        align="center"
        mb="lg"
        className="text-3xl font-bold text-gray-800"
      >
        Admin Login
      </Title>

      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        className="bg-white"
      >
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Login Error"
            color="red"
            mb="md"
            withCloseButton
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <TextInput
          label="Email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          mb="sm"
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mb="md"
        />

        <Button
          fullWidth
          size="md"
          radius="xl"
          color="red"
          onClick={handleLogin}
          className="font-semibold shadow-sm hover:shadow-md transition-all"
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}
