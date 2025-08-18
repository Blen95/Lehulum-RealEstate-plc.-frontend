import { Container, Grid, Card, Image, Text, Box, Button, Title } from "@mantine/core";
import { motion } from "framer-motion";

const apartments = [
  {
    name: "1 Bedroom Apartment",
    img: "/apt3.jpeg",
    size: "65 m²",
    desc: "Perfect for singles or couples, combining cozy comfort with modern finishes.",
  },
  {
    name: "2 Bedroom Apartment",
    img: "/apt2.jpeg",
    size: "95 m²",
    desc: "Ideal for small families, offering generous living space and natural light.",
  },
  {
    name: "3 Bedroom Apartment",
    img: "/apt1.jpeg",
    size: "130 m²",
    desc: "Spacious home with room for everyone, designed for both comfort and style.",
  },
  {
    name: "Penthouse",
    img: "/Penthouse.jpeg",
    size: "210 m²",
    desc: "Indulge in unmatched luxury and breathtaking skyline views from the comfort of your private sanctuary. This top-floor residence features spacious open-concept living, high-end finishes, and exclusive access to premium amenities. Experience the height of elegance — where privacy meets perfection."
,
  },
];

export default function Apartmentlist() {
  return (
    <Box py={50}>
      <Container size='xl'>
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
            Step inside your dream home- 
          </span>{" "}
          spacious, stylish, and waiting for you.
        </Title>
      </motion.div>
        {/* First Row - 3 apartments */}
    
        <Grid gutter="md">
            
  {apartments.slice(0, 3).map((apt, idx) => (
    <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
      <Card
        shadow="md"
        radius="xl"
        className="transition-transform duration-300 hover:scale-105"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <Card.Section style={{ position: "relative", height: 420 }}>
          <Image
            src={apt.img}
            alt={apt.name}
            height={520}
            fit="cover"
            style={{ objectFit: "cover" }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
              color: "white",
            }}
          >
            <Text fw={700} size="lg">{apt.name}</Text>
            <Text size="sm" style={{ opacity: 0.85 }}>{apt.size}</Text>
            <Text size="sm" style={{ opacity: 0.9 }}>{apt.desc}</Text>
          </Box>
        </Card.Section>
      </Card>
    </Grid.Col>
  ))}
</Grid>


       {/* Second Row - Penthouse */}
<Grid gutter="lg" mt="xl">
  <Grid.Col span={{ base: 12, sm: 8, md: 11 }} mx="auto">
    <Card
      shadow="xl"
      radius="xl"
      className="transition-transform duration-300 hover:scale-105"
      style={{
        maxHeight: 500, //
        overflow: "hidden",
        position: "relative",
        border: "2px solid gold",
      }}
    >
      <Card.Section>
        <Image
          src={apartments[3].img}
          alt={apartments[3].name}
          height={280} // smaller height
          fit="cover"
        />
        {/* Text overlay */}
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            color: "white",
            padding: "1rem",
          }}
        >
          <Text fw={700} size="xl">
            {apartments[3].name}
          </Text>
          
          <Text size="sm" style={{ opacity: 0.85 }}>
            {apartments[3].size}
          </Text>
          <Text size="sm" style={{ opacity: 0.9 }}>
            {apartments[3].desc}
          </Text>
        </Box>
      </Card.Section>
    </Card>
  </Grid.Col>
</Grid>


        {/* More on Apartments Button */}
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
