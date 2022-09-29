import * as React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box'
import TextField, { StandardTextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as UserTypes from '../../../types/userTypes'

interface CardDataProps {
	// カードID
	id: number
  // カード内データ
	data: UserTypes.Teacher
	// フォーム内の値が変化した時のイベントハンドラ
  onChangeValue: (id: number, data: UserTypes.Teacher) => void
  // 削除ボタンを押した時のイベントハンドラ
  onRemove: (id: number) => void
}

export const CardData = (props: CardDataProps) => {
	// #region Fields
	// 編集した生徒情報を格納するデータ
	const [cardData, setCardData] = useState<UserTypes.Teacher>(UserTypes.GetObj_Teacher())
	// #endregion Fields
	// #region Functions
	// カード内データ値の変更イベントハンドラ
	function changeFormValue(): void {
		props.onChangeValue(props.id, cardData)
	}
	// 削除ボタンクリックイベントハンドラ
	function removeMyself(): void {
		console.log("do remove")
		props.onRemove(props.id)
	}
	// #endregion Functions
	// #region View
	return (
		<Box marginBottom={1}>
			<Card>
				<Grid container spacing={0} columns={12}>
					{/* エリア1 */}
					<Grid xs={3}>
						<Box
							display="flex"
							flexDirection={"column"}
							alignItems={"center"}
						>
							<Box marginTop={3} marginLeft={1}>
								<CardMedia
									component="img"
									image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf76v4M-JO8uEnyvey3Kz0EtZowRRDqfsL4Q&usqp=CAU"
									alt="green iguana"
								/>
							</Box>	
							<Box
								display="flex"
								flexDirection={"row"}
							>
								<CardActions>
									<Button variant="contained" size="small">受講申請</Button>
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
					{/* エリア2 */}
					<Grid xs={3}></Grid>
					{/* エリア3 */}
					<Grid xs={3}></Grid>
					{/* エリア4 */}
					<Grid xs={3}></Grid>
				</Grid>
			</Card>
		</Box>
	)
	// #endregion View
}