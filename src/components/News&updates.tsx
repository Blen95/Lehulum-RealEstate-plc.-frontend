import { Card, Image, Text, Title, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { newsItems } from "../data/newsData";

export default function NewsUpdates() {
  const navigate = useNavigate();

  return (
    <section id="news" className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-4">
            <Title order={2}>News & Updates</Title>
          </div>
          <Text className="text-gray-600">
            Stay in the Loop – Updates, Progress & Exciting Announcements.
          </Text>
        </div>

        <div className="grid-equal">
  {newsItems.map((news) => (
    <Card
      key={news.id}
      shadow="md"
      radius="lg"
      className="cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => navigate(`/news/${news.id}`)}
    >
      <Card.Section>
        <Image
          src={news.image}
          alt={news.title}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "200px"
          }}
        />
      </Card.Section>
      <Text weight={600} mt="md">{news.title}</Text>
      <Text size="sm" color="dimmed">{news.short}</Text>
    </Card>
  ))}
</div>

      </Container>
    </section>
  );
}
