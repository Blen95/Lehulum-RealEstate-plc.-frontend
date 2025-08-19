import { useEffect, useState } from "react";
import { Container, Title, Text, Card, Grid } from "@mantine/core";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import AdminNavbar from "./adminnav";

// Import APIs (make sure filenames match!)
import { fetchComplaints, fetchTips, fetchInquiries } from "../api/clientrequestapi.js";
import { fetchApartments } from "../api/apartmentapi.js";

const COLORS = ["#CBAF88", "#E4D6B0", "#FFBC9A", "#FFDDA0"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ complaints: 0, tips: 0, inquiries: 0, requests: 0 });
  const [apartments, setApartments] = useState([]);

  const loadData = async () => {
    try {
      const [complaintsData, tipsData, inquiriesData, apartmentsData] = await Promise.all([
        fetchComplaints(),
        fetchTips(),
        fetchInquiries(),
        fetchApartments(),
      ]);

      setStats({
        complaints: complaintsData.data?.length || complaintsData.length || 0,
        tips: tipsData.data?.length || tipsData.length || 0,
        inquiries: inquiriesData.data?.length || inquiriesData.length || 0,
        requests:
          (complaintsData.data?.length || complaintsData.length || 0) +
          (inquiriesData.data?.length || inquiriesData.length || 0),
      });

      // If backend returns array directly, use apartmentsData
      const apartmentAvailability = (apartmentsData.data || apartmentsData || []).map(a => ({
        name: a.name || a.type,
        available: a.remaining_available || 0,
      }));

      setApartments(apartmentAvailability);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Client Requests", value: stats.requests },
    { name: "Tips & Suggestions", value: stats.tips },
    { name: "Complaints", value: stats.complaints },
    { name: "Inquiries", value: stats.inquiries },
  ];

  return (
<div className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] min-h-screen py-16 px-8">
      <AdminNavbar />
      <Container size="xl" px="lg" className="relative z-10">
        <Title order={2} ta="center" size="2rem" fw={700} mb={50} ff="serif">
            <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent">
              Admin Dashboard
            </span>{" "}
            
          </Title>
        <Text
          style={{
            color: "#4A4A4A",       // soft dark gray
            fontSize: "1.1rem",     // slightly larger than default
            lineHeight: 1.7,        // airy line spacing
            fontWeight:600,        // light to medium
            letterSpacing: "0.5px", // subtle spacing for elegance
          }}
        >
          Real-time overview of client interactions and apartment availability.
        </Text>

        <Grid gutter="lg">
          {/* Pie Chart */}
          <Grid.Col xs={12} md={6}>
            <Card shadow="lg" radius="xl" p="md">
              <Title 
  order={4} 
  mb="md" 
  ff="serif" 
  fw={700} // optional, for bold like the first title
  style={{
    background: "linear-gradient(to right, #B22234, #FF6B6B)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>
  Client Interactions
</Title>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid.Col>

          {/* Bar Chart */}
          <Grid.Col xs={12} md={6}>
            <Card shadow="lg" radius="xl" p="md">
              <Title 
  order={4} 
  mb="md" 
  ff="serif" 
  fw={700} // optional, for bold like the first title
  style={{
    background: "linear-gradient(to right, #B22234, #FF6B6B)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>Apartment Availability</Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={apartments}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="available" fill="#CBAF88" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
