import { CONFIG } from 'src/config-global';

import { CampaignNewsView } from 'src/sections/campaign/view/campaign-news-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Big News | ${CONFIG.appName}` };

export default function Page() {
  return <CampaignNewsView />;
}
