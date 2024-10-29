'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignKeyVisualSwipeCards } from '../campaign-key-visual-swipe-cards';

// ----------------------------------------------------------------------

export function CampaignKeyVisualView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.product.root },
          { name: 'New campaign', href: paths.dashboard.campaign.new },
          { name: 'Design guideline' },
          { name: 'AI Generated Key visual ' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignKeyVisualSwipeCards />

      <Box gap={1} display="flex" justifyContent="center" sx={{ my: 5 }}>
        <Button variant="contained" size="large" href="/dashboard" color="primary">
          Finalize Key Visual
        </Button>
      </Box>
    </DashboardContent>
  );
}
