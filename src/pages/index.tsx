import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuthContext } from '../contexts/AuthContext'
import { AuthUser } from '../types/userTypes'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Footer from 'components/organisms/Footer'
import SigninFormContainer from 'containers/SigninFormContainer'

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const SigninPage: NextPage = () => {
  // ルーター
  const router = useRouter()
  // 認証情報コンテクスト
  const { setAuthUser } = useAuthContext()

  // 認証後のイベントハンドラ
  const handleSignin = async (user: AuthUser, err?: Error) => {
    // 認証情報コンテキストI/Fを経由して認証済みユーザをセット
    setAuthUser(user)
    // console.log("auth user is ...");
    // console.log(user);

    if (!err) {
      // サインインに成功し、クエリが指定されている場合はそのURLに移動。
      // デフォルトはトップページに移動。
      const redurectTo = (router.query['redirect_to'] as string) ?? '/top'

      console.log('Redirecting', redurectTo)
      await router.push(redurectTo)
    }
  }

  return (
    <>
      <Box paddingTop={2} paddingLeft={2}>
        <Anchor as="a">
          <Text
            variant="extraLarge"
            fontWeight="bold"
            backgroundColor="#333333"
            color="white"
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            formation
          </Text>
        </Anchor>
      </Box>
      <Separator />
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
        height={'570px'}
        style={{
          backgroundImage: `url(${'/common/app_title.png'})`,
          backgroundSize: 'cover',
        }}
      >
        <Flex
          width="400px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%">
            {/*
                サインインフォームコンテナ
                SigninFormのユーザー名・パスワードから認証APIを呼び出し、
                onSigninコールバックが呼び出される
              */}
            <SigninFormContainer onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
      <Separator />
      <Box>
        <Footer />
      </Box>
    </>
  )
}

export default SigninPage
