import { CONFIG } from 'src/config-global';

import { AdSetDetailsView } from 'src/sections/campaign/view/adset-details-view';
import { _campaign } from 'src/_mock';

// ----------------------------------------------------------------------

export const metadata = { title: `Ad Set details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;

  const currentAdset = _campaign.adSets.find((adset) => adset.id === id);

  return <AdSetDetailsView adset={currentAdset} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    return _campaign.adSets.map((adset) => ({ id: adset.id }));
  }
  return [];
}
