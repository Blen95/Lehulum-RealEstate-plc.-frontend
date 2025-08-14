import { Box, Text, Container } from "@mantine/core";

export default function ViewSection() {
  return (
    <Box style={{ position: "relative", height: "500px", overflow: "hidden" }}>
      <video
        src="/view1.MOV"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></video>

      {/* Overlay */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
        }}
      ></Box>

      {/* Text */}
      <Container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Text size="xl" fw={700}>
          Breathtaking Views
        </Text>
        <Text size="sm">
          Wake up to the beauty of the city skyline every morning.
        </Text>
      </Container>
    </Box>
  );
}
