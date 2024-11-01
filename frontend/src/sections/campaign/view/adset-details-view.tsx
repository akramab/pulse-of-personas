'use client';

import type { IAdSet } from 'src/types/campaign';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { _campaign } from 'src/_mock';
import { Box, Button } from '@mui/material';
import { AdSetDetails } from '../adset-details';

// ----------------------------------------------------------------------

type Props = {
  adset?: IAdSet;
};

export function AdSetDetailsView({ adset }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={adset?.name}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.campaign.root },
          { name: adset?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AdSetDetails adset={adset} />

      {adset?.status !== 'approved' && adset?.status !== 'rejected' && (
        <Box gap={1} display="flex" justifyContent="right" sx={{ my: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => {
              _campaign.adSets[parseInt(adset?.id || '1', 10) - 1].status = 'rejected';
              window.history.back();
            }}
          >
            Re-Generate
          </Button>
          <Button
            variant="contained"
            size="large"
            color="warning"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              _campaign.adSets[parseInt(adset?.id || '1', 10) - 1].status = 'upcoming';
              window.history.back();
            }}
          >
            Approve
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
}
