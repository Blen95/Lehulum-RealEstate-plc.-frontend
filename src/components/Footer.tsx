import { Container, Group, ActionIcon, Text, rem, Anchor, Box } from '@mantine/core';
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import logo from '../assets/lehulumlogo.jpg';

export default function Footer() {
  return (
    <footer
      style={{
        
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid #eaeaea',
        backgroundColor: 'white',
        paddingTop: rem(10),
        paddingBottom: rem(10),
        zIndex: 100,
      }}
    >
      <Container size="lg" style={{ display: 'flex', flexDirection: 'column', gap: rem(20) }}>
        {/* Top Section: Social Media + Contact Info + Logo & Copyright */}
        <Group justify="space-between" align="center" wrap="wrap" style={{ width: '100%' }}>
          {/* Social Media Icons */}
          <Group gap="xs" wrap="nowrap">
            <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size="1.1em" />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size="1.1em" />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size="1.1em" />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size="1.1em" />
            </ActionIcon>
          </Group>

          {/* Contact Info */}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: rem(8),
            }}
          >
            <Anchor href="https://maps.app.goo.gl/WJ3XX9Mzsk4wtXiP8" target="_blank" rel="noopener noreferrer" size="sm" style={{ color: 'black', cursor: 'pointer' }}>
              <Group spacing="xs" align="center" noWrap>
                <FaMapMarkerAlt />
                <Text size="sm">Bole Dembel Shopping Center, 7th Floor</Text>
              </Group>
            </Anchor>
            <Anchor href="tel:+251905787878" size="sm" style={{ color: 'black', cursor: 'pointer' }}>
              <Group spacing="xs" align="center" noWrap>
                <FaPhoneAlt />
                <Text>+251 90 578 7878</Text>
              </Group>
            </Anchor>
            <Anchor href="tel:+251944999992" size="sm" style={{ color: 'black', cursor: 'pointer' }}>
              <Group spacing="xs" align="center" noWrap>
                <FaPhoneAlt />
                <Text>+251 94 499 9992</Text>
              </Group>
            </Anchor>
          </Box>

          {/* Logo + All Rights Reserved */}
          <Group gap="sm" align="center" style={{ flexDirection: 'column' }}>
            <img src={logo} alt="Logo" style={{ height: '60px', marginLeft: rem(10), marginBottom: rem(10) }} />
          </Group>
        </Group>

        {/* Developed By centered at bottom */}
        <Box style={{ borderTop: '1px solid #eaeaea', paddingTop: rem(12), textAlign: 'center' }}>
          
            <Text size="sm" color="dimmed" ta="center" fw={500}>
              © {new Date().getFullYear()} Lehulum. All rights reserved.
            </Text>
          
         
        </Box>
      </Container>
    </footer>
  );
}
