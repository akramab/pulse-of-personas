'use client';


import { DashboardContent } from 'src/layouts/dashboard';

import { Card, CardHeader, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export function CampaignNewsView() {
  return (
    <DashboardContent>
      <Card sx={{ pt: 5, px: 5 }}>
        <CardHeader title="Campaign Update for Flu Outbreak Event" sx={{ mb: 3 }} />
        <Stack sx={{ typography: 'body2' }}>
          To address the recent flu outbreak and effectively reach our audience during this time, we
          propose an update to our 2025 Health Awareness Campaign. Below are the suggested
          changes:
          <br />
          <br />
          <h1>New Ad Set: <strong>Flu Break Awareness</strong></h1>
          <br />
          <ul>
            <li>
              <strong>Objective:</strong> Provide timely health information and promote
              immune-support products during flu season.
            </li>
            <li>
              <strong>Campaign:</strong> 2025 Health Awareness Campaign
            </li>
            <li>
              <strong>Target Segment:</strong> General population, focusing on families, elderly
              adults, and healthcare professionals
            </li>
            <li>
              <strong>Channels:</strong> Facebook, Google Display, Instagram
            </li>
            <li>
              <strong>Ad Type:</strong> Informative banners and quick links to health products
            </li>
            <li>
              <strong>Start Date:</strong> Immediate
            </li>
            <li>
              <strong>End Date:</strong> End of flu season or as needed
            </li>
            <li>
              <strong>Budget:</strong> $5,000 (from contingency funds)
            </li>
          </ul>
          <br />
          <br />
          <br />
        </Stack>
      </Card>
    </DashboardContent>
  );
}
