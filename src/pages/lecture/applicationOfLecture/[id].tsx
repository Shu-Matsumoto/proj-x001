/**
 * 講義一覧ページ
 */
import type { NextPage } from 'next'
import  { useRouter } from "next/router"
import  { useState, useEffect } from "react"
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import { ApplicationOfLecturePostForm, ApplicationOfLecturePostFormData } from 'components/organisms/ApplicationOfLectureForm'
import { ApiContext, AppErrorCode, LectureWithOptionData, Student, GetObj_Student} from 'types/userTypes'
import { AddApplicationOfLecture } from '../../../api/applicationOfLecture'
import { GetStudent, GetLectureWithOptionData } from 'api/lectures'
import { useAuthContext } from 'contexts/AuthContext'

/**
 * 受講申請送信ページ
 * @returns 
 */
const ApplicationOfLecturePage: NextPage = () => {
  // #region Fields
  const router = useRouter();
  // 認証済ユーザー
  const { authUser } = useAuthContext();
  // 申請対象となる生徒情報
  const [student, setStudent] = useState<Student>(GetObj_Student());
  // 申請対象生徒に紐づく講義情報
  const [lecture, setLecture] = useState<LectureWithOptionData>(new LectureWithOptionData());
  // #endregion Fields
  // #region Function
  // 初期化処理
  useEffect(() => {
    // 講義情報取得
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    
    // 生徒情報取得
    GetStudent(apiContext, Number(router.query.student_id))
			.then(apiResult => {
        console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          // 生徒情報の更新
          setStudent(apiResult.data);
          // 講義情報取得(詳細)
          GetLectureWithOptionData(apiContext, apiResult.data.lecture_id)
          .then(apiResult2 => {
            console.log(apiResult2);
            if (apiResult2.result.Code == AppErrorCode.Success) {
              // 講義情報の更新
              setLecture(apiResult2.data);
            }
			    })
        }
			})
  }, [])

  // 新規受講申請送信
  const postNewApplicationOfLecture = (formInputData: ApplicationOfLecturePostFormData) => {
    console.log(formInputData);
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    // 受講申請送信
    AddApplicationOfLecture(apiContext, formInputData.applicationOfLecture)
			.then(apiResult => {
				console.log(apiResult);
			})
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  breadcrumbList[1] = { link: "/search/lecture", title: "講義検索" };
  breadcrumbList[2] = { link: `/lecture/applicationOfLecture`, title: "受講申請" };
  return (
    <Layout>
      <MainPartLayout
        subMenu={<LecturePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Box>
          <Flex
            flexDirection={"column"}
          >
            受講申請ページです。
            <Separator />
            <Box width="100%">
              <Flex
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                投稿エリア
                <ApplicationOfLecturePostForm
                  user={authUser}
                  lecture={lecture}
                  student={student}
                  onPost={postNewApplicationOfLecture} />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ApplicationOfLecturePage