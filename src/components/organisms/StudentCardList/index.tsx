import * as React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { StudentCard } from '../StudentCard';
import * as UserTypes from '../../../types/userTypes'

export const StudentCardList = () => {
	// #region Fields
	// 生徒追加の都度インクリメントするカウンタ
	const [studentCounter, setStudentCounter] = useState(0)
	const [studentList, setStudentList] = useState<{ id: number, student: UserTypes.Student }[]>(new Array())
	// #endregion Fields
	// 生徒カード追加
	function addStudent(): void {
		studentList.push({ id: studentCounter, student: UserTypes.GetObj_Student() })
		studentList[studentList.length - 1].student.position = UserTypes.StudentPosition.Leader
		studentList[studentList.length - 1].student.status = UserTypes.AttendanceStatus.Waiting
		studentList[studentList.length - 1].student.pay_amount = 0
		setStudentCounter(studentCounter + 1)
		//console.log(studentCounter)
		//console.log(studentList)
		setStudentList([...studentList])
	}
	// 生徒情報更新
	function changeStudentData(id: number, student: UserTypes.Student): void {
		let target = studentList.find(item => item.id == id)
		if (target && target?.student) {
			target.student = student
		}
		setStudentList([...studentList])
	}
	// 生徒カード削除
	function removeStudent(id: number): void {
		console.log('remove id', id)
		const targetIndex = studentList.findIndex(item => item.id == id)
		studentList.splice(targetIndex, 1)
		console.log(studentList)
		setStudentList([...studentList])
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
							募集生徒
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
								onClick={addStudent}
							>
								<PersonAddIcon />
							</IconButton>
						</Box>
						<ul>
							{studentList.map((item) => {
								return (
									<li>
										<StudentCard
											id={item.id}
											student={item.student}
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