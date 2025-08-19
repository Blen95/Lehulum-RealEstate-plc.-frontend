import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Title,
  Container,
  Loader,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { fetchNews, getImageUrl } from "../api/adminNewsapi.js";

export default function NewsUpdates() {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetchNews();
        setNewsItems(res.data);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <section
  id="news"
  className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] pt-12 pb-20 px-6"
>

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-32 w-[30rem] h-[30rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 right-0 w-[25rem] h-[25rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-[#B22234] to-[#FF6B6B]">
            <Title
              order={3}
              className="text-xl font-bold tracking-wide text-white font-serif"
            >
              News & Updates
            </Title>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Center>
            <Loader color="red" />
          </Center>
        ) : error ? (
          <Text color="red" align="center">
            {error}
          </Text>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((news) => (
              <Card
                key={news.id}
                shadow="lg"
                radius="xl"
                className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <Card.Section>
                  <Image
                    src={getImageUrl(news.image)}
                    alt={news.title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "200px",
                    }}
                  />
                </Card.Section>
                <Text weight={600} mt="md" className="line-clamp-2">
                  {news.title}
                </Text>
                <Text size="sm" color="dimmed" className="line-clamp-3 mt-1">
                  {news.short}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
