import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState, useEffect } from 'react'
import * as UserTypes from '../../../types/userTypes'
import { CardData } from './card'

interface CardListProps {
  // 編集中の値変更時のイベントハンドラ
  updatePostData: (data: UserTypes.Teacher[]) => void
}

export const TeacherCardList = (props: CardListProps) => {
  // #region Fields
  // カード追加の都度インクリメントするカウンタ
  const [cardDataCounter, setCardDataCounter] = useState(0)
  const [cardDataList, setCardDataList] = useState<
    {
      id: number
      data: {
        teacher: UserTypes.Teacher
        user_name: string
      }
    }[]
  >([])
  // #endregion Fields
  // 初回のみの実行
  useEffect(() => {
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data.teacher
      }),
    )
  }, [])
  // カード追加
  function addCard(): void {
    cardDataList.push({
      id: cardDataCounter,
      data: { teacher: UserTypes.GetObj_Teacher(), user_name: '' },
    })
    cardDataList[cardDataList.length - 1].data.teacher.user_id = 1
    cardDataList[cardDataList.length - 1].data.teacher.type =
      UserTypes.StudentPosition.Leader
    setCardDataCounter(cardDataCounter + 1)
    //console.log(cardDataCounter)
    //console.log(cardDataList)
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data.teacher
      }),
    )
  }
  // リスト情報更新
  function changeListData(
    id: number,
    setData: { teacher: UserTypes.Teacher; user_name: string },
  ): void {
    const target = cardDataList.find((item) => item.id == id)
    if (target && target?.data) {
      target.data = setData
    }
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data.teacher
      }),
    )
  }
  // カード削除
  function removeCard(id: number): void {
    console.log('remove id', id)
    const targetIndex = cardDataList.findIndex((item) => item.id == id)
    cardDataList.splice(targetIndex, 1)
    console.log(cardDataList)
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data.teacher
      }),
    )
  }

  // #region Functions
  // #endregion Functions

  // #region View
  return (
    <Box>
      <Box>
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
              講師
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box justifyContent={'flex-end'}>
              <IconButton
                color="primary"
                aria-label="add student"
                component="label"
                size="large"
                onClick={addCard}
              >
                <PersonAddIcon />
              </IconButton>
            </Box>
            <ul>
              {cardDataList.map((item) => {
                return (
                  <li key={item.id}>
                    <CardData
                      id={item.id}
                      data={item.data}
                      onChangeValue={changeListData}
                      onRemove={removeCard}
                    />
                  </li>
                )
              })}
            </ul>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
  // #endregion View
}
