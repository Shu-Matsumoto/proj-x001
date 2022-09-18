/**
 * 講義一覧ページ
 */
import type { NextPage } from 'next'
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import {LecturePostForm, LecturePostFormData} from 'components/organisms/LectureForm'
import { ApiContext } from 'types/userTypes'
import { AddLectureWithOptionData } from '../../api/lectures/'

const LectureManagementPage: NextPage = () => {

  // 新規講義投稿
  const postNewLecture = (formInputData: LecturePostFormData) => {
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    AddLectureWithOptionData(apiContext,
      formInputData.lecture,
      formInputData.students,
      formInputData.teachers,
      formInputData.schedules,
      formInputData.materials
    )
			.then(result => {
				console.log(result);
			})
  }

  return (
    <Layout>
      <MainPartLayout subMenu={<LecturePageSubMenu/>}>
        <Box>
          <Flex
            flexDirection={"column"}
          >
            講義一覧ページです。
            <Separator />
            <Box width="100%">
              <Flex
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                投稿エリア
                <LecturePostForm onPost={postNewLecture}/>
              </Flex>
            </Box>
            <Separator />
              <Box><Flex>一覧エリア</Flex></Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
}

export default LectureManagementPage