/**
 * 講義一覧ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'

const LectureManagementPage: NextPage = () => {
  return (
    <Layout>
      <MainPartLayout subMenu={<LecturePageSubMenu/>}>
        講義一覧ページです。
      </MainPartLayout>
    </Layout>
  )
}

export default LectureManagementPage