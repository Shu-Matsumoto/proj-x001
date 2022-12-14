/**
 * 受講一覧ページ
 */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetMyStudies } from '../../api/lectures'
import { useAuthContext } from '../../contexts/AuthContext'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LectureCardListContainer from 'containers/LectureCardListContainer'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'
import { ApiContext, AppErrorCode, LectureWithUser } from 'types/userTypes'

// 検索条件
type Condition = 'ongoing' | 'done'

const AttendanceManagementPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 絞込結果
  const [lectures, setLectures] = useState<LectureWithUser[]>([])
  // 絞込結果ロード中
  const [isLoading, setIsLoading] = useState(false)
  // #endregion Fields

  // #region Functions
  // 絞込条件をクエリから取得(条件選択コンポーネントにセットするために必要)
  const searchConditions = (() => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condition as Condition[]
    } else if (router.query.condition) {
      return [router.query.condition as Condition]
    } else {
      return []
    }
  })()

  /**
   * 絞込条件変更イベントハンドラ
   * @param selected
   */
  const handleSearchConditionChange = (selected: string[]) => {
    // 条件をクエリへ追加
    router.push({
      pathname: router.pathname,
      query: {
        condition: selected,
      },
    })
    console.log(selected)
    // 検索
    setIsLoading(true)
    GetMyStudies(apiContext, authUser.id, selected).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setLectures(apiResult.data)
        console.log(lectures)
      }
      setIsLoading(false)
    })
  }

  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    setIsLoading(true)
    const selected: string[] = []
    GetMyStudies(apiContext, authUser.id, selected).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setLectures(apiResult.data)
        console.log(lectures)
      }
      setIsLoading(false)
    })
  }, [])
  // #endregion Functions

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/attendance/me', title: '受講一覧' }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<AttendancePageSubMenu />}
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
              受講講義一覧
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex justifyContent={'flex-start'} flexDirection={'row'}>
                <Box>
                  <Flex>
                    {/* 講義検索のフィルタ */}
                    <Box
                      as="aside"
                      minWidth="200px"
                      marginBottom={{ base: 2, md: 0 }}
                    >
                      <FilterGroup
                        title="絞込条件"
                        items={[
                          { label: '受講中', name: 'ongoing' },
                          { label: '受講済', name: 'done' },
                        ]}
                        value={searchConditions}
                        onChange={handleSearchConditionChange}
                      />
                    </Box>
                  </Flex>
                </Box>
                {/*検索結果*/}
                <Box>
                  <Flex flexDirection={'column'}>
                    <Text variant="mediumLarge">一覧</Text>
                    {/*
                      講義カードリストコンテナ
                      検索クエリから講義カードリストを表示
                    */}
                    <LectureCardListContainer
                      isLoading={isLoading}
                      lectures={lectures}
                      view_mode_mine={true}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default AttendanceManagementPage
