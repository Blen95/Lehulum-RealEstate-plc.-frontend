import { useState } from "react";
import {
  Button,
  Container,
  Group,
  Image,
  Text,
  Title,
  Collapse,
} from "@mantine/core";

export default function OurStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="story" className="py-16 bg-white">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <Image src="/about.svg" alt="Our Story" radius="xl" />
        <div>
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-4">
            <Title order={2}>About Us</Title>
          </div>

          <Text className="text-gray-600 mb-6">
            At Lehulum Real Estate, we believe in crafting homes that inspire and
            uplift. Our vision is to blend modern living with timeless elegance,
            offering unmatched amenities and a vibrant community.
          </Text>

          <Collapse in={expanded}>
            <Text className="text-gray-600 mb-4">
              Founded in 2008 E.C., Lehulum Real Estate started with a bold dream:
              to transform the way people experience homeownership in Ethiopia. Over
              the years, we’ve proudly served hundreds of satisfied homeowners —
              individuals, couples, and families — by delivering properties that
              embody quality, trust, and a strong sense of community.
            </Text>
            <Text className="text-gray-600 mb-4">
              From our early developments to our latest luxury high-rises, our
              commitment has remained the same: thoughtful design, prime locations,
              and customer-first service. Whether you’re a first-time buyer or a
              seasoned investor, Lehulum Real Estate is here to guide your journey
              home.
            </Text>
          </Collapse>

          <Group mt="md">
            <Button
              color="red"
              radius="xl"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Show Less" : "Learn More"}
            </Button>
            
          </Group>
        </div>
      </Container>
    </section>
  );
}
