import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import { themes } from '@/styles/theme';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';

interface ClientExample {
  name: string;
  segment: string;
  website: string;
  description: string;
  highlights: string[];
}

const clientExamples: ClientExample[] = [
  {
    name: 'VK Marmoraria',
    segment: 'Marmoraria',
    website: 'https://www.vkmarmoraria.com.br/',
    description: 'Site moderno com portfólio visual dos trabalhos em mármore e granito.',
    highlights: ['Portfolio', 'SEO', 'Responsivo'],
  },
  {
    name: 'Mariana Karas',
    segment: 'Beleza/Estética',
    website: 'https://marianakaras.com.br/',
    description: 'Website elegante com agendamento online e portfólio de serviços.',
    highlights: ['Agendamento', 'SEO', 'Mobile-First'],
  },
];

export default function ClientExamples() {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: themes.colors.AzulEscuro,
          mb: 3,
          fontSize: { xs: '1.3rem', md: '1.5rem' },
        }}
      >
        Exemplos de Clientes Felizes
      </Typography>

      <Stack spacing={2.5}>
        {clientExamples.map((client, index) => (
          <Card
            key={index}
            sx={{
              background: `linear-gradient(135deg, ${themes.colors.Branco} 0%, ${themes.colors.Vermelho}05 100%)`,
              border: `2px solid ${themes.colors.Vermelho}30`,
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: `0 10px 40px ${themes.colors.Vermelho}30`,
                transform: 'translateY(-4px)',
                borderColor: themes.colors.Vermelho,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              {/* Header com Logo e Nome */}
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 1.5 }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: themes.colors.AzulEscuro,
                        fontSize: '1.1rem',
                      }}
                    >
                      {client.name}
                    </Typography>
                    <Chip
                      label={client.segment}
                      size="small"
                      sx={{
                        backgroundColor: `${themes.colors.Vermelho}20`,
                        color: themes.colors.Vermelho,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        mt: 0.5,
                      }}
                    />
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          color: themes.colors.Vermelho,
                          fontSize: '1.2rem',
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </Box>

              {/* Descrição */}
              <Typography
                variant="body2"
                sx={{
                  color: themes.colors.AzulEscuro,
                  mb: 2,
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}
              >
                {client.description}
              </Typography>

              {/* Highlights */}
              <Box sx={{ mb: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {client.highlights.map((highlight, idx) => (
                  <Chip
                    key={idx}
                    label={highlight}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: themes.colors.Azul,
                      color: themes.colors.Azul,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>

              {/* Botão Visitar */}
              <Button
                component={MuiLink}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                sx={{
                  borderColor: themes.colors.Vermelho,
                  color: themes.colors.Vermelho,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: `${themes.colors.Vermelho}10`,
                    borderColor: themes.colors.Vermelho,
                  },
                }}
              >
                Visitar Website
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* CTA Section */}
      <Card
        sx={{
          background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
          borderRadius: 3,
          mt: 3,
          color: themes.colors.Branco,
          textAlign: 'center',
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Seu Website Pode Ser o Próximo
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
          Comece seu projeto agora e veja o resultado em apenas 2 dias úteis
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9rem',
            opacity: 0.8,
          }}
        >
          A partir de R$ 200,00
        </Typography>
      </Card>
    </Box>
  );
}
