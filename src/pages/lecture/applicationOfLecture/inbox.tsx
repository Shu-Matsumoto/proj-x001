/**
 * 受講申込一覧ページ
 */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetMyApplyBoxList } from '../../../api/applicationOfLecture'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import ApplicationOfLectureCardListContainer from 'containers/ApplicationOfLectureCardListContainer'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ApiContext,
  AppErrorCode,
  ApplicationOfLectureWithOptionData,
  ApplicationStatus,
  ApplicationStatusString,
  ConvertToNumberApplicationStatus,
} from 'types/userTypes'

// 絞り込み条件
type Condition =
  | ApplicationStatusString.Waiting
  | ApplicationStatusString.Accept
  | ApplicationStatusString.Reject

/**
 * 受講申請の受信ボックス
 */
const ApplicationOfLectureInboxPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 絞込結果
  const [applicationOfLectures, setApplicationOfLectures] = useState<
    ApplicationOfLectureWithOptionData[]
  >([])
  // 絞込結果ロード中
  const [isLoading, setIsLoading] = useState(false)
  // ページルート
  const router = useRouter()
  // #endregion Fields

  // APIへ送信するデータへ変換
  const covertToApiPostData = (conditions: string[]) => {
    const array = conditions.map((item) => {
      return { status: ConvertToNumberApplicationStatus(item) }
    })
    return { data: array }
  }

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
    GetMyApplyBoxList(
      apiContext,
      authUser.id,
      covertToApiPostData(selected),
    ).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setApplicationOfLectures(
          apiResult.data.filter(
            (item) => item.status == ApplicationStatus.Waiting,
          ),
        )
        console.log(applicationOfLectures)
      }
      setIsLoading(false)
    })
  }

  // 初期化処理
  useEffect(() => {
    // 受講申請一覧取得
    setIsLoading(true)
    const selected: string[] = []
    GetMyApplyBoxList(
      apiContext,
      authUser.id,
      covertToApiPostData(selected),
    ).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setApplicationOfLectures(
          apiResult.data.filter(
            (item) => item.status == ApplicationStatus.Waiting,
          ),
        )
        console.log(applicationOfLectures)
      }
      setIsLoading(false)
    })
  }, [])
  // #endregion Functions

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = {
    link: '/lecture/applicationOfLecture/inbox',
    title: '受講申請一覧',
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
              受講申請一覧
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex justifyContent={'flex-start'} flexDirection={'row'}>
                {/*絞込条件*/}
                <Box>
                  <Flex>
                    {/* 絞込検索のフィルタ */}
                    <Box minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
                      <FilterGroup
                        title="絞込条件"
                        items={[
                          {
                            label: '申請中',
                            name: ApplicationStatusString.Waiting,
                          },
                          {
                            label: '処理済(許可)',
                            name: ApplicationStatusString.Accept,
                          },
                          {
                            label: '処理済(否認)',
                            name: ApplicationStatusString.Reject,
                          },
                        ]}
                        value={searchConditions}
                        onChange={handleSearchConditionChange}
                      />
                    </Box>
                  </Flex>
                </Box>
                {/*絞込結果*/}
                <Box>
                  <Flex flexDirection={'column'}>
                    <Text variant="mediumLarge">一覧</Text>
                    {/*
                      受講申請リストコンテナ
                      絞込クエリから受講申請リストを表示
                    */}
                    <ApplicationOfLectureCardListContainer
                      isLoading={isLoading}
                      applicationOfLectures={applicationOfLectures}
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

export default ApplicationOfLectureInboxPage
