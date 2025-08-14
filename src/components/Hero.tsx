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
  Box,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import Hero from '../assets/hero.svg';

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
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-orange-100 via-white to-white" id="home">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -right-32 w-[40rem] h-[40rem] bg-orange-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-red-100 rounded-full opacity-10 blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10 py-20 md:py-32">
        <SimpleGrid cols={isMobile ? 1 : 2} spacing={50} className="items-center">
          
          {/* Text Section */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Stack spacing={isMobile ? 24 : 32}>
              <motion.div>
                <Title
                  order={1}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-center md:text-left text-gray-900 tracking-tight"
                  style={{paddingBottom:"40px"}}
                >
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Lehulum Real Estate
                  </span>
                </Title>
              </motion.div>

              <motion.div>
                <Text
                  size={isMobile ? 'md' : 'xl'}
                  className="text-gray-700 font-light max-w-2xl mx-auto md:mx-0 text-center md:text-left"
                >
                  Experience <span className="font-semibold text-red-500">modern living</span> with{' '}
                  <span className="font-semibold text-red-400">elegance</span> and{' '}
                  <span className="font-semibold text-red-400">comfort</span>. From stylish one-bedroom apartments to
                  luxury penthouses, we create homes designed for your lifestyle.
                </Text>
              </motion.div>

              <motion.div>
                <Group>
                  <Button
                    size="lg"
                    radius="xl"
                    rightSection={<IconArrowRight size={18} />}
                    onClick={() => navigate('/apartments')}
                    variant="gradient"
                    gradient={{ from: '#cc0000', to: '#ff4d4d' }}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    View Apartments
                  </Button>
                  <Button
                    size="lg"
                    radius="xl"
                    variant="outline"
                    color="dark"
                    onClick={() => navigate('/contact')}
                    className="border-2 hover:bg-gray-50 transition-colors"
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
                      <Group>
                        <IconCheck size={18} color={theme.colors.green[6]} />
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
                className="w-full max-w-lg h-auto drop-shadow-xl"
              />
            </motion.div>
          )}
        </SimpleGrid>
      </Container>
    </div>
  );
}
