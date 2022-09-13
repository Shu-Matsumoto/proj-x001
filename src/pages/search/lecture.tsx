import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import AttendancePageSubMenu from 'containers/menu/attendancePageSubMenu'
import LectureCardListContainer from 'containers/LectureCardListContainer'

/**
 * 講義検索ページ
 * @returns 
 */
const LectureSearchPage: NextPage = () => {
  const router = useRouter();
	
	const handleChange = (selected: string[]) => {
		console.log(selected);
  }

  return (
    <Layout>
      <MainPartLayout subMenu={<AttendancePageSubMenu/>}>
        <Box
          paddingLeft={{
            base: 2,
            md: 3,
          }}
          paddingRight={{
            base: 2,
            md: 3,
          }}
          paddingTop={2}
          paddingBottom={2}
        >
          <Box marginBottom={1}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/top">
                  <a>トップ</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/search">
                  <a>講義検索</a>
                </Link>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Flex>
            <Flex flexDirection={{ base: 'column', md: 'row' }}>
              <Box as="aside" minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
                {/* 講義検索のフィルタ */}
                <FilterGroup
                  title="検索条件"
                  items={[
                    { label: 'HTML', name: 'html' },
                    { label: 'CSS', name: 'css' },
                    { label: 'JavaScript', name: 'javascript' },
                    { label: 'PHP', name: 'php' },
                  ]}
                  // value={conditions}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text
                  as="h2"
                  display={{ base: 'block', md: 'none' }}
                  fontWeight="bold"
                  variant="mediumLarge"
                >
                  講義一覧
                </Text>
                {/*
                  講義カードリストコンテナ
                  検索クエリから講義カードリストを表示
                */}
                <LectureCardListContainer/>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
}

export default LectureSearchPage
