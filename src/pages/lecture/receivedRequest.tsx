/**
 * 受講申込一覧ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'

const ReceivedRequestPage: NextPage = () => {  
  return (
    <Layout>
      <MainPartLayout subMenu={<LecturePageSubMenu/>}>
        受講申込一覧ページです。
      </MainPartLayout>
    </Layout>
  )
}

export default ReceivedRequestPage