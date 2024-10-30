import { CONFIG } from 'src/config-global';

import { CampaignGeneratorView } from 'src/sections/campaign/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Check your campaign's result | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CampaignGeneratorView />;
}
