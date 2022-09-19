/**
 * 特定講義参照ページ
 */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'
import { ApiContext, AppErrorCode, LectureWithOptionData } from 'types/userTypes'
import { GetLectureWithOptionData } from '../../api/lectures/'
import { LectureDetail } from 'components/organisms/LectureDetail'

const IndexLecturePage: NextPage = () => {
  // #region Fields
  const router = useRouter();
  // 講義ID
  const lecture_id = Number(router.query.id);
  // #endregion Fields

  // #region Function
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  breadcrumbList[1] = { link: "/attendance/me", title: "受講一覧" };
  breadcrumbList[2] = { link: "/search", title: "講義検索" };
  breadcrumbList[3] = { link: `/lecture/${lecture_id}`, title: "講義詳細" };
  return (
    <Layout>
      <MainPartLayout
        subMenu={<AttendancePageSubMenu/>}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex
            flexDirection={"column"}
          >
            講義詳細ページです。
            <Separator />
            <Box width="100%">
              <Flex
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                { /*講義詳細表示*/}
                <LectureDetail lecture_id={lecture_id}/>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default IndexLecturePage