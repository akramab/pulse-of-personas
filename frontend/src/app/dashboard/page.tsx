import { CONFIG } from 'src/config-global';

import { OverviewAppView } from 'src/sections/overview/app/view';

import { CampaignListView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <div>
      <OverviewAppView />
      <CampaignListView />
    </div>
  );
}
