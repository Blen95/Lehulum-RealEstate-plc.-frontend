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
  Stack,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  fetchApartments,
  updateApartmentAvailability,
  updateApartmentDescription,
  updateApartmentImage,
} from "../api/apartmentapi";
import { notifications } from "@mantine/notifications";
import AdminNavbar from "./adminnav";

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
<div className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] min-h-screen py-16 px-8">
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-16 -right-32 w-[35rem] h-[35rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 left-0 w-[25rem] h-[25rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <AdminNavbar/>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title order={2} ta="center" size="2rem" fw={700} mb={50} ff="serif">
            <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent">
              Manage Apartments
            </span>{" "}
            
          </Title>
        </motion.div>

        <Grid gutter="lg">
          {apartments.map((apt) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={apt.id}>
              <Card
                shadow="lg"
                radius="xl"
                p={0}
                className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden relative"
                style={{
                  border: apt.remaining_available === 0 ? "2px solid #e03131" : undefined,
                  height: 380,
                }}
              >
                {apt.remaining_available === 0 && (
                  <Badge
                    color="red"
                    variant="filled"
                    className="absolute top-3 right-3 z-10"
                  >
                    Sold Out
                  </Badge>
                )}

                <Image
                  src={apt.image_url || "/apt-placeholder.jpeg"}
                  alt={apt.type}
                  height={380}
                  fit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />

                <Overlay
                  gradient="linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 60%)"
                  opacity={0.7}
                  zIndex={1}
                />

                <Box className="absolute top-0 left-0 right-0 p-3 z-10 text-white text-sm">
                  <Text fw={700} size="lg">
                    {apt.type}
                  </Text>
                  <Text>Area: {apt.area} m²</Text>
                  <Text>
                    Available:{" "}
                    <span className={apt.remaining_available === 0 ? "text-red-500" : "text-green-500"}>
                      {apt.remaining_available}
                    </span>
                  </Text>
                  <Text italic size="xs" mt="xs" className="line-clamp-3">
                    {apt.description}
                  </Text>
                </Box>

                <Box className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 z-10">
                  <Group justify="space-between" spacing="xs" mb="xs">
                    <Button
                      size="xs"
                      variant="filled"
                     color="dark"
                      onClick={() => setActiveImageEditId(apt.id)}
                    >
                      {apt.image_url ? "Change Image" : "Add Image"}
                    </Button>
                    <Button
                      size="xs"
                      variant="filled"
                      color="dark"
                      onClick={() => setActiveDescEditId(apt.id)}
                    >
                      Edit Description
                    </Button>
                  </Group>

                  <Text size="xs" c="gray.2" mb={2}>
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
                      variant="gradient"
                     gradient={{ from: '#CBAF88', to: '#E4D6B0' }}
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

      {/* Modals */}
      <Modal
        opened={activeImageEditId !== null}
        onClose={() => setActiveImageEditId(null)}
        title="Upload Apartment Image"
        centered
      >
        {activeImageEditId !== null && (
          <Stack>
            <FileInput
              label="Select image"
              accept="image/png,image/jpeg,image/webp"
              onChange={(file) =>
                handleInputChange(activeImageEditId, "newImage", file)
              }
            />
            <Button
              mt="md"
              variant="gradient"
              gradient={{ from: '#B22234', to: '#FF6B6B' }}
              onClick={() => {
                handleImageUpdate(activeImageEditId);
                setActiveImageEditId(null);
              }}
            >
              Save Image
            </Button>
          </Stack>
        )}
      </Modal>

      <Modal
        opened={activeDescEditId !== null}
        onClose={() => setActiveDescEditId(null)}
        title="Edit Description"
        centered
      >
        {activeDescEditId !== null && (
          <Stack>
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
              variant="gradient"
              gradient={{ from: '#B22234', to: '#FF6B6B' }}
              onClick={() => {
                handleDescriptionUpdate(activeDescEditId);
                setActiveDescEditId(null);
              }}
            >
              Save Description
            </Button>
          </Stack>
        )}
      </Modal>
    </div>
  );
}
