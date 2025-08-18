import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Image, Title, Text, Button, Loader, Center } from "@mantine/core";
import { fetchNewsById, getImageUrl } from "../api/adminNewsapi.js"; // <-- Import here
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNewsById(id);
        setNews(data);
      } catch (err) {
        setError("News item not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadNews();
    else {
      setError("Invalid news item.");
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <Navbar />

      <section className="py-16 bg-white">
        <Container size="md">
          {loading ? (
            <Center>
              <Loader color="red" />
            </Center>
          ) : error ? (
            <Text color="red" align="center">
              {error}
            </Text>
          ) : (
            <>
              <Image
                src={getImageUrl(news.image)}
                alt={news.title}
                radius="md"
                className="mt-6 md:mt-12 mx-auto"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "400px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <Title order={2} className="mb-4 text-red-600">
                {news.title}
              </Title>

              <Text className="text-gray-700 text-lg leading-relaxed mb-8" component="div">
                {/* You can parse line breaks into paragraphs */}
                {news.content.split("\n").map((para, idx) => (
                  <p key={idx} className="mb-4">{para}</p>
                ))}
              </Text>

              <Button
                variant="outline"
                color="red"
                radius="xl"
                onClick={() => navigate("/", { state: { targetId: "news" } })}
              >
                ← Back to News & Updates
              </Button>
            </>
          )}
        </Container>
      </section>

      <Footer />
    </>
  );
}
