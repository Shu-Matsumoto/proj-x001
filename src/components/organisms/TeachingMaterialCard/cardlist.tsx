import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardData } from './card';
import * as UserTypes from '../../../types/userTypes'

export const TeachingMaterialCardList = () => {
	// #region Fields
	// カード追加の都度インクリメントするカウンタ
	const [cardDataCounter, setCardDataCounter] = useState(0)
	const [cardDataList, setCardDataList] = useState<{ id: number, data: UserTypes.TeachingMaterial }[]>(new Array())
	// #endregion Fields
	// カード追加
	function addCard(): void {
		cardDataList.push({ id: cardDataCounter, data: UserTypes.GetObj_TeachingMaterial() })
		cardDataList[cardDataList.length - 1].data.user_id = 1
		setCardDataCounter(cardDataCounter + 1)
		//console.log(cardDataCounter)
		//console.log(cardDataList)
		setCardDataList([...cardDataList])
	}
	// リスト情報更新
	function changeListData(id: number, setData: UserTypes.TeachingMaterial): void {
		let target = cardDataList.find(item => item.id == id)
		if (target && target?.data) {
			target.data = setData
		}
		setCardDataList([...cardDataList])
	}
	// カード削除
	function removeCard(id: number): void {
		console.log('remove id', id)
		const targetIndex = cardDataList.findIndex(item => item.id == id)
		cardDataList.splice(targetIndex, 1)
		console.log(cardDataList)
		setCardDataList([...cardDataList])
	}

	// #region Functions
	// #endregion Functions
	
	// #region View
	return (
		<Box>
			<Box>
				<Accordion style={{backgroundImage: `url(${'https://beiz.jp/images_T/white/white_00036.jpg'})`,}}>	
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						style={{ height: '1px' }}
					>
						<Typography
							variant="caption"
							color={"#0971f1"}
						>
							教材
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box
							justifyContent={'flex-end'}
						>
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
						<ul>
							{cardDataList.map((item) => {
								return (
									<li>
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