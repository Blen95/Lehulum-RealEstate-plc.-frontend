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
  Stack,
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
      setNews(res.data);
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
    setImage(null);
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
<div className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] min-h-screen py-16 px-8">
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-16 -right-32 w-[35rem] h-[35rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 left-0 w-[25rem] h-[25rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <AdminNavbar />
      <Container size="xl" className="relative z-10">
        <div className="text-center mb-12 mt-8">
          <div className="inline-block px-6 py-2 mb-4">
            <Title order={2} ta="center" size="2rem" fw={700} mb={50} ff="serif">
            <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent">
              Manage News/Article
            </span>{" "}
            
          </Title>

          </div>
        

          <Center>
  <Button
    mt="md"
    variant="gradient"
    gradient={{ from: '#B22234', to: '#FF6B6B' }}
    onClick={() => setModalOpen(true)}
  >
    + Add News Article
  </Button>
</Center>

        </div>

        {loading ? (
          <Center>
            <Loader color="#CBAF88" />
          </Center>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card
  key={item.id}
  shadow="lg"
  radius="xl"
  className="transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden flex flex-col"
>
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

  <Text weight={600} mt="md" className="line-clamp-2">
    {item.title}
  </Text>
  <Text size="sm" color="dimmed" className="line-clamp-3 mt-1">
    {item.content}
  </Text>

  {/* spacer to push buttons to bottom */}
  <div className="flex-grow" />

  <Group mt="md" position="apart">
    <Button
      size="xs"
      variant="filled"
      color="grey"
      onClick={() => handleEdit(item)}
    >
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

      <Modal
        opened={modalOpen}
        onClose={resetForm}
        title={editingNews ? "Edit News" : "Add News"}
        centered
      >
        <Stack>
          <TextInput
            placeholder="Title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={5}
          />
          <FileInput
            label="Upload Image"
            placeholder="Choose image"
            value={image}
            onChange={setImage}
            accept="image/*"
            clearable
          />
          {image && typeof image !== "string" && (
            <Image src={URL.createObjectURL(image)} height={160} mb="sm" />
          )}
          <Group position="right" mt="md">
            <Button
              variant="gradient"
              gradient={{ from: '#B22234', to: '#FF6B6B' }}
              onClick={handleSubmit}
            >
              {editingNews ? "Update" : "Post"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
