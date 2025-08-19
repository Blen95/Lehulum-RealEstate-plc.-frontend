import { useState } from "react";
import {
  Button,
  Container,
  Text,
  TextInput,
  Textarea,
  Title,
  Select,
  FileInput,
  Paper,
  Divider,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { submitComplaint, submitTip, submitInquiry } from "../api/contactapi.js";

export default function ContactUs() {
  const [type, setType] = useState("inquiry");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let result;

      if (type === "complaint") {
        result = await submitComplaint(formData);
        notifications.show({
          title: "Complaint Submitted!",
          message: `Tracking #: ${result.complaint?.tracking_number}`,
          color: "green",
        });
      } else {
        const payload = {
          name: formData.get("name")?.toString() || "",
          email: formData.get("email")?.toString() || "",
          message: formData.get("message")?.toString() || "",
        };

        if (type === "tips") {
          await submitTip(payload);
          notifications.show({
            title: "Tip Submitted!",
            message: "Thank you for your suggestion!",
            color: "green",
          });
        } else {
          await submitInquiry(payload);
          notifications.show({
            title: "Message Sent!",
            message: "Your inquiry has been sent successfully!",
            color: "green",
          });
        }
      }

      form.reset();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] py-20 px-6"
    >
      {/* Decorative shapes for consistency */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-32 w-[32rem] h-[32rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container size="md" className="relative z-10">
        {/* Header */}
<div className="text-center mb-16">
  <Title
    order={2}
    className="text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent"
  >
    Get in Touch
  </Title>
  <Text
    className="mt-12 text-gray-600 max-w-[700px] mx-auto text-lg leading-relaxed text-center"
  >
    We’d love to hear from you — whether it’s a{" "}
    <span className="font-semibold text-red-600">question</span>,{" "}
    <span className="font-semibold text-red-600">suggestion</span>, or{" "}
    <span className="font-semibold text-red-600">concern</span>.
  </Text>
</div>


        {/* Form */}
        <Paper
          shadow="lg"
          radius="xl"
          p="xl"
          withBorder
          className="bg-white border border-red-100/60 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Type Selector */}
            <Group grow mb="md">
              <Select
                label="Select Message Type"
                value={type}
                onChange={setType}
                data={[
                  { value: "complaint", label: "Complaint" },
                  { value: "tips", label: "Tip & Suggestion" },
                  { value: "inquiry", label: "General Inquiry" },
                ]}
                required
              />
            </Group>

            {/* Common Fields */}
            {type !== "complaint" && (
              <TextInput
                name="name"
                label="Your Name"
                placeholder="John Doe"
                required
                mb="sm"
              />
            )}

            <TextInput
              name="email"
              label="Your Email"
              placeholder="example@lehulum.com"
              type="email"
              required
              mb="sm"
            />

            {/* Complaint Specific */}
            {type === "complaint" && (
              <>
                <TextInput
                  name="subject"
                  label="Subject"
                  placeholder="What is the complaint about?"
                  required
                  mb="sm"
                />
                <Textarea
                  name="details"
                  label="Additional Details"
                  placeholder="Optional details..."
                  minRows={4}
                  mb="sm"
                />
                <FileInput
                  name="attachment"
                  label="Attach Evidence (optional)"
                  accept="image/*,.pdf,.doc,.docx"
                  mb="md"
                />
              </>
            )}

            {/* Tips / Inquiry Message */}
            {type !== "complaint" && (
              <Textarea
                name="message"
                label="Message"
                placeholder="Write your message here..."
                minRows={4}
                required
                mb="md"
              />
            )}

            <Divider my="md" />

            {/* Submit Button */}
            <Button
              fullWidth
              radius="xl"
              type="submit"
              loading={loading}
              color="red"
              size="md"
              className="font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
            >
              {type === "complaint" ? "Submit Complaint" : "Send Message"}
            </Button>
          </form>
        </Paper>
      </Container>
    </section>
  );
}
