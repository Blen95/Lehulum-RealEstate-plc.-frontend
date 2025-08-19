import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Box,
  Button,
  Title,
  Badge,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchApartments } from "../api/apartmentapi"; // update if needed

// ⬇️ put exclusion list here
const EXCLUDED_TYPES = ["Pharmacy", "G.Floor Bank A", "First Floor", "G Floor"];

export default function ApartmentCards() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const loadApartments = async () => {
      const data = await fetchApartments();

      // filter out excluded types
      const filtered = data.filter(
        (apt) => !EXCLUDED_TYPES.includes(apt.type)
      );

      // Penthouse appears normally in filtered list (no separation)
      setApartments(filtered);
    };
    loadApartments();
  }, []);

  return (
    <Box
      py={80}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe]"
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-20 w-[25rem] h-[25rem] bg-red-100 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] bg-rose-200 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10">
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
            className="text-gray-900"
          >
            <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent">
              Step inside your dream home
            </span>{" "}
            – spacious, stylish, and waiting for you.
          </Title>
        </motion.div>

        {/* Grid with all apartments (Penthouse included inline) */}
        <Grid gutter="md">
          {apartments.map((apt, idx) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
              <Card
                shadow="md"
                radius="xl"
                className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  background: "white",
                }}
              >
                {/* Sold Out badge */}
                {apt.remaining_available === 0 && (
                  <Badge
                    color="red"
                    variant="filled"
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 2,
                    }}
                  >
                    Sold Out
                  </Badge>
                )}

                {/* Image + grey overlay text */}
                <Card.Section style={{ position: "relative", height: 420 }}>
                  <Image
                    src={apt.image_url}
                    alt={apt.type}
                    height={520}
                    fit="cover"
                  />
                  <Box
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      padding: "1rem",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))",
                      color: "white",
                    }}
                  >
                    <Text fw={700} size="lg">
                      {apt.type}
                    </Text>
                    <Text size="sm">{apt.area}</Text>
                    <Text size="sm">{apt.description}</Text>
                  </Box>
                </Card.Section>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        
      </Container>
    </Box>
  );
}
