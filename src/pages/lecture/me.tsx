/**
 * 講義一覧ページ
 */
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { GetLectures } from '../../api/lectures/'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import { useAuthContext } from 'contexts/AuthContext'
import { ApiContext } from 'types/userTypes'

const MyLecturePage: NextPage = () => {
  // #region Fields
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

  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/lecture/me', title: '講義投稿' }
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
              講義一覧
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}></Box>
            <Separator />
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default MyLecturePage
