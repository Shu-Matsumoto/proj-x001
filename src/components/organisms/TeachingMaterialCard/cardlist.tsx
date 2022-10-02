import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
  // 参照モード
  isRefMode: boolean
  // 参照用データ
  refData: UserTypes.TeachingMaterial[]
  // 編集中の値変更時のイベントハンドラ
  updatePostData: (data: UserTypes.TeachingMaterial[]) => void
}

export const TeachingMaterialCardList = (props: CardListProps) => {
  // #region Fields
  // カード追加の都度インクリメントするカウンタ
  const [cardDataCounter, setCardDataCounter] = useState(0)
  const [cardDataList, setCardDataList] = useState<
    { id: number; data: UserTypes.TeachingMaterial }[]
  >([])
  // #endregion Fields
  // カード追加
  // 初回のみの実行
  useEffect(() => {
    if (!props.isRefMode) {
      props.updatePostData(
        cardDataList.map((item) => {
          return item.data
        }),
      )
    }
  }, [])

  // ステートの変更
  useEffect(() => {
    if (props.isRefMode) {
      setCardDataList(props.refData.map((item, index) => {
        return {
          id: index,
          data: item
        }
      }))
      console.log(cardDataList)      
    }
  }, [props.refData])

  // カード追加
  function addCard(): void {
    cardDataList.push({
      id: cardDataCounter,
      data: UserTypes.GetObj_TeachingMaterial(),
    })
    cardDataList[cardDataList.length - 1].data.user_id = 1
    setCardDataCounter(cardDataCounter + 1)
    //console.log(cardDataCounter)
    //console.log(cardDataList)
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
      }),
    )
  }
  // リスト情報更新
  function changeListData(
    id: number,
    setData: UserTypes.TeachingMaterial,
  ): void {
    const target = cardDataList.find((item) => item.id == id)
    if (target && target?.data) {
      target.data = setData
    }
    setCardDataList([...cardDataList])
    props.updatePostData(
      cardDataList.map((item) => {
        return item.data
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
              教材
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!props.isRefMode && (
              <Box justifyContent={'flex-end'}>
                <IconButton
                  color="primary"
                  aria-label="add student"
                  component="label"
                  size="large"
                  onClick={addCard}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
            )}
            <ul>
              {cardDataList.map((item) => {
                return (
                  <li key={item.id}>
                    <CardData
                      isRefMode={props.isRefMode}
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
