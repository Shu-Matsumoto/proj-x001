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
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'
import LectureCardListContainer from 'containers/LectureCardListContainer'
import { ApiContext, AppErrorCode, Lecture} from 'types/userTypes'
import { SearchLectures } from '../../api/lectures/'

// 検索条件
type Condition = 'html' | 'css' | 'javascript' | 'php';
  
/**
 * 講義検索ページ
 * @returns 
 */
const LectureSearchPage: NextPage = () => {

  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
  }
  // 検索結果
  const [lectures, setLectures] = useState<Lecture[]>(new Array());
  // 検索結果ロード中
  const [isLoading, setIsLoading] = useState(false);
  // ページルート
  const router = useRouter();	
  // #endregion Fields

  // #region Functions
  // 検索条件をクエリから取得(条件選択コンポーネントにセットするために必要)
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
   * 検索条件変更イベントハンドラ
   * @param selected 
   */
  const handleSearchConditionChange = (selected: string[]) => {
    console.log(selected);
    // 検索
    setIsLoading(true);
    SearchLectures(apiContext, selected)
			.then(apiResult => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setLectures(apiResult.data);
          console.log(lectures);
        }
        setIsLoading(false);
			})
  }

  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    setIsLoading(true);
    let selected: string[] = new Array();
    SearchLectures(apiContext, selected)
			.then(apiResult => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setLectures(apiResult.data);
          console.log(lectures);
        }
        setIsLoading(false);
			})
  }, [])
  // #endregion Functions

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  breadcrumbList[1] = { link: "/attendance/me", title: "受講一覧" };
  breadcrumbList[2] = { link: "/search", title: "講義検索" };
  return (
    <Layout>
      <MainPartLayout
        subMenu={<AttendancePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex
            flexDirection={"column"}
          >
            講義検索ページです。
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
                      title="検索条件"
                      items={[
                        { label: 'HTML', name: 'html' },
                        { label: 'CSS', name: 'css' },
                        { label: 'JavaScript', name: 'javascript' },
                        { label: 'PHP', name: 'php' },
                      ]}
                      value={searchConditions}
                      onChange={handleSearchConditionChange}
                    />
                    </Box>
                  </Flex>
                </Box>
                {/*検索結果*/}
                <Box>
                  <Flex flexDirection={"column"}>
                    <Text variant="mediumLarge">検索結果</Text>
                    {/*
                      講義カードリストコンテナ
                      検索クエリから講義カードリストを表示
                    */}
                    <LectureCardListContainer
                      isLoading={isLoading}
                      lectures={lectures}
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

export default LectureSearchPage
