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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { submitComplaint, submitTip, submitInquiry } from "../api/contactapi.js";

export default function ContactUs() {
  const [type, setType] = useState("inquiry");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form); 

    try {
      let result;

      if (type === "complaint") {
        result = await submitComplaint(formData);
        console.log(result);
        notifications.show({
          title: "Complaint Submitted!",
          message: `Your complaint has been submitted. Tracking #: ${result.complaint?.tracking_number}`,
          color: "green",
        });
      } else if (type === "tips") {
  const payload = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };
        result = await submitTip(payload);
        notifications.show({
          title: "Tip Submitted!",
          message: "Thank you for your suggestion!",
          color: "green",
        });
      } else if (type === "inquiry") {
  const payload = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };


  result = await submitInquiry(payload);

  notifications.show({
    title: "Message Sent!",
    message: "Your inquiry has been sent successfully!",
    color: "green",
  });
}


      form.reset();
    } catch (error: any) {
      console.error("Inquiry Error:", error.response?.data || error.message);

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
    <section id="contact" className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-4">
            <Title order={2}>Contact Us</Title>
          </div>
          <Text className="text-gray-600">We’d love to hear from you</Text>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4"
          encType="multipart/form-data"
        >
          {/* Type Selector */}
          <Select
            label="Choose type"
            value={type}
            onChange={setType}
            data={[
              { value: "complaint", label: "Complaint" },
              { value: "tips", label: "Tip & Suggestion" },
              { value: "inquiry", label: "General Inquiry" },
            ]}
            required
          />

          {/* Show Name only for tips & inquiries */}
          {type !== "complaint" && (
            <TextInput name="name" placeholder="Your Name" required />
          )}

          <TextInput name="email" type="email" placeholder="Your Email" required />

          {/* Complaint specific fields */}
          {type === "complaint" && (
            <>
              <TextInput
                name="subject"
                placeholder="What is the complaint about?"
                required
              />
              <Textarea name="details" placeholder="Additional details (optional)" />
              <FileInput
                name="attachment"
                label="Attach evidence (optional)"
                accept="image/*,.pdf,.doc,.docx"
              />
            </>
          )}

          {/* Inquiry / Tips fields */}
          {type !== "complaint" && (
            <Textarea
              name="message"
              placeholder="Your Message"
              minRows={4}
              required
            />
          )}

          <Button
            fullWidth
            color="red"
            radius="xl"
            type="submit"
            loading={loading}
          >
            {type === "complaint" ? "Submit Complaint" : "Send Message"}
          </Button>
        </form>
        
      </Container>
    </section>
  );
}
