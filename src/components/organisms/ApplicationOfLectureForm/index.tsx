import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as UserTypes from '../../../types/userTypes'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

// 本フォームの出力データ型
export type ApplicationOfLecturePostFormData = {
  // 受講申請内容
  applicationOfLecture: UserTypes.ApplicationOfLecture
}

interface ApplicationOfLecturePostFormProps {
  // 申請するユーザー情報
  user: UserTypes.AuthUser
  // 講義情報
  lecture: UserTypes.LectureWithOptionData
  // 生徒情報
  student: UserTypes.Student
  /**
   * 投稿ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: ApplicationOfLecturePostFormData) => void
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
    fontSize: 18,
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
}))

/**
 * 受講申請フォーム
 */
export const ApplicationOfLecturePostForm = (
  props: ApplicationOfLecturePostFormProps,
) => {
  // React Hook Formの使用
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationOfLecturePostFormData>({
    mode: 'onBlur',
  })

  // Form submit時イベントハンドラ
  const onSubmit = (formData: ApplicationOfLecturePostFormData) => {
    console.log(formData)
    formData.applicationOfLecture.user_id = props.user.id
    formData.applicationOfLecture.student_id = props.student.id
    formData.applicationOfLecture.status = UserTypes.ApplicationStatus.Waiting
    console.log(props.user.id)
    props.onPost && props.onPost(formData)
  }

  return (
    <Box width="90%" margin={2}>
      <Flex justifyContent={'center'} flexDirection={'column'}>
        {/*情報入力フォーム*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
            <Flex justifyContent={'flex-start'} flexDirection={'column'}>
              {/*受講動機*/}
              <Text>受講動機</Text>
              <textarea
                {...register('applicationOfLecture.motivation', {})}
                rows={7}
              />
              {/* 申請ボタン */}
              <Box margin={2}>
                <Flex justifyContent={'center'}>
                  <Button type="submit">申請</Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </form>
        <Box marginBottom={1}>
          <Flex
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Text variant="large">募集内容</Text>
            {/* 講義タイトルの入力 */}
            <FormControl variant="standard" margin={'normal'}>
              <Text variant="medium">講義タイトル</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.lecture.lecture.title}
              />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>講義説明</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.lecture.lecture.explanation}
              />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>参加担当</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={UserTypes.ConvertToStringStudentPosition(
                  props.student.position,
                )}
              />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>支払い金額[￥]</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.student.pay_amount}
              />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>目標到達レベル</Text>
              <BootstrapInput id="bootstrap-input" value={props.student.goal} />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>参加必要条件</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.student.requirement}
              />
            </FormControl>
            <FormControl variant="standard" margin={'normal'}>
              <Text>必要開発環境</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.student.dev_env}
              />
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
