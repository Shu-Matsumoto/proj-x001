import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useState, useEffect } from 'react'
import * as React from 'react'
import { GetLectureWithOptionData } from '../../../api/lectures'
import LectureScheduleEditor from '../LectureSchedule'
import { StudentCardList } from '../StudentCard/cardlist'
import { TeacherCardList } from '../TeacherCard/cardlist'
import { TeachingMaterialCardList } from '../TeachingMaterialCard/cardlist'
import {
  ApiContext,
  AppErrorCode,
  LectureWithOptionData,
  ConvertToStringStudentPosition,
} from 'types/userTypes'

interface LectureDetailProps {
  lecture_id: number
  view_mode_mine: boolean
}

export const LectureDetail = (props: LectureDetailProps) => {
  // #region Fields
  const [lecture, setLecture] = useState(new LectureWithOptionData())
  // #endregion Fields
  // #region Functions
  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }
    GetLectureWithOptionData(apiContext, props.lecture_id).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setLecture(apiResult.data)
      }
    })
  }, [])
  // #endregion Functions
  // #region View
  return (
    <Box sx={{ flexGrow: 1, width: 830 }}>
      <Grid container spacing={2}>
        {/* 講義タイトル */}
        <Grid xs={12}>
          <TextField
            label="講義タイトル"
            value={lecture.lecture.title}
            fullWidth
            variant="standard"
            color="primary"
            focused
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 講義説明 */}
        <Grid xs={12}>
          <TextField
            label="講義説明"
            value={lecture.lecture.explanation}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            color="primary"
            focused
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* 講師 */}
        <Grid xs={12}>
          <TeacherCardList
            isRefMode={true}
            refData={lecture.teachers}
            updatePostData={() => {
              /*do nothing*/
            }}
          />
        </Grid>
        {/* 募集生徒 */}
        <Grid xs={12}>
          <StudentCardList
            isRefMode={true}
            refData={lecture.students}
            updatePostData={() => {
              /*do nothing*/
            }}
          />
        </Grid>
        {/* 講義開催スケジュール */}
        <Grid xs={12}>
          <LectureScheduleEditor
            isRefMode={true}
            refData={lecture.schedules}
            view_mode_mine={props.view_mode_mine}
            updatePostData={() => {
              /*do nothing*/
            }}
          />
        </Grid>
        {/* 教材 ※受講確定後から資料へアクセスできるようガードをかける*/}
        {props.view_mode_mine && (
          <Grid xs={12}>
            <TeachingMaterialCardList
              isRefMode={true}
              refData={lecture.materials}
              updatePostData={() => {
                /*do nothing*/
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
  // #endregion View
}
