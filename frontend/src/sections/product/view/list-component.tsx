'use client';

import type { UseSetStateReturn } from 'src/hooks/use-set-state';
import type { IProductItem, IProductTableFilters } from 'src/types/product';
import type {
  GridSlots,
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { useGetProducts } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductTableToolbar } from '../product-table-toolbar';
import { ProductTableFiltersResult } from '../product-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../product-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ListComponent() {
  // Constant list of names
  const productNames = [
    'CVS Health Mucus 12HR Extended Release and Chest Congestion Expectorant Relief, 20 CT',
    'CVS Health Extra Strength Nasal Strips, Tan, 50 CT',
    'CVS Beauty Makeup Remover Cleansing Cloth Towelettes',
    'CVS Health Waterproof Hydrocolloid Blemish Patches, 12 CT',
    'CVS Health Series 100 Upper Arm Blood Pressure Monitor',
  ];

  const productDescriptions = [
    'Compare to Mucinex active ingredient. Say goodbye to mucus and chest congestion with CVS Health Cough and Mucus Relief Extended-Release Tablets, Guaifenesin 600 mg. Just one dose releases the medicine you need immediately and lasts for up to 12 hours to help loosen mucus and thin bronchial secretions in the airways to make wet coughs more productive. This expectorant relieves chest congestion and mucus for up to 12 hours so you have quick and long-lasting cough relief. Clear bothersome excess mucus and avoid frequent doses of cold medicine. This regular strength chest congestion relief medicine is for adults and children 12 years of age and older...',
    'Relieve congested nasal passages while you sleep with CVS Health Extra Strength Nasal Strips, 50CT. These drug-free strips provide 20% more coverage and open the nasal passages to provide you with easier breathing throughout the night, so you can get restful sleep...',
    '2 x 25 ct packs = 50 pre-moistened towelettes. 7.4 x 7.2 inches. Excellent removal & cleansing. Gently removes all types of make-up, including waterproof mascara...',
    'CVS Health Waterproof Hydrocolloid Blemish Patches Protects & Absorbs Fluid and promotes a healing environment. Protects pimples and acne blemishes from external contamination and irritation while absorbing fluid...',
    'Get clarity on your blood pressure levels with the clinically proven accuracy of the CVS Health™ Series 100 Upper Arm Blood Pressure Monitor. With just the touch of a button, this easy-to-use blood pressure monitor delivers clear readings. The attached LCD screen shows your systolic blood pressure, diastolic blood pressure, and pulse all on one display. The numbers are large and easy to read, so this product is perfect for those with mild visual impairments. The SoftFit™ cuff can be adjusted to fit upper arms ranging from 8.7"-16.5" in size. Simply press the button, the cuff inflates and deflates automatically and wait for your results...',
  ];
  const productCoverUrls = [
    'https://i.imgur.com/EXgLJae.jpeg',
    'https://i.imgur.com/lMGHMSa.jpeg',
    'https://i.imgur.com/recWLlg.jpeg',
    'https://i.imgur.com/u23ayq9.jpeg',
    'https://i.imgur.com/CeC1sxy.jpeg',
  ];

  const productPrices = [10.99, 16.49, 10.49, 6.99, 49.99];

  const confirmRows = useBoolean();

  const router = useRouter();

  const { products, productsLoading } = useGetProducts();

  const filters = useSetState<IProductTableFilters>({ publish: [], stock: [] });

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (products.length) {
      const updatedTableData = products.slice(0, 5).map((item, index) => ({
        ...item,
        name: productNames[index], // Set name from the constant list
        description: productDescriptions[index], // Set description from the constant list
        coverUrl: productCoverUrls[index],
        price: productPrices[index],
      }));
      setTableData(updatedTableData);
    }
  }, [products, productCoverUrls, productDescriptions, productNames, productPrices]);

  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category', filterable: false },
    {
      field: 'name',
      headerName: 'Product',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct params={params} onViewRow={() => handleViewRow(params.row.id)} />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Details',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        rows={dataFiltered}
        columns={columns}
        loading={productsLoading}
        getRowHeight={() => 'auto'}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        slots={{
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        slotProps={{
          panel: { anchorEl: filterButtonEl },
          toolbar: { setFilterButtonEl },
          columnsManagement: { getTogglableColumns },
        }}
        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
      />

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

interface CustomToolbarProps {
  canReset: boolean;
  filteredResults: number;
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  filters: UseSetStateReturn<IProductTableFilters>;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}: CustomToolbarProps) {
  return (
    <>
      <GridToolbarContainer>
        <ProductTableToolbar
          filters={filters}
          options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
        />

        <GridToolbarQuickFilter />

        <Stack
          spacing={1}
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              Delete ({selectedRowIds.length})
            </Button>
          )}

          <GridToolbarColumnsButton />
          <GridToolbarFilterButton ref={setFilterButtonEl} />
          <GridToolbarExport />
        </Stack>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IProductItem[];
  filters: IProductTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
