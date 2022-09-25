import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import { alpha, styled } from '@mui/material/styles'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import { GetLectureWithOptionData } from '../../../api/lectures'
import Button from 'components/atoms/Button'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
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
}))

/**
 * 講義詳細表示コンポーネント
 */
export const LectureDetail = (props: LectureDetailProps) => {
  // #region Fields
  const [lecture, setLecture] = useState(new LectureWithOptionData())
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
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
    <Box width="90%" margin={2}>
      <Flex justifyContent={'flex-start'}>
        {/* タイトル */}
        <Box marginBottom={1}>
          <Flex justifyContent={'flex-start'} flexDirection={'column'}>
            <>
              {/* 講義タイトルの入力 */}
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  講義タイトル
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={lecture.lecture.title}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  説明
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={lecture.lecture.explanation}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <Box margin={1}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    講師
                  </InputLabel>
                </Box>
                {lecture.teachers.map((teacher, index) => {
                  return (
                    <Box key={index} margin={1}>
                      <Flex key={index} flexDirection={'row'}>
                        <BootstrapInput
                          key={index}
                          id="bootstrap-input"
                          value={teacher.user.user_name}
                        />
                        <BootstrapInput
                          key={index}
                          id="bootstrap-input"
                          value={ConvertToStringStudentPosition(
                            teacher.teacher.type,
                          )}
                        />
                      </Flex>
                    </Box>
                  )
                })}
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <Box margin={1}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    募集生徒
                  </InputLabel>
                </Box>
                {lecture.students.map((student, index) => {
                  return (
                    <Box key={index} margin={1}>
                      <Flex key={index}>
                        <BootstrapInput
                          key={index}
                          id="bootstrap-input"
                          value={ConvertToStringStudentPosition(
                            student.student.position,
                          )}
                        />
                        {!props.view_mode_mine && (
                          <Link
                            key={index}
                            href={{
                              pathname: `/lecture/applicationOfLecture/post/${student.student.user_id}`,
                              query: {
                                lecture_id: student.student.lecture_id,
                                student_id: student.student.id,
                              },
                            }}
                            passHref
                          >
                            <Button
                              key={index}
                              width={{ base: '100px', md: '100px' }}
                            >
                              受講申請
                            </Button>
                          </Link>
                        )}
                      </Flex>
                    </Box>
                  )
                })}
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <Box margin={1}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    スケジュール
                  </InputLabel>
                </Box>
                {lecture.schedules.map((schedule, index) => {
                  return (
                    <Flex
                      key={index}
                      justifyContent={'space-between'}
                      flexDirection={'row'}
                    >
                      <BootstrapInput
                        key={index}
                        id="bootstrap-input"
                        value={schedule.start_time}
                      />
                      <BootstrapInput
                        key={index}
                        id="bootstrap-input"
                        value={schedule.end_time}
                      />
                      {props.view_mode_mine && (
                        <Button
                          key={index}
                          variant={'secondary'}
                          width={{ base: '100px', md: '100px' }}
                          onClick={() => {
                            /* 新規タブを開きZOOMリンクへアクセス */
                            window.open(
                              'https://us05web.zoom.us/j/4344904366?pwd=R2ltOVJOYldMREJXbndzcnZLa0xzZz09',
                              '_blank',
                            )
                          }}
                        >
                          講義参加
                        </Button>
                      )}
                    </Flex>
                  )
                })}
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  教材
                </InputLabel>
                {lecture.materials.map((material, index) => {
                  return (
                    <>
                      <BootstrapInput
                        key={index}
                        id="bootstrap-input"
                        value={material.title}
                      />
                    </>
                  )
                })}
              </FormControl>
            </>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
  // #endregion View
}
