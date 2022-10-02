import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import * as React from 'react'
import * as UserTypes from '../../../types/userTypes'

interface CardDataProps {
  isRefMode: boolean
  // カードID
  id: number
  // カード内データ
  data: { student: UserTypes.Student, user_name: string }
  // フォーム内の値が変化した時のイベントハンドラ
  onChangeValue: (
    id: number,
    data: { student: UserTypes.Student, user_name: string }
  ) => void
  // 削除ボタンを押した時のイベントハンドラ
  onRemove: (id: number) => void
}

export const CardData = (props: CardDataProps) => {
  // #region Fields
  // 編集した生徒情報を格納するデータ
  const [cardData, setCardData] = useState<{
    student: UserTypes.Student
    user_name: string
  }>({
    student: UserTypes.GetCopyObj_Student(props.data.student),
    user_name: props.data.user_name
  })
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
  // #endregion Functions
  // #region View
  return (
    <Box marginBottom={1}>
      <Card>
        <Grid container spacing={0} columns={12}>
          {/* 募集ヘッダー */}
          <Grid xs={3}>
            <Box display="flex" flexDirection={'column'} alignItems={'center'}>
              <Box marginTop={3} marginLeft={1}>
                <CardMedia
                  component="img"
                  image="/lectures/leader.png"
                  alt="green iguana"
                />
              </Box>
              {props.isRefMode && (
                <TextField
                  label="生徒名"
                  variant="standard"
                  value={
                    props.data.student.user_id > 1
                      ? props.data.user_name
                      : '不定'
                  }
                  margin="normal"
                  sx={{ m: 1, width: '18ch' }}
                  InputLabelProps={{ shrink: true }}
                  color="primary"
                  focused
                />
              )}
              <Box display="flex" flexDirection={'row'}>
                {props.isRefMode && (props.data.student.user_id <= 1) && (
                  <CardActions>
                    <Button variant="contained" size="small">
                      受講申請
                    </Button>
                  </CardActions>
                )}
                {!props.isRefMode && (
                  <IconButton
                    color="default"
                    component="label"
                    size="large"
                    onClick={removeMyself}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
          {/* 募集概要 */}
          <Grid xs={3}>
            <CardContent>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel variant="outlined" size="small">
                  役割
                </InputLabel>
                <Select
                  value={props.data.student.position}
                  onChange={(e) => {
                    if (!props.isRefMode) {
                        if (typeof e.target.value === 'string') {
                          cardData.student.position =
                            UserTypes.ConvertToNumberStudentPosition(e.target.value)
                        } else {
                          cardData.student.position = e.target.value
                        }
                        setCardData({ ...cardData })
                        changeFormValue()
                      }
                    }
                  }
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
              {/* <TextField
                label="受講金額"
                id="text-pay-amount"
                variant="standard"
                value={props.data.pay_amount}
                onChange={(e) => {
                  const number = Number(e.target.value)
                  if (isNaN(number)) {
                    cardData.pay_amount = 0
                  } else {
                    cardData.pay_amount = number
                  }
                  setCardData({ ...cardData })
                  changeFormValue()
                }}
                margin="normal"
                sx={{ m: 1, width: '11ch' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">￥</InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                focused
              /> */}
            </CardContent>
          </Grid>
          {/* 募集詳細 */}
          <Grid xs={6}>
            <Box>
              <CardContent>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography gutterBottom variant="caption" component="div">
                      目標到達レベル
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="text-goal"
                      fullWidth
                      variant="outlined"
                      value={props.data.student.goal}
                      onChange={(e) => {
                        if (!props.isRefMode) {
                          cardData.student.goal = e.target.value
                          setCardData({ ...cardData })
                          changeFormValue()
                        }
                      }}
                      multiline
                      rows={4}
                      InputLabelProps={{ shrink: true }}
                      color="primary"
                      focused
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography gutterBottom variant="caption" component="div">
                      参加必要条件
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="text-requirement"
                      fullWidth
                      variant="outlined"
                      value={props.data.student.requirement}
                      onChange={(e) => {
                        if (!props.isRefMode) {
                          cardData.student.requirement = e.target.value
                          setCardData({ ...cardData })
                          changeFormValue()
                        }
                      }}
                      multiline
                      rows={4}
                      InputLabelProps={{ shrink: true }}
                      color="primary"
                      focused
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography gutterBottom variant="caption" component="div">
                      必要開発環境
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="text-dev-env"
                      fullWidth
                      variant="outlined"
                      value={props.data.student.dev_env}
                      onChange={(e) => {
                        if (!props.isRefMode) {
                          cardData.student.dev_env = e.target.value
                          setCardData({ ...cardData })
                          changeFormValue()
                        }
                      }}
                      multiline
                      rows={4}
                      InputLabelProps={{ shrink: true }}
                      color="primary"
                      focused
                    />
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
  // #endregion View
}
