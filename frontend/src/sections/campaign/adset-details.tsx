import type { IAdSet } from 'src/types/campaign';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';
import { fNumber, fCurrency } from 'src/utils/format-number';

import { _mock } from 'src/_mock';
import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Scrollbar } from 'src/components/scrollbar';

import { AdSetToolbar } from './adset-toolbar';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  adset?: IAdSet;
};

export function AdSetDetails({ adset }: Props) {
  const renderList = (
    <Scrollbar sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 960 }}>
        <TableHead>
          <TableRow>
            <TableCell width={40} align="center">
              #
            </TableCell>

            <TableCell align="center">Channel</TableCell>

            <TableCell align="center">Budget</TableCell>

            <TableCell align="center">Estimated Impressions</TableCell>

            <TableCell align="center">Estimated Clicks</TableCell>

            <TableCell align="center">KV</TableCell>

            <TableCell align="center">Headline</TableCell>

            <TableCell align="center">CTA</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {adset?.ads.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>

              <TableCell>
                <Box sx={{ maxWidth: 750 }}>
                  <Typography variant="subtitle2" noWrap>
                    {row.channel}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {row.adType}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>{fCurrency(row.budget)}</TableCell>

              <TableCell align="right">{fNumber(row.estimatedImpressions)}</TableCell>

              <TableCell align="right">{fNumber(row.estimatedClicks)}</TableCell>

              <TableCell>
                <Image
                  alt={_mock.image.product(parseInt(row.id, 10))}
                  src={row.kvUrl}
                  ratio="1/1"
                  sx={{ borderRadius: 1, mb: 1 }}
                />
              </TableCell>

              <TableCell>{row.headline}</TableCell>

              <TableCell>{row.cta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );

  return (
    <>
      <AdSetToolbar adset={adset} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Box
            component="img"
            alt="logo"
            src="/logo/logo-single.svg"
            sx={{ width: 48, height: 48 }}
          />

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Label
              variant="soft"
              color={
                (adset?.status === 'running' && 'success') ||
                (adset?.status === 'upcoming' && 'warning') ||
                (adset?.status === 'waiting approval' && 'error') ||
                'default'
              }
            >
              {adset?.status}
            </Label>
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <b>{adset?.name}</b>
            {adset?.targetSegment}
            <br />
            Period: {fDate(adset?.startDate)} - {fDate(adset?.endDate)}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            Budget: {fNumber(adset?.totalBudget)}
            <br />
            Estimated Impressions: {fNumber(adset?.totalEstimatedImpressions)}
            <br />
            Estimated Clicks: {fNumber(adset?.totalEstimatedClicks)}
            <br />
          </Stack>
        </Box>

        {renderList}

        <Typography variant="subtitle2">Feedback</Typography>
          <TextField sx={{ maxHeight: 200, paddingBottom: 5}} fullWidth/>
      </Card>
    </>
  );
}
