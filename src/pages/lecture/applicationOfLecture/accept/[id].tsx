import type { NextPage } from 'next'
import  { useRouter } from "next/router"
import  { useState, useEffect } from "react"
import Layout from 'components/templates/Layout'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Separator from 'components/atoms/Separator'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import {
  AcceptOfApplicationResultPostForm,
  AcceptOfApplicationResultPostFormData
} from 'components/organisms/AcceptOfApplicationResultForm'
import {
  ApiContext,
  AppErrorCode,
  ApplicationOfLectureWithOptionData,
  GetObj_ApplicationOfLectureWithOptionData
} from 'types/userTypes'
import { UpdateStudent } from '../../../../api/lectures'
import {
  GetApplicationOfLecture,
  UpdateApplicationOfLecture
} from '../../../../api/applicationOfLecture'

/**
 * 受講申請承認ページ
 * @returns 
 */
const ApplicationOfLectureAcceptPage: NextPage = () => {
  // #region Fields
  const router = useRouter();
  // 受講申請情報
  const [applicationOfLecture, setApplicationOfLecture] = useState<ApplicationOfLectureWithOptionData>(
    GetObj_ApplicationOfLectureWithOptionData()
  );
  // #endregion Fields
  // #region Function
  // 初期化処理
  useEffect(() => {
    // 受講申請情報取得
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    
    // 受講申請情報取得
    GetApplicationOfLecture(apiContext, Number(router.query.id))
			.then(apiResult => {
        console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          // 受講申請情報の更新
          setApplicationOfLecture(apiResult.data);
        }
			})
  }, [])

  // 申請処理結果送信
  const postAcceptOfApplicationResult = (formInputData: AcceptOfApplicationResultPostFormData) => {
    console.log(formInputData);
    const apiContext: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost/api',
    }
    // 受講申請処理結果送信
    UpdateApplicationOfLecture(apiContext, formInputData.applicationOfLecture)
			.then(apiResult => {
        console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          // 申請処理が成功した場合に対象生徒情報のIDに申請者IDをセットする。
          let updateStudent = applicationOfLecture.student;
          updateStudent.user_id = applicationOfLecture.user_id;
          UpdateStudent(apiContext, updateStudent)
            .then(apiResult2 => {
              if (apiResult2.result.Code == AppErrorCode.Success) {
                setTimeout(() => {
                  router.push("/lecture/applicationOfLecture/inbox");
                }, 1000);
              }
          })
        }
			})
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string, title: string }[] = new Array();
  breadcrumbList[0] = { link: "/top", title: "トップ" };
  breadcrumbList[1] = { link: "/lecture/me", title: "講義一覧" };
  breadcrumbList[2] = { link: "/lecture/applicationOfLecture/inbox", title: "受講申請一覧" };
  breadcrumbList[3] = { link: `/lecture/applicationOfLecture/accept/${router.query.id}`, title: "受講申請処理" };
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
                <AcceptOfApplicationResultPostForm
                  applicationOfLecture={applicationOfLecture}
                  onPost={postAcceptOfApplicationResult} />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ApplicationOfLectureAcceptPage