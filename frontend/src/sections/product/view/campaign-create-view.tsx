'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignNewEditForm } from '../campaign-new-edit-form';

// ----------------------------------------------------------------------

export function CampaignCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.root },
          { name: 'New campaign', href: paths.dashboard.campaign.new },
          { name: 'Campaign details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignNewEditForm />
    </DashboardContent>
  );
}
