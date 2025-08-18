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
import { motion } from "framer-motion";

export default function OurStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="story"
      className="py-20 bg-gradient-to-br from-[#fff5f5] via-white to-[#fff] transition-all"
    >
      <Container className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image with soft drop shadow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-4">
            <Image
              src="/about.svg"
              alt="Our Story"
              radius="xl"
              className="w-full max-w-sm h-auto mx-auto"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-[#B22234] to-[#FF6B6B] text-white px-6 py-2 rounded-full mb-4">
            <Title order={2} className="text-xl font-semibold tracking-wide">
              About Us
            </Title>
          </div>

          <Text className="text-gray-600 text-lg mb-6">
            At <span className="font-semibold text-gray-800">Lehulum Real Estate</span>, we believe in crafting homes
            that inspire and uplift. Our vision is to blend modern living with timeless elegance,
            offering unmatched amenities and a vibrant community.
          </Text>

          <Collapse in={expanded}>
            <Text className="text-gray-600 mb-4">
              Founded in 2008 E.C., Lehulum Real Estate started with a bold dream: to transform the way
              people experience homeownership in Ethiopia. Over the years, we’ve proudly served hundreds of
              satisfied homeowners — individuals, couples, and families — by delivering properties that
              embody quality, trust, and a strong sense of community.
            </Text>
            <Text className="text-gray-600 mb-4">
              From our early developments to our latest luxury high-rises, our commitment has remained the
              same: thoughtful design, prime locations, and customer-first service. Whether you’re a
              first-time buyer or a seasoned investor, Lehulum Real Estate is here to guide your journey home.
            </Text>
          </Collapse>

          <Group mt="md">
            <Button
              radius="xl"
              size="md"
              variant="gradient"
              gradient={{ from: "#B22234", to: "#FF6B6B" }}
              onClick={() => setExpanded((prev) => !prev)}
              className="font-semibold tracking-wide"
            >
              {expanded ? "Show Less" : "Learn More"}
            </Button>
          </Group>
        </motion.div>
      </Container>
    </section>
  );
}
