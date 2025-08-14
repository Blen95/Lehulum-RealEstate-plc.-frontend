import { useEffect, useState } from "react";
import { Group, Button } from "@mantine/core";
import Logo from '../assets/lehulumlogo-fotor-bg-remover.png';

const sections = [
  { id: "home", label: "Home" },
   { id: "story", label: "Our Story" },
  { id: "apartments", label: "Apartments" },
  { id: "news", label: "News & Updates" },
   { id: "contact", label: "Contact Us" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
         console.log("Observer running..."); 
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Active section:", entry.target.id);

            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 py-4 px-8">
      <Group position="apart" align="center" noWrap>
        {/* Logo on the left */}
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
          <img
            src={Logo}
            alt="Lehulum Real Estate"
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation + Button on right */}
        <div className="ml-auto flex items-center space-x-6">
          {/* Nav links */}
          <Group spacing="lg">
            {sections.slice(0, -1).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-full transition font-medium
                  ${activeSection === id
                    ? "shadow-md shadow-red-200 text-red-600"
                    : "text-gray-700"}
                  hover:text-red-500`}
              >
                {label}
              </button>
            ))}
          </Group>

          {/* Contact Us button */}
          <Button
            radius="xl"
            color="red"
            className={`px-5 shadow transition ${
              activeSection === "contact" ? "shadow-lg shadow-red-300" : ""
            }`}
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </Button>
        </div>
      </Group>
    </nav>
  );
}
