import React from 'react';
import { Box, Container, Typography, Grid, Button, Stack, Card, CardContent, Chip } from '@mui/material';
import { themes } from '@/styles/theme';
import ClientExamples from './ClientExamples';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function WebsiteDevelopment() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
          minHeight: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 8 },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${themes.colors.Vermelho}20 0%, transparent 70%)`,
            borderRadius: '50%',
            top: '-200px',
            right: '-200px',
            animation: 'float 8s ease-in-out infinite',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Conteúdo Principal */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {/* Badge */}
                <Box sx={{ mb: 3 }}>
                  <Chip
                    icon={<LocalFireDepartmentIcon />}
                    label="Oferta Limitada"
                    sx={{
                      background: `${themes.colors.Vermelho}30`,
                      color: themes.colors.Branco,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      py: 3,
                      px: 2,
                    }}
                  />
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 900,
                    color: themes.colors.Branco,
                    mb: 2,
                    lineHeight: 1.1,
                  }}
                >
                  Seu Website em <br />
                  <span style={{ color: themes.colors.Vermelho }}>2 Dias Úteis</span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: themes.colors.Branco,
                    mb: 3,
                    fontWeight: 300,
                    fontSize: { xs: '1rem', md: '1.3rem' },
                    opacity: 0.95,
                  }}
                >
                  Site profissional, otimizado para SEO e pronto para vender
                </Typography>

                {/* Benefícios Rápidos */}
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {['Desenvolvimento Completo', 'Otimização SEO', 'Suporte Pós-Entrega'].map(
                    (benefit, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CheckCircleIcon
                          sx={{
                            color: themes.colors.Vermelho,
                            fontSize: '1.5rem',
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            color: themes.colors.Branco,
                            fontWeight: 500,
                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Box>
                    )
                  )}
                </Stack>

                {/* Botão CTA */}
                <Button
                  component="a"
                  href="https://instagram.com/direct/t/diogo_zra"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  startIcon={<InstagramIcon />}
                  sx={{
                    background: themes.colors.Vermelho,
                    color: themes.colors.Branco,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    boxShadow: `0 10px 30px ${themes.colors.Vermelho}40`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 15px 40px ${themes.colors.Vermelho}60`,
                      background: '#E85959',
                    },
                  }}
                >
                  Entrar em Contato
                </Button>

                <Typography
                  variant="caption"
                  sx={{
                    color: themes.colors.Branco,
                    display: 'block',
                    mt: 2,
                    opacity: 0.8,
                  }}
                >
                  A partir de R$ 200,00 • Conversa via Instagram
                </Typography>
              </Box>
            </Grid>

            {/* Destaque Preço */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  background: themes.colors.Branco,
                  borderRadius: 3,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${themes.colors.Vermelho} 0%, ${themes.colors.Azul} 100%)`,
                    color: themes.colors.Branco,
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 300, fontSize: '0.95rem' }}>
                    Pacote Básico
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      my: 1,
                    }}
                  >
                    R$ 200
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    + personalizações disponíveis
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    {[
                      'Website responsivo',
                      'Até 5 páginas',
                      'Integração WhatsApp',
                      'SEO básico',
                      'Entrega em 2 dias úteis',
                      'Suporte 7 dias',
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 1 }}>
                        <CheckCircleIcon
                          sx={{
                            color: themes.colors.Azul,
                            fontSize: '1.2rem',
                            flexShrink: 0,
                          }}
                        />
                        <Typography sx={{ color: themes.colors.AzulEscuro, fontWeight: 500 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    component="a"
                    href="https://instagram.com/direct/t/diogo_zra"
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    variant="contained"
                    startIcon={<InstagramIcon />}
                    sx={{
                      background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                      color: themes.colors.Branco,
                      mt: 3,
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${themes.colors.Azul}40`,
                      },
                    }}
                  >
                    Orçar Agora
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Diferenciais */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            color: themes.colors.AzulEscuro,
            mb: 4,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
          }}
        >
          Por que escolher nossos websites?
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: '⚡ Entrega Rápida',
              desc: '2 dias úteis é tudo que você precisa',
            },
            {
              title: '🎨 Design Moderno',
              desc: 'Sites bonitos e profissionais',
            },
            {
              title: '📱 Mobile First',
              desc: 'Perfeito em celulares e tablets',
            },
            {
              title: '🔍 SEO Otimizado',
              desc: 'Apareça nos resultados do Google',
            },
            {
              title: '💰 Preço Justo',
              desc: 'A partir de R$ 200,00',
            },
            {
              title: '🤝 Suporte',
              desc: '7 dias de suporte pós-entrega',
            },
          ].map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${themes.colors.Branco} 0%, ${themes.colors.Azul}05 100%)`,
                  border: `1px solid ${themes.colors.Azul}20`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${themes.colors.Azul}20`,
                    borderColor: themes.colors.Azul,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: themes.colors.AzulEscuro,
                    mb: 1,
                    fontSize: '1.2rem',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: themes.colors.AzulEscuro, opacity: 0.8 }}>
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Clientes Felizes */}
      <Box sx={{ background: `${themes.colors.Branco}`, py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              color: themes.colors.AzulEscuro,
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Clientes Satisfeitos
          </Typography>
          <ClientExamples />
        </Container>
      </Box>

      {/* CTA Final */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${themes.colors.Vermelho} 0%, ${themes.colors.AzulEscuro} 100%)`,
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          color: themes.colors.Branco,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Pronto para Alavancar Seu Negócio?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              mb: 4,
              opacity: 0.95,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Converse conosco no Instagram e receba um orçamento gratuito em minutos
          </Typography>

          <Button
            component="a"
            href="https://instagram.com/direct/t/diogo_zra"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<InstagramIcon />}
            sx={{
              background: themes.colors.Branco,
              color: themes.colors.Vermelho,
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 15px 40px rgba(0,0,0,0.3)`,
              },
            }}
          >
            Fale com a Gente no Instagram
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
