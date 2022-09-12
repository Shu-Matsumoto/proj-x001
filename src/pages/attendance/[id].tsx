/**
 * 受講一覧ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'

const AttendanceManagementPage: NextPage = () => {
  return (
    <Layout>
      <MainPartLayout subMenu={<AttendancePageSubMenu/>}>
        受講一覧ページです。
      </MainPartLayout>
    </Layout>
  )
}

export default AttendanceManagementPage