import { useEffect, useRef, useState } from "react";
import { Card, Text, Group, Avatar, ScrollArea, Badge, ActionIcon, Notification } from "@mantine/core";
import { TbCheck, TbPackage, TbReceipt2, TbBell,TbCancel } from "react-icons/tb";
import { getNotifications } from "../services/notification";
import pusher from "../services/pusher";
import { confirmNegotiation } from "../services/collectorapi";

interface NotificationData {
  id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [newNotification, setNewNotification] = useState<NotificationData | null>(null);
  const token = useRef(localStorage.getItem("token"));
  const userId = useRef(localStorage.getItem("userId"));

  useEffect(() => {
    if (token.current) {
      getNotifications(token.current).then((data) => {
        if (data) {
          setNotifications(data.notifications);
        }
      });

      const channel = pusher.subscribe(`notifications.${userId.current}`);
      channel.bind("NewNotification", (data: { notification: NotificationData }) => {
        setNotifications((prev) => [data.notification, ...prev]);

        // Show the new notification
        setNewNotification(data.notification);

        // Hide the notification after 5 seconds
        setTimeout(() => {
          setNewNotification(null);
        }, 5000);
      });

      return () => pusher.unsubscribe(`notifications.${userId.current}`);
    }
  }, [token.current]);

  const handleConfirmNegotiation = async (notificationId: number) => {
    try {
      console.log("Confirming negotiation for:", notificationId);
      await confirmNegotiation(token.current,notificationId);
      
      setNotifications(prevNotifications => 
      prevNotifications.filter(notif => notif.id !== notificationId)
    );
    } catch (err) {
      console.error("Failed to confirm negotiation:", err);
    }
  };
  
  const handleIgnoreNegotiation = async (notificationId: number) => {
    try {
      // Call your backend API to ignore the negotiation
      console.log("Ignoring negotiation for:", notificationId);
      setNotifications(prevNotifications => 
      prevNotifications.filter(notif => notif.id !== notificationId)
    );
    } catch (err) {
      console.error("Failed to ignore negotiation:", err);
    }
  };
  

  return (
    <>
      {/* Show this only when the notifications panel is closed */}
      {!isOpen && newNotification && (
        <Notification
          color="teal"
          radius="md"
          title={newNotification.type}
          icon={<TbBell size={20} />}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {newNotification.message}
        </Notification>
      )}

      {isOpen && (
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            width: "450px",
            zIndex: 1000,
            backgroundColor: "white",
          }}
          mt={"40px"}
        >
          <Group mb="md" justify="space-between">
            <Text fw={700} size="lg">
              Notifications
            </Text>
            <ActionIcon size="sm" variant="transparent" color={"green"} onClick={() => setIsOpen(false)}>
              ✖
            </ActionIcon>
          </Group>

          <ScrollArea h={500} type="auto">
            {notifications.length ? (
              notifications.map((notif) => (
          <Card
            key={notif.id}
            shadow="xs"
            p="md"
            mb="sm"
            radius="md"
            withBorder
            style={{ cursor: "pointer", backgroundColor: notif.is_read ? "#f8f9fa" : "white" }}
          >
            <Group align="flex-start" justify="space-between">
              <Group>
                <Avatar color={notif.is_read ? "gray" : "green"} radius="xl">
                  {notif.type === "New Order" ? <TbPackage size={20} /> : notif.type === "Payment Received" ? <TbReceipt2 size={20} /> : <TbCheck size={20} />}
                </Avatar>
                <Text fw={500}>{notif.type}</Text>

                <div>
                  <Text size="sm" c="dimmed">
                    {notif.message}
                  </Text>
                </div>
              </Group>

                  <Badge color={notif.is_read ? "gray" : "green"} variant="light">
                    {new Date(notif.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </Badge>
                </Group>

                {notif.type === "Negotiation Request" && (
                  <Group mt="sm" justify="flex-end">
                    <ActionIcon  onClick={() => handleConfirmNegotiation(notif.id)}>
                      <TbCheck />
                    </ActionIcon>
                    <ActionIcon color="red" variant="filled" onClick={() => handleIgnoreNegotiation(notif.id)}>
                      <TbCancel/>
                    </ActionIcon>
                  </Group>
                )}
              </Card>

              ))
            ) : (
              <Text c="dimmed" ta="center" py="md">
                No notifications
              </Text>
            )}
          </ScrollArea>
        </Card>
      )}
    </>
  );
};

export default Notifications;
