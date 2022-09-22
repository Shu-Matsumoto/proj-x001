/**
 * 受講申込一覧ページ
 */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import Text from 'components/atoms/Text'
import FilterGroup from 'components/molecules/FilterGroup'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import ApplicationOfLectureCardListContainer from 'containers/ApplicationOfLectureCardListContainer'
import {
  ApiContext,
  AppErrorCode,
  ApplicationOfLectureWithOptionData,
  ApplicationStatusString,
  ConvertToNumberApplicationStatus,
} from 'types/userTypes'
import { GetMyApplyBoxList } from '../../../api/applicationOfLecture'
import { useAuthContext } from 'contexts/AuthContext'

// 絞り込み条件
type Condition = ApplicationStatusString.Waiting
  | ApplicationStatusString.Accept
  | ApplicationStatusString.Reject;

/**
 * 受講申請の受信ボックス
 */
const ApplicationOfLectureInboxPage: NextPage = () => {  

  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
  }
  // 認証済ユーザー
  const { authUser } = useAuthContext();
  // 絞込結果
  const [applicationOfLectures, setApplicationOfLectures] = useState<ApplicationOfLectureWithOptionData[]>(new Array());
  // 絞込結果ロード中
  const [isLoading, setIsLoading] = useState(false);
  // ページルート
  const router = useRouter();	
  // #endregion Fields

  // APIへ送信するデータへ変換
  const covertToApiPostData = (conditions: string[]) => {
    let array = conditions.map((item) => {
      return (
        { status: ConvertToNumberApplicationStatus(item)}
      )
    });
    return { data: array };
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
    console.log(selected);
    // 検索
    setIsLoading(true);
    GetMyApplyBoxList(apiContext, authUser.id, covertToApiPostData(selected))
			.then(apiResult => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setApplicationOfLectures(apiResult.data);
          console.log(applicationOfLectures);
        }
        setIsLoading(false);
			})
  }

  // 初期化処理
  useEffect(() => {
    // 受講申請一覧取得
    setIsLoading(true);
    let selected: string[] = new Array();
    GetMyApplyBoxList(apiContext, authUser.id, covertToApiPostData(selected))
			.then(apiResult => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setApplicationOfLectures(apiResult.data);
          console.log(applicationOfLectures);
        }
        setIsLoading(false);
			})
  }, [])
  // #endregion Functions

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  breadcrumbList[1] = { link: "lecture/applicationOfLecture/inbox", title: "受講申請一覧" };
  return (
    <Layout>
      <MainPartLayout
        subMenu={<LecturePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex
            flexDirection={"column"}
          >
            受講申請一覧ページです。
            <Separator />
            <Box width="100%" padding={2}>
              <Flex
                justifyContent={"flex-start"}
                flexDirection={"row"}
              >
                {/*絞込条件*/}
                <Box>
                  <Flex>
                    {/* 絞込検索のフィルタ */}
                    <Box minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
                      <FilterGroup
                      title="絞込条件"
                      items={[
                        { label: '申請中', name: ApplicationStatusString.Waiting },
                        { label: '処理済(許可)', name: ApplicationStatusString.Accept },
                        { label: '処理済(否認)', name: ApplicationStatusString.Reject },
                      ]}
                      value={searchConditions}
                      onChange={handleSearchConditionChange}
                    />
                    </Box>
                  </Flex>
                </Box>
                {/*絞込結果*/}
                <Box>
                  <Flex flexDirection={"column"}>
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