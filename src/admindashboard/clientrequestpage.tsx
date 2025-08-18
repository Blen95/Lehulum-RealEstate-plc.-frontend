// src/pages/admin/AdminClientRequestsPage.tsx
import { useEffect, useState } from "react";
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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  fetchInquiries,
  fetchTips,
  fetchComplaints,
  resolveComplaint,
} from "../api/clientrequestapi.js";

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
  message?: string; // <-- Add this field
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
    setResponseText("");
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

  const renderComplaintCards = (list: Complaint[]) =>
  list.map((c) => (
    <Card key={c.id} shadow="sm" p="md" mb="sm">
      <Group position="apart" align="flex-start">
        {/* Left side */}
        <div style={{ flex: 1 }}>
          <Group position="apart">
            <Text weight={500}>{c.subject}</Text>
            <Badge color={c.status === "pending" ? "yellow" : "gray"}>
              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
            </Badge>
          </Group>

          <Text size="sm" mt="xs">
            Tracking #: {c.tracking_number}
          </Text>
          <Text size="sm" mt="xs">
            Submitted: {new Date(c.created_at).toLocaleString()}
          </Text>
        </div>

        {/* Right side (button) */}
        <Button
          size="xs"
          onClick={() => openResolveModal(c)}
          disabled={c.status !== "pending"}
          color={c.status === "pending" ? "blue" : "gray.7"}
          style={{ marginTop: 6 }} // align with text
        >
          {c.status === "pending" ? "Take Action" : "View Response"}
        </Button>
      </Group>
    </Card>
  ));


  const renderTipCards = (list: Tip[]) =>
  list.map((t) => (
    <Card key={t.id} shadow="sm" p="md" mb="sm">
      <Text weight={500}>{t.email}</Text>
      <Text size="sm" mt="xs">
        <strong>Suggestion:</strong> {t.suggestion}
      </Text>
      {t.message && (
        <Text size="sm" mt="xs">
          <strong>Message:</strong> {t.message}
        </Text>
      )}
      <Text size="xs" color="dimmed" mt="xs">
        {new Date(t.created_at).toLocaleString()}
      </Text>
    </Card>
  ));

  const renderInquiryCards = (list: Inquiry[]) =>
    list.map((i) => (
      <Card key={i.id} shadow="sm" p="md" mb="sm">
        <Text weight={500}>{i.email}</Text>
        <Text size="sm" mt="xs">
          {i.message}
        </Text>
        <Text size="xs" color="dimmed" mt="xs">
          {new Date(i.created_at).toLocaleString()}
        </Text>
      </Card>
    ));

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="complaints">Complaints</Tabs.Tab>
        <Tabs.Tab value="tips">Tips & Suggestions</Tabs.Tab>
        <Tabs.Tab value="inquiries">Inquiries</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="all" pt="xs">
        <ScrollArea style={{ height: 600 }}>
          <Stack>
            <Text weight={600}>Complaints</Text>
            {renderComplaintCards(complaints)}

            <Text weight={600} mt="md">
              Tips & Suggestions
            </Text>
            {renderTipCards(tips)}

            <Text weight={600} mt="md">
              Inquiries
            </Text>
            {renderInquiryCards(inquiries)}
          </Stack>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="complaints" pt="xs">
        <ScrollArea style={{ height: 600 }}>
          <Stack>{renderComplaintCards(complaints)}</Stack>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="tips" pt="xs">
        <ScrollArea style={{ height: 600 }}>
          <Stack>{renderTipCards(tips)}</Stack>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="inquiries" pt="xs">
        <ScrollArea style={{ height: 600 }}>
          <Stack>{renderInquiryCards(inquiries)}</Stack>
        </ScrollArea>
      </Tabs.Panel>

      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedComplaint(null);
          setResponseText("");
        }}
        title={
          selectedComplaint?.status === "pending"
            ? "Resolve Complaint"
            : "Complaint Details"
        }
        size="lg"
      >
        {selectedComplaint && (
          <Stack spacing="sm">
            <Text weight={600}>Subject:</Text>
            <Text>{selectedComplaint.subject}</Text>

            <Text weight={600}>Details:</Text>
            <Text>{selectedComplaint.details}</Text>

            {selectedComplaint.attachment_url && (
              <Image
                src={selectedComplaint.attachment_url}
                height={150}
                fit="contain"
              />
            )}

            {selectedComplaint.status === "pending" ? (
              <>
                <Text weight={600}>Response:</Text>
                <Textarea
                  placeholder="Write response..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.currentTarget.value)}
                  minRows={4}
                />
                <Group position="right">
                  <Button onClick={handleResolve}>Resolve</Button>
                </Group>
              </>
            ) : selectedComplaint.response ? (
              <>
                <Text weight={600}>Admin Response:</Text>
                <Text color="green">{selectedComplaint.response}</Text>
              </>
            ) : null}
          </Stack>
        )}
      </Modal>
    </Tabs>
  );
}
