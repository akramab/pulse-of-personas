import { CONFIG } from 'src/config-global';

import { CampaignKeyVisualView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Choose your Key Visual | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CampaignKeyVisualView />;
}
