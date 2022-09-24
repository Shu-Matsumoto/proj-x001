/**
 * トップページ
 */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import Text from 'components/atoms/Text'
import FilterGroup from 'components/molecules/FilterGroup'
import TopPageSubMenu from 'containers/menu/topPageSubMenu'
import UserNoticeCardListContainer from 'containers/UserNoticeCardListContainer'
import {
  ApiContext,
  AppErrorCode,
  UserNotice,
} from 'types/userTypes'
import { GetMyUserNotices, UpdateUserNotice } from '../api/user_notice'

// 絞込条件(既読 or 未読)
type Condition = 'alreadyRead' | 'unread';

const TopPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter();	
  // 認証済ユーザー
  const { authUser } = useAuthContext();
  // ユーザー通知リスト
  const [userNotices, setUserNotices] = useState<UserNotice[]>(new Array());
  // 絞込結果ロード中
  const [isLoading, setIsLoading] = useState(false);
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {    
    // ユーザー通知一覧取得
    GetMyUserNotices(apiContext, authUser.id, [])
			.then(apiResult => {
        console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          // ユーザー通知一覧の更新
          setUserNotices(apiResult.data);
        }
			})
  }, [])

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
    GetMyUserNotices(apiContext, authUser.id, selected)
			.then(apiResult => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setUserNotices(apiResult.data);
          //console.log(userNotices);
        }
        setIsLoading(false);
			})
  }
  // #endregion Functions

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  return (
    <Layout>
      <MainPartLayout
        subMenu={<TopPageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex
            flexDirection={"column"}
          >
            トップページです。
            <Separator />
            <Box width="100%" padding={2}>
              <Flex
                justifyContent={"flex-start"}
                flexDirection={"row"}
              >
                {/*検索条件*/}
                <Box>
                  <Flex>
                    {/* 講義検索のフィルタ */}
                    <Box minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
                      <FilterGroup
                      title="絞込条件"
                      items={[
                        { label: '未読', name: 'unread' },
                        { label: '既読', name: 'alreadyRead' },
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
                      ユーザー通知カードリストコンテナ
                      絞込クエリからユーザー通知カードリストを表示
                    */}
                    <UserNoticeCardListContainer
                      isLoading={isLoading}
                      userNotices={userNotices}
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

export default TopPage