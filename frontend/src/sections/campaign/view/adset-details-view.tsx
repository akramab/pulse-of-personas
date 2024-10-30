'use client';

import type { IAdSet } from 'src/types/campaign';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { AdSetDetails } from '../adset-details';
import { Box, Button } from '@mui/material';
import { _campaign } from 'src/_mock';

// ----------------------------------------------------------------------

type Props = {
  adset: IAdSet;
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

      {adset.status !== 'approved' && (
        <Box gap={1} display="flex" justifyContent="right" sx={{ my: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              _campaign.adSets[parseInt(adset.id)-1].status = "upcoming";
              history.back();
            }}
          >
            Approve
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
}
