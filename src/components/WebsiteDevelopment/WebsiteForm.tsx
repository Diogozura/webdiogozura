import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
  Alert,
  InputAdornment,
} from '@mui/material';
import { themes } from '@/styles/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface WebsiteFormProps {
  onFormSubmit?: (data: any) => void;
}

interface FormState {
  companyName: string;
  cnpj: string;
  segment: string;
  logo: File | null;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  services: {
    website: boolean;
    seo: boolean;
    adjustments: boolean;
  };
  budget: string;
  email: string;
  phone: string;
  notes: string;
}

export default function WebsiteForm({ onFormSubmit }: WebsiteFormProps) {
  const [formData, setFormData] = React.useState<FormState>({
    companyName: '',
    cnpj: '',
    segment: '',
    logo: null,
    colors: {
      primary: '#1AC8ED',
      secondary: '#FF7477',
      tertiary: '#1D1A05',
    },
    services: {
      website: true,
      seo: true,
      adjustments: true,
    },
    budget: '200',
    email: '',
    phone: '',
    notes: '',
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'tertiary', value: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value,
      },
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        logo: e.target.files![0],
      }));
    }
  };

  const handleServiceChange = (service: 'website' | 'seo' | 'adjustments') => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    onFormSubmit?.(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${themes.colors.Branco} 0%, ${themes.colors.Azul}05 100%)`,
        border: `2px solid ${themes.colors.Azul}30`,
        borderRadius: 3,
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: themes.colors.AzulEscuro,
            mb: 3,
            fontSize: { xs: '1.3rem', md: '1.5rem' },
          }}
        >
          Solicite Seu Website
        </Typography>

        {submitted && (
          <Alert
            severity="success"
            sx={{ mb: 2, borderRadius: 2 }}
            icon={<CheckCircleIcon />}
          >
            Formulário enviado com sucesso! Entraremos em contato em breve.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Informações Básicas */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Informações da Empresa
              </Typography>

              <TextField
                fullWidth
                label="Nome da Empresa"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Ex: VK Marmoraria"
                required
                size="small"
                sx={{
                  mb: 1.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="XX.XXX.XXX/0001-XX"
                required
                size="small"
                sx={{
                  mb: 1.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Segmento/Ramo"
                name="segment"
                value={formData.segment}
                onChange={handleInputChange}
                placeholder="Ex: Marmoraria, Beleza, Consultoria..."
                required
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />
            </Box>

            {/* Upload de Logo */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Logo
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderColor: themes.colors.Azul,
                  color: themes.colors.Azul,
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: `${themes.colors.Azul}10`,
                  },
                }}
              >
                {formData.logo ? `✓ ${formData.logo.name}` : 'Selecionar Logo'}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleLogoChange}
                />
              </Button>
            </Box>

            {/* Paleta de Cores */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Paleta de Cores
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <TextField
                  type="color"
                  value={formData.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  sx={{ width: '60px', '& input': { height: '35px' } }}
                  title="Cor Primária"
                />
                <TextField
                  type="color"
                  value={formData.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  sx={{ width: '60px', '& input': { height: '35px' } }}
                  title="Cor Secundária"
                />
                <TextField
                  type="color"
                  value={formData.colors.tertiary}
                  onChange={(e) => handleColorChange('tertiary', e.target.value)}
                  sx={{ width: '60px', '& input': { height: '35px' } }}
                  title="Cor Terciária"
                />
              </Stack>
            </Box>

            {/* Serviços Inclusos */}
            <Box
              sx={{
                p: 2,
                backgroundColor: `${themes.colors.Azul}10`,
                borderRadius: 2,
                border: `1px solid ${themes.colors.Azul}30`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Serviços Inclusos
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.services.website}
                      onChange={() => handleServiceChange('website')}
                      sx={{
                        color: themes.colors.Azul,
                        '&.Mui-checked': {
                          color: themes.colors.Azul,
                        },
                      }}
                    />
                  }
                  label="Desenvolvimento do Website"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.services.seo}
                      onChange={() => handleServiceChange('seo')}
                      sx={{
                        color: themes.colors.Azul,
                        '&.Mui-checked': {
                          color: themes.colors.Azul,
                        },
                      }}
                    />
                  }
                  label="SEO Otimização"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.services.adjustments}
                      onChange={() => handleServiceChange('adjustments')}
                      sx={{
                        color: themes.colors.Azul,
                        '&.Mui-checked': {
                          color: themes.colors.Azul,
                        },
                      }}
                    />
                  }
                  label="Ajustes para Melhor Visibilidade"
                />
              </Stack>
            </Box>

            {/* Orçamento */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Orçamento Inicial
              </Typography>
              <TextField
                fullWidth
                type="number"
                label="Valor (R$)"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                inputProps={{ min: '200', step: '50' }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: themes.colors.AzulEscuro,
                  display: 'block',
                  mt: 0.5,
                  opacity: 0.7,
                }}
              >
                A partir de R$ 200,00
              </Typography>
            </Box>

            {/* Contato */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.AzulEscuro,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
              >
                Dados para Contato
              </Typography>

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                size="small"
                sx={{
                  mb: 1.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(XX) XXXXX-XXXX"
                required
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: themes.colors.Azul,
                    },
                  },
                }}
              />
            </Box>

            {/* Observações */}
            <TextField
              fullWidth
              label="Observações"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Conte-nos mais sobre seu projeto..."
              multiline
              rows={3}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: themes.colors.Azul,
                  },
                },
              }}
            />

            {/* Botão Submit */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                color: themes.colors.Branco,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${themes.colors.Azul}40`,
                },
              }}
            >
              Solicitar Orçamento
            </Button>

            {/* Info Delivery */}
            <Box
              sx={{
                p: 1.5,
                backgroundColor: `${themes.colors.Vermelho}10`,
                borderRadius: 2,
                border: `1px solid ${themes.colors.Vermelho}30`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: themes.colors.Vermelho,
                }}
              >
                ⚡ Entrega em 2 dias úteis
              </Typography>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
