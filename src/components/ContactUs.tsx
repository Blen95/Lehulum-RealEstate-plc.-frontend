import { Button, Container, Text, TextInput, Textarea, Title } from "@mantine/core";

export default function ContactUs() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-4">
            <Title order={2}>Contact Us</Title>
          </div>
          <Text className="text-gray-600">We’d love to hear from you</Text>
        </div>
        <form className="max-w-xl mx-auto space-y-4">
          <TextInput placeholder="Your Name" required />
          <TextInput placeholder="Your Email" required />
          <Textarea placeholder="Your Message" minRows={4} required />
          <Button fullWidth color="red" radius="xl">Send Message</Button>
        </form>
      </Container>
    </section>
  );
}
