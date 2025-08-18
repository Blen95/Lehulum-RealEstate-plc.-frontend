import { useEffect, useState } from "react";
import { Group, Button, Burger, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/lehulumlogo-fotor-bg-remover.png";


const sections = [
  { id: "home", label: "Home" },
  { id: "apartments", label: "Apartments" },
  { id: "news", label: "News & Updates" },
  { id: "clients", label: "Client requests" },
];

export default function AdminNavbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  // Detect section closest to top on scroll
useEffect(() => {
  const handleScroll = () => {
    if (location.pathname.startsWith("/news/")) {
      setActiveSection("news");
      return;
    }


    let closestId = sections[0].id;
    let closestDistance = Infinity;

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const distance = Math.abs(el.getBoundingClientRect().top - 80); 
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      }
    });

    setActiveSection(closestId);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); 
  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);


  // Scroll or navigate to section
const scrollToSection = (id: string) => {
  if (window.location.pathname !== "/") {
    navigate("/", { state: { targetId: id } });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  close(); // optional: close drawer
};


  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 py-4 px-6">
       <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img src={Logo} alt="Lehulum Real Estate" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Group spacing="lg">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-full transition font-medium
                  ${
                    activeSection === id
                      ? "shadow-md shadow-red-200 text-red-600"
                      : "text-gray-700"
                  }
                  hover:text-red-500`}
              >
                {label}
              </button>
            ))}
          </Group>

          
        </div>

        {/* Burger Button for Mobile */}
        <div className="md:hidden">
          <Burger opened={opened} onClick={toggle} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="80%"
        title="Menu"
        position="left"
      >
        <ScrollArea style={{ height: "100%" }}>
          <div className="flex flex-col space-y-4">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-full text-left transition font-medium
                  ${
                    activeSection === id
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700"
                  }
                  hover:text-red-500`}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </Drawer>
    </nav>
  );
}
