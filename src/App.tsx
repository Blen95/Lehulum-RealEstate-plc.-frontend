// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css'; // 👈 add this for notifications

import { Button, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications"; // 👈 provider
import { notifications } from "@mantine/notifications";

export default function App() {
  return (
    <MantineProvider>
      {/* Notifications provider must be inside MantineProvider */}
      <Notifications position="top-right" zIndex={1000} /> 


      <AppRoutes />

  
    </MantineProvider>
  );
}
