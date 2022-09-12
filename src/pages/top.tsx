/**
 * トップページ
 */
import type { NextPage } from 'next'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { LinkInformationSet } from 'types'
import TopPageSubMenu from 'containers/menu/topPageSubMenu'

const TopPage: NextPage = () => {  
  return (
    <Layout>
      <MainPartLayout subMenu={<TopPageSubMenu/>}>
        トップページです。
      </MainPartLayout>
    </Layout>
  )
}

export default TopPage