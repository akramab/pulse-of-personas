import type { IAdSet, ICampaign } from 'src/types/campaign';

import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
import { fCurrency, fNumber } from 'src/utils/format-number';

import { _mock } from 'src/_mock';
import { Label } from 'src/components/label';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        // layout
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#e9ecef',
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        // margin
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        // text
        h1: { fontSize: 24, fontWeight: 700 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        body2: { fontSize: 9 },
        subtitle2: { fontSize: 9, fontWeight: 700, textAlign: 'center' },
        subtitle3: { fontSize: 9, fontWeight: 700 },
        // table
        table: { display: 'flex', width: '100%' },
        row: {
          padding: '10px 0 8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e9ecef',
        },
        cell_1: { width: '5%' },
        cell_2: { width: '15%' },
        cell_3: { width: '10%' },
        cell_4: { width: '10%' },
        cell_5: { width: '10%' },
        cell_6: { width: '25%' },
        cell_7: { width: '15%' },
        cell_8: { width: '10%' },
        noBorder: { paddingTop: '10px', paddingBottom: 0, borderBottomWidth: 0 },
      }),
    []
  );

// ----------------------------------------------------------------------

type Props = {
  campaign: ICampaign;
};

export function CampaignPDF({ campaign }: Props) {
  const {
    name,
    purpose,
    startDate,
    endDate,
    totalBudget,
    totalEstimatedImpressions,
    totalEstimatedClicks,
    adSets,
  } = campaign;

  const styles = useStyles();

  const renderHeader = (adset: IAdSet) => (
    <View style={[styles.container, styles.mb40]}>
      <Image source="/logo/logo-single.png" style={{ width: 48, height: 48 }} />

      <View style={{ alignItems: 'center', flexDirection: 'column' }}>
        <Text style={[styles.h3, { textTransform: 'capitalize' }]}>{adset.name}</Text>
      </View>

      <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
        <Text style={[styles.h4]}>{adset.status}</Text>
      </View>
    </View>
  );

  const renderInfo = (adset: IAdSet) => (
    <View style={[styles.container, styles.mb40]}>
      <View style={{ width: '50%' }}>
        <Text style={[styles.body2]}>Segment: {adset.targetSegment}</Text>
        <Text style={[styles.body2]}>
          Period: {fDate(adset.startDate)} - {fDate(adset.endDate)}
        </Text>
      </View>

      <View style={{ width: '50%' }}>
        <Text style={[styles.body2]}>Budget: {fNumber(adset.totalBudget)}</Text>
        <Text style={[styles.body2]}>Estimated Impressions: {fNumber(adset.totalBudget)}</Text>
        <Text style={[styles.body2]}>Estimated Clicks: {fNumber(adset.totalBudget)}</Text>
      </View>
    </View>
  );

  const renderTable = (adset: IAdSet) => (
    <>
      <Text style={[styles.subtitle1, styles.mb8]}>Ad details</Text>

      <View style={styles.table}>
        <View>
          <View style={styles.row}>
            <View style={styles.cell_1}>
              <Text style={styles.subtitle2}>#</Text>
            </View>
            <View style={styles.cell_2}>
              <Text style={styles.subtitle2}>Channel</Text>
            </View>
            <View style={styles.cell_3}>
              <Text style={styles.subtitle2}>Budget</Text>
            </View>
            <View style={styles.cell_4}>
              <Text style={styles.subtitle2}>Estimated {<br></br>} Impressions</Text>
            </View>
            <View style={[styles.cell_5]}>
              <Text style={styles.subtitle2}>Estimated Clicks</Text>
            </View>
            <View style={[styles.cell_6]}>
              <Text style={styles.subtitle2}>KV</Text>
            </View>
            <View style={[styles.cell_7]}>
              <Text style={styles.subtitle2}>Headline</Text>
            </View>
            <View style={[styles.cell_8]}>
              <Text style={styles.subtitle2}>CT</Text>
            </View>
          </View>
        </View>

        <View>
          {adset.ads.map((item, index) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.cell_1}>
                <Text style={{ textAlign: 'center' }}>{index + 1}</Text>
              </View>
              <View style={styles.cell_2}>
                <Text style={styles.subtitle3}>{item.channel}</Text>
                <Text>{item.adType}</Text>
              </View>
              <View style={styles.cell_3}>
                <Text style={{ textAlign: 'center' }}>{fCurrency(item.budget)}</Text>
              </View>
              <View style={styles.cell_4}>
                <Text style={{ textAlign: 'center' }}>{fNumber(item.estimatedImpressions)}</Text>
              </View>
              <View style={[styles.cell_5]}>
                <Text style={{ textAlign: 'center' }}>{fNumber(item.estimatedClicks)}</Text>
              </View>
              <View style={[styles.cell_6]}>
                <Image
                  // source={_mock.image.product(parseInt(item.id, 10))}
                  source="/logo/logo-single.png"
                  style={{ justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}
                />
              </View>
              <View style={[styles.cell_7]}>
                <Text style={{ textAlign: 'center' }}>{item.headline}</Text>
              </View>
              <View style={[styles.cell_8]}>
                <Text style={{ textAlign: 'center' }}>{item.cta}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{ ...styles.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source="/logo/logo-single.png" style={{ width: 48, height: 48 }} />
        <Text style={[styles.h1, { textTransform: 'capitalize', textAlign: 'center' }]}>
          {name}
        </Text>
      </Page>

      {adSets.map((item, index) => (
        <Page size="A4" orientation="landscape" style={styles.page}>
          {renderHeader(item)}

          {renderInfo(item)}

          {renderTable(item)}
        </Page>
      ))}
    </Document>
  );
}
