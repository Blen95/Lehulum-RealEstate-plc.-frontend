// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from "@mantine/core";
import './index.css';
import HomePage from "./pages/Home";
export default function App() {
  return (
    <MantineProvider
      theme={{}}
      defaultColorScheme="light"
    >
       <Navbar />
      <AppRoutes />
      <Footer />
    </MantineProvider>
    
  );
}
