import Link from 'next/link'
import styled from 'styled-components'
import AppLogo from 'components/atoms/AppLogo'
import {
  PersonIcon,
} from 'components/atoms/IconButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Spinner from 'components/atoms/Spinner'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import { useAuthContext } from 'contexts/AuthContext'

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
  const { authUser, isLoading } = useAuthContext()

  return (
    <HeaderRoot>
      <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref>
              <Anchor as="a">
                <AppLogo />
              </Anchor>
            </Link>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            {(() => {
              // 認証していたらアイコンを表示
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <ShapeImage
                        shape="circle"
                        src={authUser.profileImageUrl}
                        width={24}
                        height={24}
                        data-testid="profile-shape-image"
                      />
                    </Anchor>
                  </Link>
                )
              } else if (isLoading) {
                // ロード中はスピナーを表示
                return <Spinner size={20} strokeWidth={2} />
              } else {
                // サインインしてない場合はアイコンを表示
                return (
                  <Link href="/" passHref>
                    <Anchor as="a">
                      <PersonIcon size={24} />
                    </Anchor>
                  </Link>
                )
              }
            })()}
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  )
}

export default Header