import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewsDetail from "../pages/newsdetail";
import { MantineProvider } from "@mantine/core";

export default function AppRoutes() {
  return (
    <MantineProvider
      theme={{}}
      defaultColorScheme="light"
    >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsDetail />} />
    </Routes>
    </MantineProvider>
  );
}
