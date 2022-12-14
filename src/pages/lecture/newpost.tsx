/**
 * 講義一覧ページ
 */
import Grid from '@mui/material/Unstable_Grid2'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GetLectures, AddLectureWithOptionData } from '../../api/lectures/'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import {
  LecturePostForm,
  LecturePostFormData,
} from 'components/organisms/LectureForm'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import { useAuthContext } from 'contexts/AuthContext'
import { ApiContext, AppErrorCode } from 'types/userTypes'

const MyLecturePage: NextPage = () => {
  // #region Fields
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // #endregion Fields

  // #region Function
  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }
    GetLectures(apiContext, authUser.id, ['all']).then((result) => {
      console.log(result)
    })
  }, [])

  // 新規講義投稿
  const postNewLecture = (formInputData: LecturePostFormData) => {
    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }
    AddLectureWithOptionData(
      apiContext,
      formInputData.lecture,
      formInputData.students,
      formInputData.teachers,
      formInputData.schedules,
      formInputData.materials,
    ).then((result) => {
      console.log(result)
      if (result.result.Code == AppErrorCode.Success) {
        alert('講義登録に成功しました。')
        // トップ画面へ遷移
        router.push('/top')
      } else {
        alert('講義登録に失敗しました。')
      }
    })
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/lecture/newpost', title: '講義投稿' }
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
              講義投稿
            </Text>
            {/* <Box width="100%" paddingLeft={2} paddingRight={2}> */}
            <Grid container spacing={3}>
              <Grid xs={12}>
                <LecturePostForm user={authUser} onPost={postNewLecture} />
              </Grid>
            </Grid>
            {/* </Box> */}
            <Separator />
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default MyLecturePage
