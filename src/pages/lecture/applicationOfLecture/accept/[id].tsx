import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  GetApplicationOfLecture,
  UpdateApplicationOfLecture,
} from '../../../../api/applicationOfLecture'
import { UpdateStudent } from '../../../../api/lectures'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import {
  AcceptOfApplicationResultPostForm,
  AcceptOfApplicationResultPostFormData,
} from 'components/organisms/AcceptOfApplicationResultForm'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import LecturePageSubMenu from 'containers/menu/lecturePageSubMenu'
import {
  ApiContext,
  AppErrorCode,
  ApplicationOfLectureWithOptionData,
  GetObj_ApplicationOfLectureWithOptionData,
} from 'types/userTypes'

/**
 * 受講申請承認ページ
 * @returns
 */
const ApplicationOfLectureAcceptPage: NextPage = () => {
  // #region Fields
  const router = useRouter()
  // 受講申請情報
  const [applicationOfLecture, setApplicationOfLecture] =
    useState<ApplicationOfLectureWithOptionData>(
      GetObj_ApplicationOfLectureWithOptionData(),
    )
  // #endregion Fields
  // #region Function
  // 初期化処理
  useEffect(() => {
    // 受講申請情報取得
    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }

    // 受講申請情報取得
    GetApplicationOfLecture(apiContext, Number(router.query.id)).then(
      (apiResult) => {
        console.log(apiResult)
        if (apiResult.result.Code == AppErrorCode.Success) {
          // 受講申請情報の更新
          setApplicationOfLecture(apiResult.data)
        }
      },
    )
  }, [])

  // 申請処理結果送信
  const postAcceptOfApplicationResult = (
    formInputData: AcceptOfApplicationResultPostFormData,
  ) => {
    console.log(formInputData)

    // 申請処理結果送信確認
    const result = confirm('受講申請処理結果を送信しますか？')
    if (!result) {
      return
    }

    const apiContext: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
    }
    // 受講申請処理結果送信
    UpdateApplicationOfLecture(
      apiContext,
      formInputData.applicationOfLecture,
    ).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        // 申請処理が成功した場合に対象生徒情報のIDに申請者IDをセットする。
        const updateStudent = applicationOfLecture.student
        updateStudent.user_id = applicationOfLecture.user_id
        UpdateStudent(apiContext, updateStudent).then((apiResult2) => {
          if (apiResult2.result.Code == AppErrorCode.Success) {
            alert("受講申請処理結果の送信に成功しました。")
            router.push('/lecture/applicationOfLecture/inbox')
          } else {
            alert("受講申請処理結果の送信に失敗しました。")
          }
        })
      }
    })
  }
  // #endregion Function

  // #region View
  // ページリンクリスト
  const breadcrumbList: { link: string; title: string }[] = []
  breadcrumbList[0] = { link: '/top', title: 'トップ' }
  breadcrumbList[1] = { link: '/lecture/me', title: '講義一覧' }
  breadcrumbList[2] = {
    link: '/lecture/applicationOfLecture/inbox',
    title: '受講申請一覧',
  }
  breadcrumbList[3] = {
    link: `/lecture/applicationOfLecture/accept/${router.query.id}`,
    title: '受講申請処理',
  }
  return (
    <Layout>
      <MainPartLayout
        subMenu={<LecturePageSubMenu />}
        breadcrumbList={breadcrumbList}
      >
        <Separator />
        <Box>
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              受講申請処理
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                投稿エリア
                <AcceptOfApplicationResultPostForm
                  applicationOfLecture={applicationOfLecture}
                  onPost={postAcceptOfApplicationResult}
                />
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
