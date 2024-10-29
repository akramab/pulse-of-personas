import { CONFIG } from 'src/config-global';

import { CampaignCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new campaign | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CampaignCreateView />;
}
