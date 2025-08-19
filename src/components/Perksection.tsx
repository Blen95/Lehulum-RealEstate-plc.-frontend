import { Box, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { motion } from "framer-motion";

const perks = [
  { name: "Modern Gym Experience", img: "/gym.jpg" },
  { name: "Fine Dining Restaurant", img: "/restaurant.jpg" },
  { name: "Elegant Swimming Pool", img: "/pool.jpg" },
];

export default function PerksSection() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <Box py={80} className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe]" id="apartments">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title
          order={2}
          ta="center"
          size="2rem"
          fw={700}
          mb={50}
          ff="serif"
        >
          <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent font-bold">
            Unwind and Indulge
          </span>{" "}
          — Amenities Crafted for the Elevated Life.
        </Title>
      </motion.div>

      {/* Carousel */}
      <Carousel
        withIndicators
        height={500}
        slideSize="100%"
        loop
        draggable
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        style={{
          maxWidth: "85%",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {perks.map((perk, idx) => (
          <Carousel.Slide key={idx}>
            <Box
              style={{
                position: "relative",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <img
                src={perk.img}
                alt={perk.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease, filter 0.3s ease, box-shadow 0.3s ease",
                }}
                className="perk-image"
              />
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "20px",
                }}
              >
                <Text
                  size="xl"
                  fw={700}
                  style={{
                    color: "white",
                    textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                    fontFamily: "serif",
                  }}
                >
                  {perk.name}
                </Text>
              </Box>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Hover Effect */}
      <style>
        {`
          .perk-image:hover {
            transform: scale(1.04);
            filter: brightness(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </Box>
  );
}
