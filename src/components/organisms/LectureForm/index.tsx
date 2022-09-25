import { Select, MenuItem } from '@material-ui/core'
import { TextField } from '@mui/material'
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import * as UserTypes from '../../../types/userTypes'
import * as Utils from '../../../utils'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

export type LecturePostFormData = {
  lecture: UserTypes.Lecture
  students: UserTypes.Student[]
  teachers: UserTypes.Teacher[]
  schedules: UserTypes.LectureSchedule[]
  materials: UserTypes.TeachingMaterial[]
}

interface LecturePostFormProps {
  /**
   * 投稿ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: LecturePostFormData) => void
}

/**
 * 講義新規投稿フォーム
 */
export const LecturePostForm = ({ onPost }: LecturePostFormProps) => {
  // React Hook Formの使用
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LecturePostFormData>({
    defaultValues: {
      lecture: {
        user_id: 1,
        title: 'サンプル講義1',
        explanation: '講義の説明サンプルです。',
      },
      students: [
        {
          user_id: 1,
          position: UserTypes.StudentPosition.Leader,
          status: UserTypes.AttendanceStatus.Waiting,
          pay_amount: 19000,
          goal: '目標設定のサンプルです。',
          requirement: '参加必要条件のサンプルです。',
          dev_env: '必要な開発環境のサンプルです。',
        },
      ],
      teachers: [
        {
          user_id: 1,
          type: UserTypes.StudentPosition.Leader,
          pay_amount: 19000,
        },
      ],
      schedules: [
        {
          start_time: Utils.ToDatetimeString(
            new Date(2022, 10 - 1, 4, 23, 0, 0),
          ),
          end_time: Utils.ToDatetimeString(
            new Date(2022, 10 - 1, 4, 23, 59, 0),
          ),
          url: 'https://us02web.zoom.us/j/86346237299?pwd=UnBYMW8rZUZvU1VoSThzVW9UcnNZdz09',
          meeting_id: '863 4623 7299',
          passcord: '171910',
        },
      ],
      materials: [
        {
          user_id: 1,
          title: '教材サンプル1',
          explanation: 'これは教材の説明サンプルです。',
          path: 'https://drive.google.com/file/d/1_iZM0kjrw_fwrzQE/view?usp=sharing',
        },
      ],
    },
    mode: 'onBlur',
  })

  // StudentのArray
  const {
    fields: studentFields,
    append: studentAppend,
    remove: studentRemove,
  } = useFieldArray({
    name: 'students',
    control,
  })
  // TeacherのArray
  const {
    fields: teacherFields,
    append: teacherAppend,
    remove: teacherRemove,
  } = useFieldArray({
    name: 'teachers',
    control,
  })
  // ScheduleのArray
  const {
    fields: scheduleFields,
    append: scheduleAppend,
    remove: scheduleRemove,
  } = useFieldArray({
    name: 'schedules',
    control,
  })
  // MaterialのArray
  const {
    fields: materialFields,
    append: materialAppend,
    remove: materialRemove,
  } = useFieldArray({
    name: 'materials',
    control,
  })

  // Form submit時イベントハンドラ
  const onSubmit = (formData: LecturePostFormData) => {
    console.log(formData)
    onPost && onPost(formData)
  }

  return (
    <Box width="90%" margin={2}>
      <Flex justifyContent={'center'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* タイトル */}
          <Box marginBottom={1}>
            <Flex justifyContent={'center'}>
              {/* 講義タイトルの入力 */}
              <Input
                {...register('lecture.title', { required: true })}
                name="lecture.title"
                type="text"
                placeholder="講義タイトル"
                hasError={!!errors.lecture?.title}
              />
              {errors.lecture?.title && (
                <Text color="danger" variant="small" paddingLeft={1}>
                  講義タイトルは必須です
                </Text>
              )}
            </Flex>
          </Box>
          {/* 説明 */}
          <Box marginBottom={2}>
            <Flex justifyContent={'center'}>
              {/* 説明の入力 */}
              <Input
                {...register('lecture.explanation', { required: false })}
                name="lecture.explanation"
                type="text"
                placeholder="説明"
                // hasError={!!errors.explanation}
              />
            </Flex>
          </Box>
          {/* 生徒エリア */}
          <Box marginBottom={2}>
            募集生徒
            <Flex justifyContent={'center'}>
              {studentFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <Flex
                      justifyContent="flex-start"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <Select
                        {...register(`students.${index}.position`, {
                          required: true,
                        })}
                        name={`students.${index}.position`}
                      >
                        <MenuItem value="">...選択</MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Leader}>
                          Leader
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Frontend}>
                          Frontend Eng.
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Backend}>
                          Backend Eng.
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Design}>
                          Design Eng.
                        </MenuItem>
                      </Select>
                      <TextField
                        type="number"
                        {...register(`students.${index}.pay_amount`)}
                        name={`students.${index}.pay_amount`}
                      />
                      <TextField
                        type="text"
                        {...register(`students.${index}.goal`)}
                        name={`students.${index}.goal`}
                      />
                      <TextField
                        type="text"
                        {...register(`students.${index}.requirement`)}
                        name={`students.${index}.requirement`}
                      />
                      <TextField
                        type="text"
                        {...register(`students.${index}.dev_env`)}
                        name={`students.${index}.dev_env`}
                      />
                    </Flex>
                  </div>
                )
              })}
            </Flex>
          </Box>
          {/* 講師エリア */}
          <Box marginBottom={2}>
            講師
            <Flex justifyContent={'center'}>
              {teacherFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <Flex
                      justifyContent="flex-start"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <Select
                        {...register(`teachers.${index}.type`, {
                          required: true,
                        })}
                        name={`teachers.${index}.type`}
                      >
                        <MenuItem value="">...選択</MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Leader}>
                          Leader
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Frontend}>
                          Frontend Eng.
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Backend}>
                          Backend Eng.
                        </MenuItem>
                        <MenuItem value={UserTypes.StudentPosition.Design}>
                          Design Eng.
                        </MenuItem>
                      </Select>
                      <TextField
                        type="number"
                        {...register(`teachers.${index}.pay_amount`)}
                        name={`teachers.${index}.pay_amount`}
                      />
                    </Flex>
                  </div>
                )
              })}
            </Flex>
          </Box>
          {/* スケジュールエリア */}
          <Box marginBottom={2}>
            スケジュール
            <Flex justifyContent={'center'}>
              {teacherFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <Flex
                      justifyContent="flex-start"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <TextField
                        type="text"
                        {...register(`schedules.${index}.url`)}
                        name={`schedules.${index}.url`}
                      />
                      <TextField
                        type="text"
                        {...register(`schedules.${index}.meeting_id`)}
                        name={`schedules.${index}.meeting_id`}
                      />
                      <TextField
                        type="text"
                        {...register(`schedules.${index}.passcord`)}
                        name={`schedules.${index}.passcord`}
                      />
                    </Flex>
                  </div>
                )
              })}
            </Flex>
          </Box>
          {/* 教材エリア */}
          <Box marginBottom={2}>
            教材
            <Flex justifyContent={'center'}>
              {teacherFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <Flex
                      justifyContent="flex-start"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <TextField
                        type="text"
                        {...register(`materials.${index}.title`)}
                        name={`materials.${index}.title`}
                      />
                      <TextField
                        type="text"
                        {...register(`materials.${index}.explanation`)}
                        name={`materials.${index}.explanation`}
                      />
                      <TextField
                        type="text"
                        {...register(`materials.${index}.path`)}
                        name={`materials.${index}.path`}
                      />
                    </Flex>
                  </div>
                )
              })}
            </Flex>
          </Box>
          {/* 登録ボタン */}
          <Box>
            <Flex justifyContent={'center'}>
              <Button type="submit">新規登録</Button>
            </Flex>
          </Box>
        </form>
      </Flex>
    </Box>
  )
}
