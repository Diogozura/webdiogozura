import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { themes } from '@/styles/theme';

type NavItem = {
  href: string;
  title: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
};

const defaultItems: NavItem[] = [
  { href: '/', title: 'Home', description: 'Voltar para a página inicial', color: themes.colors.Azul, icon: <HomeIcon /> },
  { href: '/sol', title: 'Sol e Lua', description: 'Acompanhe os astros', color: themes.colors.Vermelho, icon: <WbSunnyIcon /> },
];

export default function NavCards({ items = defaultItems }: { items?: NavItem[] }) {
  return (
    <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
      {items.map((it, idx) => (
        <Card
          key={idx}
          component={Link}
          href={it.href}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2,
            borderRadius: 2,
            border: `2px solid ${it.color || themes.colors.Azul}`,
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 10px 30px ${it.color || themes.colors.Azul}33` },
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: '10px', background: it.color ? `${it.color}20` : `${themes.colors.Azul}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {it.icon}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{it.title}</Typography>
              {it.description && <Typography variant="body2" color="text.secondary">{it.description}</Typography>}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
