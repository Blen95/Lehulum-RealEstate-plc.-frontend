// src/pages/admin/ApartmentManagement.tsx
import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Button,
  NumberInput,
  Group,
  Stack,
  Container,
  Title,
} from "@mantine/core";
import {
  fetchApartments,
  updateApartmentAvailability,
  updateApartmentPricing,
} from "../api/apartmentapi";
import { notifications } from "@mantine/notifications";

export type Apartment = {
  id: number;
  type: string;
  area: string; // or number if you parse it
  price_per_sqm: number;
  apartment_price: number;
  remaining_available: number;
  created_at: string;
  updated_at: string;
};

type EditableApartment = Apartment & {
  newAvailability: number;
  newPricePerSqm: number;
  newApartmentPrice: number;
};

export default function Adminapartment() {
  const [apartments, setApartments] = useState<EditableApartment[]>([]);

  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    try {
      const data = await fetchApartments();
      const withEditableFields: EditableApartment[] = data.map((apt: Apartment) => ({
        ...apt,
        newAvailability: apt.remaining_available,
        newPricePerSqm: apt.price_per_sqm,
        newApartmentPrice: apt.apartment_price,
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
    value: number
  ) => {
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, [field]: value } : apt
      )
    );
  };

  const handleAvailabilityUpdate = async (id: number) => {
    const apt = apartments.find((a) => a.id === id);
    if (!apt) return;

    try {
      await updateApartmentAvailability(id, apt.newAvailability);
      notifications.show({ title: "Success", message: "Availability updated" });
      loadApartments();
    } catch (error) {
      notifications.show({ title: "Error", message: "Update failed", color: "red" });
    }
  };

  const handlePricingUpdate = async (id: number) => {
    const apt = apartments.find((a) => a.id === id);
    if (!apt) return;

    try {
      await updateApartmentPricing(id, {
        price_per_sqm: apt.newPricePerSqm,
        apartment_price: apt.newApartmentPrice,
      });
      notifications.show({ title: "Success", message: "Pricing updated" });
      loadApartments();
    } catch (error) {
      notifications.show({ title: "Error", message: "Update failed", color: "red" });
    }
  };

  // Helper to safely parse NumberInput onChange values
  const safeNumber = (val: number | null) => (val === null ? 0 : val);

  return (
    <Container>
      <Title order={2} mb="lg">
        Apartment Management
      </Title>
      <Stack>
        {apartments.map((apt) => (
          <Card key={apt.id} shadow="md" p="lg" withBorder>
            <Text fw={500}>Type: {apt.type}</Text>
            <Text size="sm">Area: {apt.area}</Text>
            <Text size="sm">Available: {apt.remaining_available}</Text>
            <Text size="sm">Price per sqm: {apt.price_per_sqm}</Text>
            <Text size="sm">Apartment price: {apt.apartment_price}</Text>

            <Group mt="md" align="flex-end">
              <NumberInput
  label="Update Availability"
  value={apt.newAvailability}
  min={0}
  onChange={(val) => {
    const safeVal = typeof val === "number" ? val : Number(val) || 0;
    handleInputChange(apt.id, "newAvailability", safeVal);
  }}
  style={{ width: 150 }}
/>
              <Button onClick={() => handleAvailabilityUpdate(apt.id)}>
                Save Availability
              </Button>
            </Group>

            <Group mt="sm" align="flex-end">
              <NumberInput
                label="Price per sqm"
                value={apt.newPricePerSqm}
                min={0}
                onChange={(val) =>
                  handleInputChange(apt.id, "newPricePerSqm", Number(val))
                }
                style={{ width: 150 }}
              />
              <NumberInput
                label="Apartment price"
                value={apt.newApartmentPrice}
                min={0}
                onChange={(val) =>
                  handleInputChange(apt.id, "newApartmentPrice", Number(val))
                }
                style={{ width: 150 }}
              />
              <Button onClick={() => handlePricingUpdate(apt.id)}>
                Save Pricing
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
