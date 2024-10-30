'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignGeneratorList } from 'src/sections/campaign/campaign-generator-list';
import { Box, Button } from '@mui/material';

// ----------------------------------------------------------------------

export function CampaignGeneratorView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.root },
          { name: 'New campaign', href: paths.dashboard.campaign.new },
          { name: 'Campaign details', href: paths.dashboard.campaign.newdetails },
          { name: 'Design guideline' },
          { name: 'AI Generated Key visual' },
          { name: 'Campaign Result' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignGeneratorList />

      <Box display="flex" justifyContent="right">
        <Button variant="contained" size="large" href="/dashboard" color="primary">
          Save as Draft
        </Button>
      </Box>
    </DashboardContent>
  );
}
