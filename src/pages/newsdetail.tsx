import { useParams, useNavigate } from "react-router-dom";
import { Container, Image, Title, Text, Button } from "@mantine/core";
import { newsItems } from "../data/newsData";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    return <div>Invalid news item.</div>;
  }
  const news = newsItems.find((item) => item.id === parseInt(id));

  if (!news) {
    return <Text className="p-10">News item not found.</Text>;
  }

  return (
    <>
    <Navbar/>
        <section className="py-16 bg-white">
      
      <Container size="md">
        <Image
  src={news.image}
  alt={news.title}
  radius="md"
  className="mt-6 md:mt-12 mx-auto"
  style={{
    width: "100%",
    maxWidth: "900px",   // controls how wide it gets
    height: "400px",     // fixed height to prevent "long" look
    objectFit: "cover",  // crops image instead of stretching
    display: "block"
  }}
/>



        <Title order={2} className="mb-4 text-red-600">{news.title}</Title>
        <Text className="text-gray-700 text-lg leading-relaxed mb-8">{news.full}</Text>
        <Button
  variant="outline"
  color="red"
  radius="xl"
  onClick={() => navigate("/", { state: { targetId: "news" } })}
>
  ← Back to News & Updates
</Button>

      </Container>
        
    </section>
      <Footer/>
    </>
  );
}