'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignBulkUploadNewEditForm } from '../campaign-bulk-upload-new-edit-form';

// ----------------------------------------------------------------------

export function CampaignBulkUploadView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaign', href: paths.dashboard.product.root },
          { name: 'New campaign' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignBulkUploadNewEditForm />
    </DashboardContent>
  );
}
