import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { useAuthContext } from 'contexts/AuthContext'
import { GetUrlOfImageFileInDataServer } from 'utils'

// ヘッダーのルート
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

// ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`

// ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

/**
 * ヘッダー
 */
const Header = () => {
  // #region Fields
  const router = useRouter()
  const { authUser, isloggdIn } = useAuthContext()
  // #endregion Fields

  // #region Functions
  // 初回のみの実行
  useLayoutEffect(() => {
    if (!authUser || authUser.id <= 0 || !isloggdIn) {
      //router.push('/')
    }
  }, [])

  // ログアウトボタンクリック時の確認
  function confirmLogout(): void {
    const result = confirm('ログアウトしますか？')
    if (result) {
      // ログイン画面へ遷移
      router.push('/')
    }
  }
  // #endregion Functions

  return (
    <HeaderRoot>
      <div>
        <Flex paddingLeft={1} paddingRight={3} justifyContent="space-between">
          <Nav as="nav" height="56px" alignItems="center" marginLeft={2}>
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
            {/*トップ*/}
            <NavLink>
              <Box display={{ base: 'none', md: 'block' }}>
                <Link href="/top" passHref>
                  <Anchor as="a">
                    <Text
                      variant="mediumLarge"
                      fontWeight="bold"
                      style={{ textDecoration: 'underline' }}
                    >
                      トップ
                    </Text>
                  </Anchor>
                </Link>
              </Box>
            </NavLink>
            {/*受講*/}
            <NavLink>
              <Box display={{ base: 'none', md: 'block' }}>
                <Link href="/attendance/me" passHref>
                  <Anchor as="a">
                    <Text
                      variant="mediumLarge"
                      fontWeight="bold"
                      style={{ textDecoration: 'underline' }}
                    >
                      受講
                    </Text>
                  </Anchor>
                </Link>
              </Box>
            </NavLink>
            {/*講義*/}
            <NavLink>
              <Box display={{ base: 'none', md: 'block' }}>
                <Link href="/lecture/newpost" passHref>
                  <Anchor as="a">
                    <Text
                      variant="mediumLarge"
                      fontWeight="bold"
                      style={{ textDecoration: 'underline' }}
                    >
                      講義
                    </Text>
                  </Anchor>
                </Link>
              </Box>
            </NavLink>
          </Nav>
          <Nav as="nav" height="56px" alignItems="center">
            <NavLink>
              {(() => {
                // 認証していたらアイコンを表示
                if (authUser && authUser.id > 0) {
                  if (
                    authUser.profile_image_path !== null &&
                    authUser.profile_image_path !== ''
                  ) {
                    return (
                      <>
                        <Link href={`/users/${authUser.id}`} passHref>
                          <Anchor as="a">
                            <ShapeImage
                              shape="circle"
                              //src="/users/1.png" //for DBG
                              src={GetUrlOfImageFileInDataServer(
                                authUser.profile_image_path,
                              )}
                              width={48}
                              height={48}
                              data-testid="profile-shape-image"
                            />
                          </Anchor>
                        </Link>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <Link href={`/users/${authUser.id}`} passHref>
                          <Anchor as="a">
                            <PersonIcon size={24} />
                          </Anchor>
                        </Link>
                      </>
                    )
                  }
                }
              })()}
            </NavLink>
            <NavLink>
              {(() => {
                // 認証していたらログアウトボタンを表示
                if (authUser && authUser.id > 0) {
                  return (
                    <Flex
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      alignContent={'center'}
                    >
                      <Link href={`/users/${authUser.id}`} passHref>
                        <Text variant="small" marginBottom={1}>
                          {authUser.user_name}
                        </Text>
                      </Link>
                      <Button onClick={confirmLogout}>Logout</Button>
                    </Flex>
                  )
                }
              })()}
            </NavLink>
          </Nav>
        </Flex>
      </div>
    </HeaderRoot>
  )
}

export default Header
