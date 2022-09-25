/**
 * 講義一覧ページ
 */
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { GetLectures, AddLectureWithOptionData } from '../../api/lectures/'
import Separator from 'components/atoms/Separator'
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
import { ApiContext, AppResult, AppErrorCode } from 'types/userTypes'

const MyLecturePage: NextPage = () => {
  // #region Fields
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  const [myLectures, setMyLectures] = useState(authUser.id)
  // #endregion Fields

  // #region Function
  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    GetLectures(apiContext, authUser.id, ['all']).then((result) => {
      console.log(result)
    })
  }, [])

  // 新規講義投稿
  const postNewLecture = (formInputData: LecturePostFormData) => {
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
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
    })
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/lecture/me', title: '講義一覧' }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<LecturePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex flexDirection={'column'}>
            講義一覧ページです。
            <Separator />
            <Box width="100%">
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                投稿エリア
                <LecturePostForm onPost={postNewLecture} />
              </Flex>
            </Box>
            <Separator />
            <Box>
              <Flex>一覧エリア</Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default MyLecturePage
