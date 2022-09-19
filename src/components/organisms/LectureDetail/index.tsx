import React from "react";
import  { useState, useEffect } from "react"
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from 'components/layout/Box'
import Flex from "components/layout/Flex";
import { ApiContext, AppErrorCode, LectureWithOptionData } from 'types/userTypes'
import { GetLectureWithOptionData } from '../../../api/lectures'

interface LectureDetailProps {
	lecture_id: number
}

// 情報表示用タグ
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

/**
 * 講義詳細表示コンポーネント
 */
export const LectureDetail = (props: LectureDetailProps) => {
	// #region Fields
	const [lecture, setLecture] = useState(new LectureWithOptionData());
	// #endregion Fields
	// #region Functions
	// 初期化処理
  useEffect(() => {
    // 講義一覧取得
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
		}
		GetLectureWithOptionData(apiContext, 50)
			.then(apiResult => {
				//console.log(apiResult);
				if (apiResult.result.Code == AppErrorCode.Success) {
					setLecture(apiResult.data);
				}
			})
	}, [])
	// #endregion Functions

	// #region View
  return (
    <Box width="90%" margin={2}>
      <Flex
        justifyContent={"flex-start"}
      >
          {/* タイトル */}
          <Box marginBottom={1}>
						<Flex
							justifyContent={"flex-start"}
							flexDirection={"column"}
					  >
						<>
							{/* 講義タイトルの入力 */}
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
									講義タイトル
								</InputLabel>
								<BootstrapInput
									id="bootstrap-input" 
									value={lecture.lecture.title}
								/>
							</FormControl>
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
									説明
								</InputLabel>
								<BootstrapInput
									id="bootstrap-input"
									value={lecture.lecture.explanation}
								/>
							</FormControl>
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
									講師名
								</InputLabel>
								{
									lecture.teachers.map((teacher) => {
										return (
											<>
												<BootstrapInput
													id="bootstrap-input"
													value={teacher.user_id}
												/>
											</>
										)
									})
								}
							</FormControl>
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
										募集生徒
								</InputLabel>
								{
									lecture.students.map((student) => {
										return (
											<>
												<BootstrapInput
													id="bootstrap-input"
													value={student.user_id}
												/>
											</>
										)
									})
								}
							</FormControl>
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
									スケジュール
								</InputLabel>
								{
									lecture.schedules.map((schedule) => {
										return (
											<Flex
												justifyContent={"space-between"}
												flexDirection={"row"}
											>
												<BootstrapInput
													id="bootstrap-input"
													value={schedule.start_time}
												/>
												<BootstrapInput
													id="bootstrap-input"
													value={schedule.end_time}
												/>
											</Flex>
										)
									})
								}
							</FormControl>
							<FormControl variant="standard" margin={"normal"}>
								<InputLabel shrink htmlFor="bootstrap-input">
									教材
								</InputLabel>
								{
									lecture.materials.map((material) => {
										return (
											<>
												<BootstrapInput
													id="bootstrap-input"
													value={material.title}
												/>
											</>
										)
									})
								}
							</FormControl>
						</>
						</Flex>
          </Box>
      </Flex>  
		</Box>
	)
	// #endregion View
}
