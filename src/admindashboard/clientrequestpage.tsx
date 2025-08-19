import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tabs,
  Card,
  Text,
  Button,
  Group,
  ScrollArea,
  Modal,
  Textarea,
  Badge,
  Stack,
  Image,
  Container,
  Title,
  SimpleGrid,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  fetchInquiries,
  fetchTips,
  fetchComplaints,
  resolveComplaint,
} from "../api/clientrequestapi.js";
import { IconCheck, IconMessage, IconAlertCircle, IconMail } from "@tabler/icons-react";
import AdminNavbar from "./adminnav.js";

type Inquiry = { 
  id: number; 
  name?: string;
  email: string; 
  message: string; 
  created_at: string; 
}; 

type Tip = {
  id: number;
  name?: string;
  email: string;
  suggestion: string;
  message?: string;
  created_at: string;
}; 

type Complaint = { 
  id: number; 
  subject: string; 
  details: string; 
  status: "pending" | "resolved" | "rejected"; 
  tracking_number: string; 
  attachment_url?: string | null; 
  response?: string; 
  created_at: string; 
};

export default function AdminClientRequestsPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>("all");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [responseText, setResponseText] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [inq, tp, cmp] = await Promise.all([
        fetchInquiries(),
        fetchTips(),
        fetchComplaints(),
      ]);
      setInquiries(inq.data);
      setTips(tp.data);
      setComplaints(cmp.data);
    } catch (err) {
      console.error(err);
      showNotification({
        title: "Error",
        message: "Failed to fetch data.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openResolveModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setResponseText(complaint.response || "");
    setModalOpen(true);
  };

  const handleResolve = async () => {
    if (!selectedComplaint) return;

    if (!responseText.trim()) {
      showNotification({
        title: "Validation",
        message: "Response cannot be empty",
        color: "red",
      });
      return;
    }

    try {
      await resolveComplaint(selectedComplaint.id, {
        status: "resolved",
        response: responseText,
      });

      showNotification({
        title: "Success",
        message: "Complaint resolved successfully",
        color: "green",
      });

      setModalOpen(false);
      setResponseText("");
      setSelectedComplaint(null);
      loadData();
    } catch (err) {
      console.error(err);
      showNotification({
        title: "Error",
        message: "Failed to resolve complaint",
        color: "red",
      });
    }
  };

  const renderComplaintCards = (list: Complaint[]) => (
    <SimpleGrid cols={1} spacing="md">
      {list.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            shadow="sm"
            p="lg"
            radius="lg"
            withBorder
            className="hover:shadow-md transition-shadow"
          >
            <Group position="apart" align="flex-start" noWrap>
              <div style={{ flex: 1 }}>
                <Group position="apart" mb="xs">
                  <Text weight={600} size="lg">
                    {c.subject}
                  </Text>
                  <Badge
                    color={
                      c.status === "pending"
                        ? "orange"
                        : c.status === "resolved"
                        ? "green"
                        : "red"
                    }
                    variant="light"
                    radius="sm"
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed" mb="xs">
                  Tracking #: {c.tracking_number}
                </Text>
                <Text size="sm" color="dimmed">
                  Submitted: {new Date(c.created_at).toLocaleString()}
                </Text>
              </div>

              <Button
                size="sm"
                radius="xl"
                variant={c.status === "pending" ? "filled" : "outline"}
                color={
                  c.status === "pending"
                    ? "red"
                    : c.status === "resolved"
                    ? "green"
                    : "gray"
                }
                onClick={() => openResolveModal(c)}
                rightIcon={
                  c.status === "pending" ? (
                    <IconAlertCircle size={16} />
                  ) : (
                    <IconCheck size={16} />
                  )
                }
              >
                {c.status === "pending" ? "Take Action" : "View Details"}
              </Button>
            </Group>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  );

  const renderTipCards = (list: Tip[]) => (
    <SimpleGrid cols={1} spacing="md">
      {list.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card shadow="sm" p="lg" radius="lg" withBorder>
            <Group align="flex-start" noWrap>
              <Box
                p="sm"
                bg="red.1"
                style={{ borderRadius: "50%" }}
              >
                <IconMessage size={24} color={theme.colors.red[6]} />
              </Box>
              <div style={{ flex: 1 }}>
                <Text weight={600}>{t.email}</Text>
                <Text size="sm" mt="xs">
                  <Text span weight={600}>
                    Suggestion:
                  </Text>{" "}
                  {t.suggestion}
                </Text>
                {t.message && (
                  <Text size="sm" mt="xs">
                    <Text span weight={600}>
                      Message:
                    </Text>{" "}
                    {t.message}
                  </Text>
                )}
                <Text size="xs" color="dimmed" mt="xs">
                  {new Date(t.created_at).toLocaleString()}
                </Text>
              </div>
            </Group>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  );

  const renderInquiryCards = (list: Inquiry[]) => (
    <SimpleGrid cols={1} spacing="md">
      {list.map((i) => (
        <motion.div
          key={i.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card shadow="sm" p="lg" radius="lg" withBorder>
            <Group align="flex-start" noWrap>
              <Box
                p="sm"
                bg="red.1"
                style={{ borderRadius: "50%" }}
              >
                <IconMail size={24} color={theme.colors.red[6]} />
              </Box>
              <div style={{ flex: 1 }}>
                <Text weight={600}>{i.email}</Text>
                <Text size="sm" mt="xs">
                  {i.message}
                </Text>
                <Text size="xs" color="dimmed" mt="xs">
                  {new Date(i.created_at).toLocaleString()}
                </Text>
              </div>
            </Group>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  );

  return (
    <>
<Container size="xl" className="relative z-10 px-8 pt-24">

    <AdminNavbar/>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          order={1}
          size="h2"
          weight={700}
          mb="xl"
          align="center"
          className="text-gray-800"
        >
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Client Requests
          </span>{" "}
          Management
        </Title>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="pills"
          color="red"
          radius="xl"
        >
          <Tabs.List grow mb="xl">
            <Tabs.Tab value="all">All Requests</Tabs.Tab>
            <Tabs.Tab value="complaints">Complaints</Tabs.Tab>
            <Tabs.Tab value="tips">Tips & Suggestions</Tabs.Tab>
            <Tabs.Tab value="inquiries">Inquiries</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all" pt="xs">
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              <Stack spacing="xl">
                <Box>
                  <Title order={3} mb="md" color="red.6">
                    Complaints
                  </Title>
                  {renderComplaintCards(complaints)}
                </Box>

                <Box>
                  <Title order={3} mb="md" color="red.6">
                    Tips & Suggestions
                  </Title>
                  {renderTipCards(tips)}
                </Box>

                <Box>
                  <Title order={3} mb="md" color="red.6">
                    Inquiries
                  </Title>
                  {renderInquiryCards(inquiries)}
                </Box>
              </Stack>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="complaints" pt="xs">
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              {renderComplaintCards(complaints)}
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="tips" pt="xs">
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              {renderTipCards(tips)}
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="inquiries" pt="xs">
            <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
              {renderInquiryCards(inquiries)}
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>

        <Modal
          opened={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedComplaint(null);
            setResponseText("");
          }}
          title={
            <Title order={3} color={selectedComplaint?.status === "pending" ? "orange" : "green"}>
              {selectedComplaint?.status === "pending"
                ? "Resolve Complaint"
                : "Complaint Details"}
            </Title>
          }
          size="lg"
          radius="lg"
          overlayProps={{ blur: 3 }}
        >
          {selectedComplaint && (
            <Stack spacing="md">
              <Box>
                <Text weight={600} size="sm" color="dimmed">
                  Subject:
                </Text>
                <Text size="lg">{selectedComplaint.subject}</Text>
              </Box>

              <Box>
                <Text weight={600} size="sm" color="dimmed">
                  Details:
                </Text>
                <Text>{selectedComplaint.details}</Text>
              </Box>

              {selectedComplaint.attachment_url && (
                <Box>
                  <Text weight={600} size="sm" color="dimmed" mb="xs">
                    Attachment:
                  </Text>
                  <Image
                    src={selectedComplaint.attachment_url}
                    height={200}
                    fit="contain"
                    radius="md"
                  />
                </Box>
              )}

              {selectedComplaint.status === "pending" ? (
                <>
                  <Textarea
                    label="Your Response"
                    placeholder="Write your detailed response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.currentTarget.value)}
                    minRows={5}
                    radius="md"
                  />
                  <Group position="right" mt="md">
                    <Button
                      variant="outline"
                      onClick={() => setModalOpen(false)}
                      radius="xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleResolve}
                      color="red"
                      radius="xl"
                      rightIcon={<IconCheck size={18} />}
                    >
                      Resolve Complaint
                    </Button>
                  </Group>
                </>
              ) : selectedComplaint.response ? (
                <Box>
                  <Text weight={600} size="sm" color="dimmed">
                    Admin Response:
                  </Text>
                  <Card
                    bg="green.0"
                    radius="md"
                    mt="xs"
                    p="md"
                  >
                    <Text color="green.8">{selectedComplaint.response}</Text>
                  </Card>
                </Box>
              ) : null}
            </Stack>
          )}
        </Modal>
      </motion.div>
    </Container>
    </>
  );
}