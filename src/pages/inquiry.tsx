/**
 * お問い合わせ投稿ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import InquiryPageSubMenu from 'containers/menu/inquiryPageSubMenu'

const InquiryPage: NextPage = () => {
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<InquiryPageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        お問い合わせページです。
      </MainPartLayout>
    </Layout>
  )
}

export default InquiryPage
