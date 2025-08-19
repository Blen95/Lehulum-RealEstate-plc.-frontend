import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Image,
  Title,
  Text,
  Button,
  Loader,
  Center,
  Paper,
} from "@mantine/core";
import { fetchNewsById, getImageUrl } from "../api/adminNewsapi.js";
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

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] py-20 px-6">
        <Container size="md" className="relative z-10">
          {loading ? (
            <Center>
              <Loader color="red" />
            </Center>
          ) : error ? (
            <Text color="red" align="center" className="text-lg font-medium">
              {error}
            </Text>
          ) : (
            <Paper
              shadow="lg"
              radius="xl"
              p="xl"
              withBorder
              className="bg-white border border-red-100/60 backdrop-blur-sm"
            >
              {/* News Image */}
              <Image
                src={getImageUrl(news.image)}
                alt={news.title}
                radius="md"
                className="mx-auto mb-8"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "400px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Title */}
              <Title
                order={2}
                align="center"
                className="mb-6 text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent"
              >
                {news.title}
              </Title>

              {/* Content */}
              <Text
                className="text-gray-700 text-lg leading-relaxed mb-10 max-w-3xl mx-auto"
                component="div"
              >
                {news.content.split("\n").map((para, idx) => (
                  <p key={idx} className="mb-5">
                    {para}
                  </p>
                ))}
              </Text>

              {/* Back Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  color="red"
                  radius="xl"
                  size="md"
                  onClick={() => navigate("/", { state: { targetId: "news" } })}
                  className="px-6 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  ← Back to News & Updates
                </Button>
              </div>
            </Paper>
          )}
        </Container>
      </section>

      <Footer />
    </>
  );
}
