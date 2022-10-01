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
  updatePostData: (data: UserTypes.Student[]) => void
}

export const StudentCardList = (props: CardListProps) => {
  // #region Fields
  // 生徒追加の都度インクリメントするカウンタ
  const [cardDataCounter, setCardDataCounter] = useState(0)
  const [cardDataList, setCardDataList] = useState<
    { id: number; data: UserTypes.Student }[]
  >([])
  // #endregion Fields
  // 初回のみの実行
  useEffect(() => {
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
      }),
    )
  }, [])

  // 生徒カード追加
  function addStudent(): void {
    cardDataList.push({ id: cardDataCounter, data: UserTypes.GetObj_Student() })
    cardDataList[cardDataList.length - 1].data.position =
      UserTypes.StudentPosition.Leader
    cardDataList[cardDataList.length - 1].data.status =
      UserTypes.AttendanceStatus.Waiting
    cardDataList[cardDataList.length - 1].data.pay_amount = 0
    setCardDataCounter(cardDataCounter + 1)
    //console.log(studentCounter)
    //console.log(studentList)
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
      }),
    )
  }
  // 生徒情報更新
  function changeStudentData(id: number, data: UserTypes.Student): void {
    const target = cardDataList.find((item) => item.id == id)
    if (target && target?.data) {
      target.data = data
    }
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
      }),
    )
  }
  // 生徒カード削除
  function removeStudent(id: number): void {
    console.log('remove id', id)
    const targetIndex = cardDataList.findIndex((item) => item.id == id)
    cardDataList.splice(targetIndex, 1)
    console.log(cardDataList)
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
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
              募集生徒
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box justifyContent={'flex-end'}>
              <IconButton
                color="primary"
                aria-label="add student"
                component="label"
                size="large"
                onClick={addStudent}
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
                      onChangeValue={changeStudentData}
                      onRemove={removeStudent}
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
