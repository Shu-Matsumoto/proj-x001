import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SaveIcon from '@mui/icons-material/Save'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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
} from '@mui/x-data-grid'
import { randomId } from '@mui/x-data-grid-generator'
import * as React from 'react'
import * as UserTypes from '../../../types/userTypes'

const initialRows: GridRowsProp = []

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setRows((oldRows) => [
      ...oldRows,
      { id, start_time: Date.now(), end_time: Date.now(), isNew: true },
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'start_time' },
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        追加
      </Button>
    </GridToolbarContainer>
  )
}

interface CardListProps {
  // 編集中の値変更時のイベントハンドラ
  updatePostData: (data: UserTypes.LectureSchedule[]) => void
}

export default function LectureScheduleEditor(props: CardListProps) {
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )
  const [schedules, setSchedules] = React.useState<UserTypes.LectureSchedule[]>(
    [],
  )

  // テーブル内の値変化時のイベントハンドラ
  React.useEffect(() => {
    //console.log("tabel", rows)
    const newSchedules: UserTypes.LectureSchedule[] = []
    rows.forEach((row, index) => {
      //console.log(row)
      newSchedules.push(UserTypes.GetObj_LectureSchedule())
      // row['start_time'],row['end_time']のフォーマット：Fri Sep 30 2022 13:31:00 GMT+0900 (日本標準時) {}
      // toLocaleStringのフォーマット2022/9/30 14:10:00
      newSchedules[index].start_time = new Date(
        row['start_time'],
      ).toLocaleString()
      newSchedules[index].end_time = new Date(row['end_time']).toLocaleString()
      newSchedules[index].url = row['url']
      newSchedules[index].meeting_id = row['meeting_id']
      newSchedules[index].passcord = row['passcord']
    })
    setSchedules({ ...newSchedules })
    props.updatePostData(newSchedules)
    //console.log(schedules)
  }, [rows])

  // 行編集開始
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true
  }
  // 行編集停止
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    event.defaultMuiPrevented = true
  }
  // 行編集
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }
  // 行保存
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }
  // 行削除
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }
  // 編集キャンセル
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  // テーブル列定義
  const columns: GridColumns = [
    // 終了時刻
    {
      field: 'start_time',
      headerName: '開始時刻',
      type: 'dateTime',
      width: 150,
      editable: true,
    },
    // 終了時刻
    {
      field: 'end_time',
      headerName: '終了時刻',
      type: 'dateTime',
      width: 150,
      editable: true,
    },
    // Meeting URL
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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <Accordion
      style={{
        backgroundImage: `url(${'https://beiz.jp/images_T/white/white_00036.jpg'})`,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        style={{ height: '1px' }}
      >
        <Typography variant="caption" color={'#0971f1'}>
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
  )
}
