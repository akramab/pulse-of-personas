import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  _tags,
  _products,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { ListComponent } from './view/list-component';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  impression: zod.number().optional(),
  totalclick: zod.number().optional(),
  available: zod
    .object({
      startDate: zod.date().optional(),
      endDate: zod.date().optional(),
    })
    .optional(),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(1, {
    message: "If you don't select anything, our system will use its own optimization for you!",
  }),
  gender: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  impression: zod.number(),
  totalclick: zod.number(),
  available: zod.object({
    startDate: zod.date(),
    endDate: zod.date(),
  }),
});

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export function CampaignNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentProduct]
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '\\') {
        // Set the default values for the fields when '\' is pressed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('name', 'CVS 2024 Fall and Winter Wellness Campaign - New York');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(
          'description',
          'Give me the best estimate to optimize my campaign, especially considering that there are several big events happening around the campaign time (election, seasonal events)'
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('price', 100000); // Example value for Budget

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('impression', 4000000); // Example for Impressions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('totalclick', 400000); // Example for Total Clicks
        setValue('tags', [
          'Brainwave Activity',
          'Heart Rate',
          'Emotion Detection',
          'Political Climate',
          'Weather Conditions',
          'Local Events',
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('available.startDate', new Date('2024-10-01'));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue('available.endDate', new Date('2024-11-30'));
        // Add more fields as needed
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setValue]); // Ensure setValue is in the dependency array

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file: any) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = (
    <Card>
      <CardHeader
        title="Details"
        subheader="Title, product(s) image(s), campaign prompt..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Campaign Name</Typography>
          <Field.Text name="name" label="Enter Campaign name" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Select Products</Typography>
          <Card
            sx={{
              height: { xs: 800 },
              maxHeight: 415,
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'column' },
            }}
          >
            <ListComponent />
          </Card>
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Additional Details (prompt)</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional informations related to the campaign"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Expected Campaign Date</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Field.DatePicker name="available.startDate" label="Start date" />
            <Field.DatePicker name="available.endDate" label="End date" />
          </Stack>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Target KPI</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Field.Text
              name="impression"
              label="Impressions"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Field.Text
              name="totalclick"
              label="Total Clicks"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Personalization Criteria</Typography>
          <Field.Autocomplete
            name="tags"
            label="Campaign Personalization Criteria"
            placeholder="+ Criteria"
            multiple
            freeSolo
            disableCloseOnSelect
            options={_tags.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Budget</Typography>
          <Field.Text
            name="price"
            label="Maximum campaign budget"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader title="Pricing" subheader="Price related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="price"
          label="Regular price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="priceSale"
          label="Sale price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Switch id="toggle-taxes" checked={includeTaxes} onChange={handleChangeIncludeTaxes} />
          }
          label="Price includes taxes"
        />

        {!includeTaxes && (
          <Field.Text
            name="taxes"
            label="Tax (%)"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    %
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton
        type="button"
        variant="contained"
        size="large"
        loading={isSubmitting}
        href="/dashboard/campaign/new/design-guideline"
      >
        {!currentProduct ? 'Next' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderProperties}

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            type="button"
            variant="contained"
            size="large"
            loading={isSubmitting}
            href="/dashboard/campaign/new/design-guideline"
          >
            {!currentProduct ? 'Next' : 'Save changes'}
          </LoadingButton>
        </Stack>
      </Stack>
    </Form>
  );
}
