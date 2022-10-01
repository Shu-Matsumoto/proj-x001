import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import * as React from 'react'
import * as UserTypes from '../../../types/userTypes'

interface CardDataProps {
  // カードID
  id: number
  // カード内データ
  data: UserTypes.TeachingMaterial
  // フォーム内の値が変化した時のイベントハンドラ
  onChangeValue: (id: number, data: UserTypes.TeachingMaterial) => void
  // 削除ボタンを押した時のイベントハンドラ
  onRemove: (id: number) => void
}

export const CardData = (props: CardDataProps) => {
  // #region Fields
  // 編集した生徒情報を格納するデータ
  const [cardData, setCardData] = useState<UserTypes.TeachingMaterial>(
    UserTypes.GetObj_TeachingMaterial(),
  )
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
          <Grid xs={10}>
            <TextField
              label="タイトル"
              variant="standard"
              value={props.data.title}
              onChange={(e) => {
                cardData.title = e.target.value
                setCardData({ ...cardData })
                changeFormValue()
              }}
              fullWidth
              color="primary"
              focused
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid xs={2}>
            <Box display="flex" flexDirection={'row'}>
              <CardActions>
                <Button variant="contained" size="small">
                  Link
                </Button>
              </CardActions>
              <IconButton
                color="default"
                component="label"
                size="large"
                onClick={removeMyself}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography gutterBottom variant="caption" component="div">
                  詳細
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="資料説明"
                  fullWidth
                  variant="outlined"
                  value={props.data.explanation}
                  onChange={(e) => {
                    cardData.explanation = e.target.value
                    setCardData({ ...cardData })
                    changeFormValue()
                  }}
                  multiline
                  rows={2}
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Link path"
                  variant="standard"
                  value={props.data.path}
                  onChange={(e) => {
                    cardData.path = e.target.value
                    setCardData({ ...cardData })
                    changeFormValue()
                  }}
                  fullWidth
                  margin={'dense'}
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
  // #endregion View
}
