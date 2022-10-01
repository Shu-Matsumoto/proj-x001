import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField, { StandardTextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import * as React from 'react'
import * as UserTypes from '../../../types/userTypes'
import { UserSelectDialogButton } from '../UserSelectDialog'

interface CardDataProps {
  // カードID
  id: number
  // カード内データ
  data: { teacher: UserTypes.Teacher; user_name: string }
  // フォーム内の値が変化した時のイベントハンドラ
  onChangeValue: (
    id: number,
    data: { teacher: UserTypes.Teacher; user_name: string },
  ) => void
  // 削除ボタンを押した時のイベントハンドラ
  onRemove: (id: number) => void
}

export const CardData = (props: CardDataProps) => {
  // #region Fields
  // 編集した生徒情報を格納するデータ
  const [cardData, setCardData] = useState<{
    teacher: UserTypes.Teacher
    user_name: string
  }>({
    teacher: UserTypes.GetCopyObj_Teacher(props.data.teacher),
    user_name: props.data.user_name,
  })
  // ダイアログオープンフラグ
  const [dialogOpen, setDialogOpen] = React.useState(false)
  // #endregion Fields
  // #region Functions
  // カード内データ値の変更イベントハンドラ
  function changeFormValue(): void {
    props.onChangeValue(props.id, cardData)
  }
  // 削除ボタンクリックイベントハンドラ
  function removeMyself(): void {
    console.log('do remove')
    props.onRemove(props.id)
  }
  // ダイアログオープンのトリガとなるボタンクリック時イベントハンドラ
  const handleClickOpen = () => {
    setDialogOpen(true)
  }
  // ダイアログクローズのトリガとなるボタンクリック時イベントハンドラ
  const handleClose = (id: number, value: string) => {
    setDialogOpen(false)
    console.log('id', id)
    console.log('value', value)
    cardData.teacher.user_id = id
    cardData.user_name = value
    setCardData({ ...cardData })
    console.log(cardData)
    props.onChangeValue(props.id, cardData)
  }
  // #endregion Functions
  // #region View
  return (
    <Box marginBottom={1}>
      <Card>
        <Grid container spacing={0} columns={12}>
          {/* ヘッダー */}
          <Grid xs={2.5}>
            <Box display="flex" flexDirection={'column'} alignItems={'center'}>
              <Box
                marginTop={2}
                marginLeft={1}
                display="flex"
                flexDirection={'row'}
              >
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickOpen}
                  >
                    講師選択
                  </Button>
                  <UserSelectDialogButton
                    open={dialogOpen}
                    onClose={handleClose}
                  />
                </CardActions>
                <IconButton
                  color="default"
                  aria-label="remove student"
                  component="label"
                  size="large"
                  onClick={removeMyself}
                >
                  <PersonRemoveIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          {/* 役割 */}
          <Grid xs={3.5}>
            <FormControl sx={{ m: 2.5, minWidth: 160 }} size="small">
              <InputLabel variant="outlined" size="small">
                役割
              </InputLabel>
              <Select
                value={props.data.teacher.type}
                onChange={(e) => {
                  if (typeof e.target.value === 'string') {
                    cardData.teacher.type =
                      UserTypes.ConvertToNumberStudentPosition(e.target.value)
                  } else {
                    cardData.teacher.type = e.target.value
                  }
                  setCardData({ ...cardData })
                  //console.log(cardData)
                  changeFormValue()
                }}
              >
                <MenuItem value={UserTypes.StudentPosition.Leader}>
                  Leader
                </MenuItem>
                <MenuItem value={UserTypes.StudentPosition.Frontend}>
                  Frontend Eng.
                </MenuItem>
                <MenuItem value={UserTypes.StudentPosition.Backend}>
                  Backend Eng.
                </MenuItem>
                <MenuItem value={UserTypes.StudentPosition.Design}>
                  Design Eng.
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* エリア3 */}
          {/* <Grid xs={3}>
            <TextField
              label="報酬金額"
              id="text-pay-amount"
              variant="standard"
              value={props.data.teacher.pay_amount}
              onChange={(e) => {
                const number = Number(e.target.value)
                console.log(number)
                if (isNaN(number)) {
                  cardData.teacher.pay_amount = 0
                } else {
                  cardData.teacher.pay_amount = number
                }
                setCardData({ ...cardData })
                console.log(cardData)
                changeFormValue()
              }}
              margin="normal"
              sx={{ m: 1, width: '18ch' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">￥</InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              focused
            />
          </Grid> */}
          {/* エリア4 */}
          <Grid xs={3}>
            <TextField
              label="講師名"
              variant="standard"
              value={
                props.data.teacher.user_id > 1 ? props.data.user_name : '未定'
              }
              margin="normal"
              sx={{ m: 1, width: '18ch' }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              focused
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
  // #endregion View
}
