'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignDesignGuidelineNewEditForm } from '../campaign-design-guideline-new-edit-form';

// ----------------------------------------------------------------------

export function CampaignDesignGuidelineView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.product.root },
          { name: 'New campaign', href: paths.dashboard.campaign.new },
          { name: 'Design guideline' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignDesignGuidelineNewEditForm />
    </DashboardContent>
  );
}
