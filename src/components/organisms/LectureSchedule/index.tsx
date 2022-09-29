import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, start_time: Date.now(), end_time: Date.now(), isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'start_time' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        追加
      </Button>
    </GridToolbarContainer>
  );
}

export default function LectureScheduleEditor() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
    
    {
      field: 'start_time',
      headerName: '開始時刻',
      type: 'dateTime',
      width: 150,
      editable: true,
		},
		{
      field: 'end_time',
      headerName: '終了時刻',
      type: 'dateTime',
      width: 150,
      editable: true,
		},
		{ field: 'url', headerName: 'Meeting URL', width: 130, editable: true },
		{ field: 'meeting_id', headerName: 'ID', width: 130, editable: true },
		{ field: 'passcord', headerName: 'PASSCORD', width: 100, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
		<Accordion style={{backgroundImage: `url(${'https://beiz.jp/images_T/white/white_00036.jpg'})`,}}>	
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				style={{ height: '1px' }}
			>
				<Typography
					variant="caption"
					color={"#0971f1"}
				>
					スケジュール
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						height: 360,
						width: '100%',
						'& .actions': {
							color: 'text.secondary',
						},
						'& .textPrimary': {
							color: 'text.primary',
						},
					}}
				>
					<DataGrid
						rows={rows}
						columns={columns}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowEditStart={handleRowEditStart}
						onRowEditStop={handleRowEditStop}
						processRowUpdate={processRowUpdate}
						components={{
							Toolbar: EditToolbar,
						}}
						componentsProps={{
							toolbar: { setRows, setRowModesModel },
						}}
						experimentalFeatures={{ newEditingApi: true }}
						pagination
						pageSize={4}
						rowsPerPageOptions={[4]}
						paginationMode="client"
					/>
				</Box>	
			</AccordionDetails>
		</Accordion>
  );
}
