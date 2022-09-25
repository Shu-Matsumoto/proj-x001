/**
 * 講師検索ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'

const TopPage: NextPage = () => {
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<AttendancePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        講師検索ページです。
      </MainPartLayout>
    </Layout>
  )
}

export default TopPage
