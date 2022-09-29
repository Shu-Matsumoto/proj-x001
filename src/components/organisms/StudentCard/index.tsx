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

interface StudentCardProps {
	// 生徒ID
	id: number
  // 生徒情報
	student: UserTypes.Student
	// フォーム内の値が変化した時のイベントハンドラ
  onChangeValue: (id: number, student: UserTypes.Student) => void
  // 削除ボタンを押した時のイベントハンドラ
  onRemove: (id: number) => void
}

export const StudentCard = (props: StudentCardProps) => {
	// #region Fields
	// 編集した生徒情報を格納するデータ
	const [student, setStudent] = useState<UserTypes.Student>(UserTypes.GetObj_Student())
	// #endregion Fields
	// #region Functions
	// 編集した値を親へ通知するイベントハンドラ
	function changeFormValue(): void {
		props.onChangeValue(props.id, student)
	}

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
					{/* 募集ヘッダー */}
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
					{/* 募集概要 */}
					<Grid xs={3}>
						<CardContent>
								<FormControl sx={{ m: 1, minWidth: 160 }} size="small">
									<InputLabel variant='outlined' size="small">役割</InputLabel>
								<Select
									//defaultValue={UserTypes.StudentPosition.Leader}
									value={props.student.position}
									onChange={e => {
										if (typeof e.target.value === "string") {
											student.position = UserTypes.ConvertToNumberStudentPosition(e.target.value)
										} else {
											student.position = e.target.value
										}
										setStudent({...student})
										changeFormValue()
									}}
									>
										<MenuItem value={UserTypes.StudentPosition.Leader}>Leader</MenuItem>
										<MenuItem value={UserTypes.StudentPosition.Frontend}>Frontend Eng.</MenuItem>
										<MenuItem value={UserTypes.StudentPosition.Backend}>Backend Eng.</MenuItem>
										<MenuItem value={UserTypes.StudentPosition.Design}>Design Eng.</MenuItem>
									</Select>
								</FormControl>
								<TextField
									label="受講金額"
									id="text-pay-amount"
									variant='standard'
									value={props.student.pay_amount}
									onChange={e => {
										student.pay_amount = Number(e.target.value)
										setStudent({...student})
										changeFormValue()
									}}
									margin="normal"
									sx={{ m: 1, width: '11ch' }}
									InputProps={{ startAdornment: <InputAdornment position="start">￥</InputAdornment>}}
									InputLabelProps={{ shrink: true }}
									color="primary" focused
								/>
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
											value={props.student.goal}
											onChange={e => {
												student.goal = e.target.value
												setStudent({...student})
												changeFormValue()
											}}
											multiline
											rows={4}
											InputLabelProps={{ shrink: true }}
											color="primary" focused 
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
											value={props.student.requirement}
											onChange={e => {
												student.requirement = e.target.value
												setStudent({...student})
												changeFormValue()
											}}
											multiline
											rows={4}
											InputLabelProps={{ shrink: true }}
											color="primary" focused 
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
											value={props.student.dev_env}
											onChange={e => {
												student.dev_env = e.target.value
												setStudent({...student})
												changeFormValue()
											}}
											multiline
											rows={4}
											InputLabelProps={{ shrink: true }}
											color="primary" focused 
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