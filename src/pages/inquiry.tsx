/**
 * お問い合わせ投稿ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import InquiryPageSubMenu from 'containers/menu/inquiryPageSubMenu'

const InquiryPage: NextPage = () => {
  return (
    <Layout>
      <MainPartLayout subMenu={<InquiryPageSubMenu/>}>
        お問い合わせページです。
      </MainPartLayout>
    </Layout>
  )
}

export default InquiryPage