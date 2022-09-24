import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import Box from 'components/layout/Box'
import Flex from "components/layout/Flex";
import InputBase from '@mui/material/InputBase';
import Text from 'components/atoms/Text'
import Button from 'components/atoms/Button'
import * as UserTypes from '../../../types/userTypes'

// 本フォームの出力データ型
export type AcceptOfApplicationResultPostFormData = {
  // 受講申請内容
  applicationOfLecture: UserTypes.ApplicationOfLecture;
}

interface AcceptOfApplicationResultPostFormProps {
  // 講義情報
  applicationOfLecture: UserTypes.ApplicationOfLectureWithOptionData
  /**
   * 投稿ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: AcceptOfApplicationResultPostFormData) => void
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
}));

/**
 * 受講申請フォーム
 */
export const AcceptOfApplicationResultPostForm = (props: AcceptOfApplicationResultPostFormProps) => {
  // React Hook Formの使用
	const {
    register,
    control,
    handleSubmit,
		formState: { errors },
  } = useForm<AcceptOfApplicationResultPostFormData>({
    defaultValues: {
      applicationOfLecture: {
        status: 1,
        fb_comment: ""
      },
    },
    mode: "onBlur"
  });

  // // トグルボタンの状態保持
  // const [alignment, setAlignment] = useState(Number(UserTypes.ApplicationStatus.Waiting));

  // // トグルボタンクリックイベントハンドラ
  // const handleChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: number,
  // ) => {
  //   setAlignment(newAlignment);
  // };

	// Form submit時イベントハンドラ
  const onSubmit = (formData: AcceptOfApplicationResultPostFormData) => {
    const acceptResult = formData.applicationOfLecture.status;
    const feedbackComment = formData.applicationOfLecture.fb_comment;
    //console.log(formData);
    formData.applicationOfLecture = props.applicationOfLecture;
    formData.applicationOfLecture.status = acceptResult;
    formData.applicationOfLecture.fb_comment = feedbackComment;
    //console.log(formData);
    props.onPost && props.onPost(formData);
  }

  return (
    <Box width="90%" margin={2}>
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
      >
        {/*情報入力フォーム*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
						<Flex
							flexDirection={"column"}
            >
              { /*受講希望者*/}
              <FormControl variant="standard" margin={"normal"}>
                <Text variant="medium">受講希望者</Text>
                <Box margin={2}>
                  <Flex
                    flexDirection={"row"}
                  >
                    <BootstrapInput
                      id="bootstrap-input" 
                      value={props.applicationOfLecture.user.user_name}
                    />
                    <Button
                      variant="primary"
                      type="button"
                    >
                      プロフィール
                    </Button>
                  </Flex>
                </Box>
              </FormControl>
              { /*受講動機*/}
              <Text>受講動機</Text>
              <textarea
                value={props.applicationOfLecture.motivation}
                rows={7}
              />
              { /*フィードバックコメント*/}
              <Text>フィードバックコメント</Text>
              <textarea
                {...register("applicationOfLecture.fb_comment", { required: true })}
                rows={7}
              />
              {errors.applicationOfLecture?.fb_comment && (
                <Text color="danger" variant="small" paddingLeft={1}>
                  コメントを入力してください。
                </Text>
              )}
              {/* 承認結果選択ボタン */}
              <Box margin={2}>
                <Flex flexDirection={"column"}>
                  <Text>受講申請 承認</Text>
                  {/* <ToggleButtonGroup
                    {...register("applicationOfLecture.status", {})}
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                  >
                    <ToggleButton value={Number(UserTypes.ApplicationStatus.Accept)}>承認</ToggleButton>
                    <ToggleButton value={Number(UserTypes.ApplicationStatus.Reject)}>却下</ToggleButton>
                    <ToggleButton value={Number(UserTypes.ApplicationStatus.Waiting)}>保留</ToggleButton>
                  </ToggleButtonGroup> */}
                  <select {...register("applicationOfLecture.status", { required: true })}>
                    <option value={Number(UserTypes.ApplicationStatus.Waiting)}>保留</option>
                    <option value={Number(UserTypes.ApplicationStatus.Accept)}>承認</option>
                    <option value={Number(UserTypes.ApplicationStatus.Reject)}>却下</option>
                  </select>
                </Flex>
              </Box>
              {errors.applicationOfLecture?.status && (
                <Text color="danger" variant="small" paddingLeft={1}>
                  申請に対する処置を入力してください。
                </Text>
              )}
              {/* 承認結果送信ボタン */}
              <Box margin={2}>
                <Flex justifyContent={"center"}>
                  <Button type="submit">
                    送信
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>  
        </form>
        <Box marginBottom={1}>
          <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text variant="large">募集内容</Text>
            {/* 講義タイトルの入力 */}
            <FormControl variant="standard" margin={"normal"}>
              <Text variant="medium">講義タイトル</Text>
              <BootstrapInput
                id="bootstrap-input" 
                value={props.applicationOfLecture.lecture.title}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>講義説明</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.applicationOfLecture.lecture.explanation}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>参加担当</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={UserTypes.ConvertToStringStudentPosition(props.applicationOfLecture.student.position)}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>支払い金額[￥]</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.applicationOfLecture.student.pay_amount}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>目標到達レベル</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.applicationOfLecture.student.goal}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>参加必要条件</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.applicationOfLecture.student.requirement}
              />
            </FormControl>
            <FormControl variant="standard" margin={"normal"}>
              <Text>必要開発環境</Text>
              <BootstrapInput
                id="bootstrap-input"
                value={props.applicationOfLecture.student.dev_env}
              />
            </FormControl>
          </Flex>
        </Box>  
      </Flex>  
    </Box>
  )
}
