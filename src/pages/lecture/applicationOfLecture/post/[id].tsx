import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { AddApplicationOfLecture } from '../../../../api/applicationOfLecture'
import { GetStudent, GetLectureWithOptionData } from 'api/lectures'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import {
  ApplicationOfLecturePostForm,
  ApplicationOfLecturePostFormData,
} from 'components/organisms/ApplicationOfLectureForm'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ApiContext,
  AppErrorCode,
  LectureWithOptionData,
  Student,
  GetObj_Student,
} from 'types/userTypes'

/**
 * 受講申請送信ページ
 * @returns
 */
const ApplicationOfLecturePage: NextPage = () => {
  // #region Fields
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 申請対象となる生徒情報
  const [student, setStudent] = useState<Student>(GetObj_Student())
  // 申請対象生徒に紐づく講義情報
  const [lecture, setLecture] = useState<LectureWithOptionData>(
    new LectureWithOptionData(),
  )
  // #endregion Fields
  // #region Function
  // 初期化処理
  useEffect(() => {
    // 講義情報取得
    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }

    // 生徒情報取得
    GetStudent(apiContext, Number(router.query.student_id)).then(
      (apiResult) => {
        console.log(apiResult)
        if (apiResult.result.Code == AppErrorCode.Success) {
          // 生徒情報の更新
          setStudent(apiResult.data)
          // 講義情報取得(詳細)
          GetLectureWithOptionData(apiContext, apiResult.data.lecture_id).then(
            (apiResult2) => {
              console.log(apiResult2)
              if (apiResult2.result.Code == AppErrorCode.Success) {
                // 講義情報の更新
                setLecture(apiResult2.data)
              }
            },
          )
        }
      },
    )
  }, [])

  // 新規受講申請送信
  const postNewApplicationOfLecture = (
    formInputData: ApplicationOfLecturePostFormData,
  ) => {
    console.log(formInputData)

    // 申請確認
    const result = confirm('受講申請を送信しますか？')
    if (!result) {
      return
    }

    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }

    // fb_commentに値を入力しないとはじかれるので無意味文字列を代入しておく
    formInputData.applicationOfLecture.fb_comment = 'nothing'

    // 受講申請送信
    AddApplicationOfLecture(
      apiContext,
      formInputData.applicationOfLecture,
    ).then((apiResult) => {
      if (apiResult.result.Code == AppErrorCode.Success) {
        setTimeout(() => {
          router.push('/search/lecture')
        }, 1000)
      }
    })
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/search/lecture', title: '講義検索' }
  breadcrumbList[2] = {
    link: `/lecture/applicationOfLecture`,
    title: '受講申請',
  }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<LecturePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Separator />
        <Box>
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              受講申請
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                投稿エリア
                <ApplicationOfLecturePostForm
                  user={authUser}
                  lecture={lecture}
                  student={student}
                  onPost={postNewApplicationOfLecture}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ApplicationOfLecturePage
