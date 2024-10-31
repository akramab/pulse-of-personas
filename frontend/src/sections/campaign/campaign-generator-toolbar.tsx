import type { IDatePickerControl } from 'src/types/common';
import type { IAdSetTableFilters, ICampaign } from 'src/types/campaign';
import type { UseSetStateReturn } from 'src/hooks/use-set-state';

import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CircularProgress, NoSsr, Tooltip } from '@mui/material';
import { CampaignPDF } from './campaign-pdf';

// ----------------------------------------------------------------------

type Props = {
  campaign?: ICampaign;
  dateError: boolean;
  onResetPage: () => void;
  filters: UseSetStateReturn<IAdSetTableFilters>;
};

export function CampaignGeneratorToolbar({ campaign, filters, dateError, onResetPage }: Props) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  const renderDownload = (
    <NoSsr>
      <PDFDownloadLink
        document={
          campaign ? <CampaignPDF campaign={campaign} /> : <span />
        }
        fileName={campaign?.name}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <Tooltip title="Download">
            <IconButton>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Iconify icon="eva:cloud-download-fill" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </PDFDownloadLink>
    </NoSsr>
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <DatePicker
          label="Start date"
          value={filters.state.endDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 180 } }}
        />

        <DatePicker
          label="End date"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'End date must be later than start date' : null,
            },
          }}
          sx={{
            maxWidth: { md: 180 },
            [`& .${formHelperTextClasses.root}`]: {
              bottom: { md: -40 },
              position: { md: 'absolute' },
            },
          }}
        />

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search ad set..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          {renderDownload}
        </Stack>
      </Stack>
    </>
  );
}
