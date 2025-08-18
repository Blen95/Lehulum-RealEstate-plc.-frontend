import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Box,
  Button,
  Title,
  NumberInput,
  Modal,
  FileInput,
  Textarea,
  Group,
  Badge,
  Overlay,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  fetchApartments,
  updateApartmentAvailability,
  updateApartmentDescription,
  updateApartmentImage,
} from "../api/apartmentapi";
import { notifications } from "@mantine/notifications";

export type Apartment = {
  id: number;
  type: string;
  area: string;
  price_per_sqm: number;
  apartment_price: number;
  remaining_available: number;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

type EditableApartment = Apartment & {
  newAvailability: number;
  newDescription: string;
  newImage?: File | null;
};

export default function AdminApartment() {
  const [apartments, setApartments] = useState<EditableApartment[]>([]);
  const [activeImageEditId, setActiveImageEditId] = useState<number | null>(null);
  const [activeDescEditId, setActiveDescEditId] = useState<number | null>(null);

  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    try {
      const data = await fetchApartments();
      const withEditableFields: EditableApartment[] = data.map((apt: Apartment) => ({
        ...apt,
        newAvailability: apt.remaining_available,
        newDescription: apt.description,
        newImage: null,
      }));
      setApartments(withEditableFields);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to load apartments.",
        color: "red",
      });
    }
  };

  const handleInputChange = (
    id: number,
    field: keyof Omit<EditableApartment, keyof Apartment>,
    value: any
  ) => {
    setApartments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, [field]: value } : apt))
    );
  };

  const handleAvailabilityUpdate = async (id: number) => {
    const apt = apartments.find((a) => a.id === id);
    if (!apt) return;
    try {
      await updateApartmentAvailability(id, apt.newAvailability);
      notifications.show({ title: "Success", message: "Availability updated" });
      loadApartments();
    } catch {
      notifications.show({ title: "Error", message: "Update failed", color: "red" });
    }
  };

  const handleDescriptionUpdate = async (id: number) => {
    const apt = apartments.find((a) => a.id === id);
    if (!apt) return;
    try {
      await updateApartmentDescription(id, apt.newDescription);
      notifications.show({ title: "Success", message: "Description updated" });
      loadApartments();
    } catch {
      notifications.show({ title: "Error", message: "Update failed", color: "red" });
    }
  };

  const handleImageUpdate = async (id: number) => {
    const apt = apartments.find((a) => a.id === id);
    if (!apt || !apt.newImage) return;

    const formData = new FormData();
    formData.append("image", apt.newImage);

    try {
      await updateApartmentImage(id, formData);
      notifications.show({ title: "Success", message: "Image updated" });
      loadApartments();
    } catch {
      notifications.show({ title: "Error", message: "Image update failed", color: "red" });
    }
  };

  return (
    <Box py={50}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title order={2} ta="center" size="1.8rem" fw={700} mb={50} ff="serif">
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Manage Apartments —
            </span>{" "}
            image overlays and admin tools.
          </Title>
        </motion.div>

        <Grid gutter="lg">
          {apartments.map((apt) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={apt.id}>
              <Card
                shadow="sm"
                radius="lg"
                p={0}
                className="transition duration-200 hover:shadow-lg"
                style={{
                  height: 360,
                  overflow: "hidden",
                  position: "relative",
                  border: apt.remaining_available === 0 ? "2px solid #e03131" : undefined,
                }}
              >
                {apt.remaining_available === 0 && (
                  <Badge
                    color="red"
                    variant="filled"
                    style={{ position: "absolute", top: 10, right: 10, zIndex: 3 }}
                  >
                    Sold Out
                  </Badge>
                )}

                <Image
                  src={apt.image_url || "/apt-placeholder.jpeg"}
                  alt={apt.type}
                  height={360}
                  fit="cover"
                  style={{ objectFit: "cover" }}
                />

                <Overlay
                  gradient="linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 60%)"
                  opacity={0.7}
                  zIndex={1}
                />

                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "12px",
                    color: "white",
                    fontSize: "0.9rem",
                    zIndex: 2,
                  }}
                >
                  <Text fw={700} size="lg">
                    {apt.type}
                  </Text>
                  <Text>Area: {apt.area} m²</Text>
                  <Text>
                    Available:{" "}
                    <span
                      style={{ color: apt.remaining_available === 0 ? "#e03131" : "#40c057" }}
                    >
                      {apt.remaining_available}
                    </span>
                  </Text>
                  <Text italic size="sm" mt="xs">
                    {apt.description.length > 100
                      ? apt.description.slice(0, 100) + "..."
                      : apt.description}
                  </Text>
                </Box>

                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "10px",
                    background: "rgba(0,0,0,0.55)",
                    zIndex: 2,
                  }}
                >
                  <Group justify="space-between" spacing="xs" mb="xs">
                    <Button
                      size="xs"
                      variant="filled"
                      color="indigo"
                      onClick={() => setActiveImageEditId(apt.id)}
                    >
                      {apt.image_url ? "Change Image" : "Add Image"}
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      color="indigo"
                      onClick={() => setActiveDescEditId(apt.id)}
                    >
                      Edit Description
                    </Button>
                  </Group>

                  <Text size="xs" c="gray.2" mb={4}>
                    Update Availability
                  </Text>
                  <Group spacing={4} grow>
                    <NumberInput
                      hideControls
                      size="xs"
                      value={apt.newAvailability}
                      min={0}
                      onChange={(val) =>
                        handleInputChange(apt.id, "newAvailability", Number(val))
                      }
                      styles={{ input: { fontSize: 14 } }}
                    />
                    <Button
                      size="xs"
                      variant="filled"
                      color="indigo"
                      onClick={() => handleAvailabilityUpdate(apt.id)}
                    >
                      Save
                    </Button>
                  </Group>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Modal
        opened={activeImageEditId !== null}
        onClose={() => setActiveImageEditId(null)}
        title="Upload Apartment Image"
        centered
      >
        {activeImageEditId !== null && (
          <>
            <FileInput
              label="Select image"
              accept="image/png,image/jpeg,image/webp"
              onChange={(file) =>
                handleInputChange(activeImageEditId, "newImage", file)
              }
            />
            <Button
              mt="md"
              onClick={() => {
                handleImageUpdate(activeImageEditId);
                setActiveImageEditId(null);
              }}
            >
              Save Image
            </Button>
          </>
        )}
      </Modal>

      <Modal
        opened={activeDescEditId !== null}
        onClose={() => setActiveDescEditId(null)}
        title="Edit Description"
        centered
      >
        {activeDescEditId !== null && (
          <>
            <Textarea
              label="New Description"
              minRows={4}
              value={
                apartments.find((apt) => apt.id === activeDescEditId)?.newDescription || ""
              }
              onChange={(e) =>
                handleInputChange(activeDescEditId, "newDescription", e.currentTarget.value)
              }
            />
            <Button
              mt="md"
              onClick={() => {
                handleDescriptionUpdate(activeDescEditId);
                setActiveDescEditId(null);
              }}
            >
              Save Description
            </Button>
          </>
        )}
      </Modal>
    </Box>
  );
}
