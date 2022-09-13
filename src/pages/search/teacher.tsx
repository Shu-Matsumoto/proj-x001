/**
 * 講師検索ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'

const TopPage: NextPage = () => {  
  return (
    <Layout>
      <MainPartLayout subMenu={<AttendancePageSubMenu/>}>
        講師検索ページです。
      </MainPartLayout>
    </Layout>
  )
}

export default TopPage