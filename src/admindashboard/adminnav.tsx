import { useEffect, useState } from "react";
import { Group, Button, Burger, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/lehulumlogo-fotor-bg-remover.png";

interface NavSection {
  id: string;
  label: string;
  path: string;
}

const sections: NavSection[] = [
  { id: "home", label: "Home", path: "/admin/home" },
  { id: "apartments", label: "Apartments", path: "/admin/apartments" },
  { id: "news", label: "News & Updates", path: "/admin/news" },
  { id: "clients", label: "Client Requests", path: "/admin/requests" },
];

export default function AdminNavbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  // Set active section based on current path
  useEffect(() => {
    const currentSection = sections.find(section => 
      location.pathname.startsWith(section.path)
    )?.id || "home";
    setActiveSection(currentSection);
  }, [location.pathname]);

  const navigateToSection = (path: string) => {
    navigate(path);
    close(); // Close drawer on mobile
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 py-4 px-6">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigateToSection("/admin")}
        >
          <img src={Logo} alt="Lehulum Real Estate" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Group spacing="lg">
            {sections.map(({ id, label, path }) => (
              <button
                key={id}
                onClick={() => navigateToSection(path)}
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
            {sections.map(({ id, label, path }) => (
              <button
                key={id}
                onClick={() => navigateToSection(path)}
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