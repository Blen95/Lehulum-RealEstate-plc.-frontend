// src/pages/admin/AdminNewsPage.jsx
import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Title,
  Container,
  Button,
  Modal,
  TextInput,
  Textarea,
  FileInput,
  Group,
  ScrollArea,
  Center,
  Loader,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  fetchNews,
  addNews,
  updateNews,
  deleteNews,
  getImageUrl,
} from "../api/adminNewsapi.js";
import AdminNavbar from "./adminnav.js";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await fetchNews();
      setNews(res.data); // Assuming { data: [...] }
    } catch (err) {
      showNotification({ title: "Error", message: "Failed to load news.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setEditingNews(null);
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    const payload = { title, content, image };
    try {
      if (editingNews) {
        await updateNews(editingNews.id, payload);
        showNotification({ title: "Success", message: "News updated!", color: "green" });
      } else {
        await addNews(payload);
        showNotification({ title: "Success", message: "News posted!", color: "green" });
      }
      resetForm();
      loadNews();
    } catch (err) {
      console.error(err);
      showNotification({ title: "Error", message: "Failed to save article.", color: "red" });
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setTitle(newsItem.title);
    setContent(newsItem.content);
    setImage(null); // optional: reset image unless user re-uploads
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteNews(id);
        showNotification({ title: "Deleted", message: "News deleted!", color: "red" });
        loadNews();
      } catch (err) {
        console.error(err);
        showNotification({ title: "Error", message: "Failed to delete.", color: "red" });
      }
    }
  };

  return (
    <div>
      <AdminNavbar />

      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12 mt-8">
            <div className="inline-block bg-red-500 text-white px-6 py-2  mb-4">
              <Title>Manage News & Updates</Title>
            </div>
            <Text className="text-gray-600">Add, edit or remove news articles.</Text>
           <Button
  mt="md"
  color="#EA3C53" // light green (you can try green.1 or green.0 for even lighter)
  variant="filled" // keeps it soft, not fully filled
  onClick={() => setModalOpen(true)}
>
  + Add News Article
</Button>

          </div>

          {loading ? (
            <Center>
              <Loader color="red" />
            </Center>
          ) : (
            <div className="grid-equal">
              {news.map((item) => (
                <Card key={item.id} shadow="md" radius="lg">
                  <Card.Section>
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "200px",
                      }}
                    />
                  </Card.Section>
                  <Text weight={600} mt="md">
                    {item.title}
                  </Text>
                  <Text size="sm" color="dimmed" className="line-clamp-3">
                    {item.content}
                  </Text>
                  <Group mt="md" position="right">
                    <Button size="xs"  color="#36454F" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </Group>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Modal
        opened={modalOpen}
        onClose={resetForm}
        title={editingNews ? "Edit News" : "Add News"}
        centered
      >
        <TextInput
          placeholder="Title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="sm"
        />
        <Textarea
          placeholder="Content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={5}
          mb="sm"
        />
        <FileInput
          label="Upload Image"
          placeholder="Choose image"
          value={image}
          onChange={setImage}
          accept="image/*"
          mb="sm"
          clearable
        />
        {image && typeof image !== "string" && (
          <Image src={URL.createObjectURL(image)} height={160} mb="sm" />
        )}
        <Group position="right" mt="md">
          <Button onClick={handleSubmit}>{editingNews ? "Update" : "Post"}</Button>
        </Group>
      </Modal>
    </div>
  );
}
