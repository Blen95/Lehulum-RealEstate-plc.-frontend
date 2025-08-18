// src/pages/admin/AdminNewsPage.jsx
import { useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Card,
  Image,
  Group,
  Modal,
  ScrollArea,
  FileInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { fetchNews, addNews, updateNews, deleteNews } from "../api/adminNewsapi.js";
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
      const data = await fetchNews();
      setNews(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSubmit = async () => {
    const payload = { title, content, image };
    try {
      if (editingNews) {
        await updateNews(editingNews.id, payload);
        showNotification({ title: "Success", message: "Article updated!", color: "green" });
      } else {
        await addNews(payload);
        showNotification({ title: "Success", message: "Article posted!", color: "green" });
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
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteNews(id);
        showNotification({ title: "Deleted", message: "Article deleted!", color: "red" });
        loadNews();
      } catch (err) {
        console.error(err);
        showNotification({ title: "Error", message: "Failed to delete article.", color: "red" });
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setEditingNews(null);
    setModalOpen(false);
  };

  return (
    <div>
      <AdminNavbar/>
      <Button onClick={() => setModalOpen(true)} mb="md" style={{marginTop:"100px"}}>
        Add News/Article
      </Button>

      <ScrollArea style={{ height: 500 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          news.map((item) => (
            <Card key={item.id} shadow="sm" p="lg" mb="md">
              {item.image && (
                <Image
                  src={`http://localhost:8000/storage/${item.image}`}
                  height={160}
                  mb="sm"
                  withPlaceholder
                />
              )}
              <h3>{item.title}</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>{item.content}</pre>
              <Group mt="sm">
                <Button size="xs" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button size="xs" color="red" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Group>
            </Card>
          ))
        )}
      </ScrollArea>

      <Modal opened={modalOpen} onClose={resetForm} title={editingNews ? "Edit News" : "Add News"}>
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
