import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import Hero from '../assets/hero3d.png';

export function HeroSection() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe]"
      id="home"
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -right-32 w-[40rem] h-[40rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10 py-20 md:py-32">
        <SimpleGrid cols={isMobile ? 1 : 2} spacing={50} className="items-center">
          
          {/* Text Section */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Stack spacing={isMobile ? 24 : 32}>
              <motion.div>
                <Title
                  order={1}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center md:text-left text-gray-900 tracking-tight"
                  style={{ paddingBottom: "30px" }}
                >
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-[#B22234] to-[#FF6B6B] bg-clip-text text-transparent">
                    Lehulum Real Estate
                  </span>
                </Title>
              </motion.div>

              <motion.div>
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  className="text-gray-600 leading-relaxed font-light max-w-xl mx-auto md:mx-0 text-center md:text-left"
                >
                  Discover <span className="font-semibold text-[#B22234]">modern living</span> with{' '}
                  <span className="font-semibold text-[#FF6B6B]">elegance</span> and{' '}
                  <span className="font-semibold text-gray-700">comfort</span>. From stylish one-bedroom apartments to
                  luxury penthouses, we create homes designed for your lifestyle.
                </Text>
              </motion.div>

              <motion.div>
                <Group spacing="md">
                  <Button
  size="lg"
  radius="xl"
  rightSection={<IconArrowRight size={18} />}
  onClick={() =>
    document.getElementById("apartments")?.scrollIntoView({ behavior: "smooth" })
  }
  variant="gradient"
  gradient={{ from: "#B22234", to: "#FF6B6B" }}
  className="shadow-md hover:shadow-lg transition-all font-semibold uppercase tracking-wide"
>
                    View Apartments
                  </Button>
                  <Button
  size="lg"
  radius="xl"
  variant="outline"
  color="dark"
  onClick={() =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }
  className="border-2 text-gray-800 hover:bg-gray-50 transition-colors font-semibold uppercase tracking-wide"
>
                    Contact Us
                  </Button>
                </Group>
              </motion.div>

              <motion.div>
                <Group mt={20} spacing={isMobile ? 'xs' : 'md'} className="flex-wrap">
                  {[
                    'Prime City Locations',
                    'Elegant Modern Designs',
                    'Flexible Payment Plans',
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.2 }}
                    >
                      <Group spacing="xs">
                        <IconCheck size={18} color="#FF6B6B" />
                        <Text size="sm" className="font-medium text-gray-700">
                          {feature}
                        </Text>
                      </Group>
                    </motion.div>
                  ))}
                </Group>
              </motion.div>
            </Stack>
          </motion.div>

          {/* Illustration */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <img
                src={Hero}
                alt="Luxury apartment illustration"
                className="w-full max-w-lg h-auto drop-shadow-2xl rounded-xl"
              />
            </motion.div>
          )}
        </SimpleGrid>
      </Container>
    </div>
  );
}
