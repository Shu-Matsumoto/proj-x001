import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useState, useEffect } from 'react'
import * as React from 'react'
import * as UserTypes from '../../../types/userTypes'
import LectureScheduleEditor from '../LectureSchedule'
import { StudentCardList } from '../StudentCard/cardlist'
import { TeacherCardList } from '../TeacherCard/cardlist'
import { TeachingMaterialCardList } from '../TeachingMaterialCard/cardlist'

export type LecturePostFormData = {
  lecture: UserTypes.Lecture
  students: UserTypes.Student[]
  teachers: UserTypes.Teacher[]
  schedules: UserTypes.LectureSchedule[]
  materials: UserTypes.TeachingMaterial[]
}

interface LecturePostFormProps {
  user?: UserTypes.AuthUser
  /**
   * 投稿ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: LecturePostFormData) => void
}

export const LecturePostForm = (props: LecturePostFormProps) => {
  // #region Fields
  const [postData, setPostData] = useState<LecturePostFormData>({
    lecture: UserTypes.GetObj_Lecture(),
    students: [],
    teachers: [],
    schedules: [],
    materials: [],
  })
  // #endregion Fields
  // #region Function
  // 初回のみの実行
  useEffect(() => {
    if (props.user && postData.lecture) {
      postData.lecture.user_id = props.user?.id
    }
    setPostData({ ...postData })
    console.log(postData)
  }, [])

  function updateTeacherData(data: UserTypes.Teacher[]) {
    if (data && postData?.teachers) {
      postData.teachers = data
    }
    const newPostData = postData
    setPostData(newPostData)
  }
  function updateStudentData(data: UserTypes.Student[]) {
    if (data && postData?.students) {
      postData.students = data
    }
    // 不定である1を代入
    postData.students.forEach((element) => {
      element.user_id = 1
    })
    const newPostData = postData
    setPostData(newPostData)
  }
  function updateScheduleData(data: UserTypes.LectureSchedule[]) {
    if (data && postData?.schedules) {
      postData.schedules = data
    }
    const newPostData = postData
    setPostData(newPostData)
  }
  function updateMaterialData(data: UserTypes.TeachingMaterial[]) {
    if (data && postData?.materials) {
      postData.materials = data
    }
    postData.materials.forEach((element) => {
      element.user_id = postData.lecture.user_id
    })
    const newPostData = postData
    setPostData(newPostData)
  }
  // 講義投稿ボタン
  const onSubmit = () => {
    console.log('Form', postData)

    // 投稿前の確認
    const result = confirm('新規講義を登録しますか？')
    if (result) {
      props.onPost && props.onPost(postData)
    }
  }
  // #endregion Function
  // #region View
  return (
    <Box sx={{ flexGrow: 1, width: 830 }}>
      <Grid container spacing={2}>
        {/* 講義タイトル */}
        <Grid xs={12}>
          <TextField
            label="講義タイトル"
            onChange={(e) => {
              postData.lecture.title = e.target.value
              setPostData({ ...postData })
            }}
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
            onChange={(e) => {
              postData.lecture.explanation = e.target.value
              setPostData({ ...postData })
            }}
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
            isRefMode={false}
            refData={[]}
            updatePostData={updateTeacherData}
          />
        </Grid>
        {/* 募集生徒 */}
        <Grid xs={12}>
          <StudentCardList
            isRefMode={false}
            refData={[]}
            updatePostData={updateStudentData}
          />
        </Grid>
        {/* 講義開催スケジュール */}
        <Grid xs={12}>
          <LectureScheduleEditor
            isRefMode={false}
            refData={[]}
            view_mode_mine={false}
            updatePostData={updateScheduleData}
          />
        </Grid>
        {/* 教材 */}
        <Grid xs={12}>
          <TeachingMaterialCardList
            isRefMode={false}
            refData={[]}
            updatePostData={updateMaterialData}
          />
        </Grid>
        {/* 投稿ボタン */}
        <Grid xs={12}>
          <Button variant="contained" size="small" onClick={onSubmit}>
            新規投稿
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
  // #endregion View
}
