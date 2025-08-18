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
import { fetchApartments } from "../api/apartmentapi"; // Update path if needed

const EXCLUDED_TYPES = ["Pharmacy", "Bank", "First Floor", "G Floor"];

export default function ApartmentCards() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const loadApartments = async () => {
      const data = await fetchApartments();
      const filtered = data.filter(
        (apt) => !EXCLUDED_TYPES.includes(apt.type)
      );
      setApartments(filtered);
    };
    loadApartments();
  }, []);

  // Separate Penthouse
  const penthouse = apartments.find(
    (apt) => apt.type === "Penthouse 4B Type"
  );
  const otherApartments = apartments.filter(
    (apt) => apt.type !== "Penthouse 4B Type"
  );

  return (
    <Box py={50}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title
            order={2}
            ta="center"
            size="1.8rem"
            fw={700}
            mb={50}
            ff="serif"
          >
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Step inside your dream home -
            </span>{" "}
            spacious, stylish, and waiting for you.
          </Title>
        </motion.div>

        {/* Grid for regular apartments */}
        <Grid gutter="md">
          {otherApartments.map((apt, idx) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
              <Card
                shadow="md"
                radius="xl"
                className="transition-transform duration-300 hover:scale-105"
                style={{
                  overflow: "hidden",
                  position: "relative",
                }}
              >
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
                        "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
                      color: "white",
                    }}
                  >
                    <Text fw={700} size="lg">
                      {apt.type}
                    </Text>
                    <Text size="sm" style={{ opacity: 0.85 }}>
                      {apt.area}
                    </Text>
                    <Text size="sm" style={{ opacity: 0.9 }}>
                      {apt.description}
                    </Text>
                  </Box>
                </Card.Section>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Penthouse Layout */}
        {penthouse && (
          <Grid gutter="lg" mt="xl">
            <Grid.Col span={{ base: 12, sm: 8, md: 11 }} mx="auto">
              <Card
                shadow="xl"
                radius="xl"
                className="transition-transform duration-300 hover:scale-105"
                style={{
                  maxHeight: 600,
                  overflow: "hidden",
                  position: "relative",
                  border: "2px solid gold",
                }}
              >
                {penthouse.remaining_available === 0 && (
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
                <Card.Section>
                  <Image
                    src={penthouse.image_url}
                    alt={penthouse.type}
                    height={360} // increased from 280
                    fit="cover"
                  />
                  <Box
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "60%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      color: "white",
                      padding: "1rem",
                    }}
                  >
                    <Text fw={700} size="xl">
                      {penthouse.type}
                    </Text>
                    <Text size="sm" style={{ opacity: 0.85 }}>
                      {penthouse.area}
                    </Text>
                    <Text size="sm" style={{ opacity: 0.9 }}>
                      {penthouse.description}
                    </Text>
                  </Box>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        )}

        {/* Button */}
        <div className="text-center mt-10">
          <Button
            radius="xl"
            color="red"
            size="md"
            component="a"
            href="/apartments"
          >
            More on Apartments
          </Button>
        </div>
      </Container>
    </Box>
  );
}
