import { render, screen, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { SexType } from '../../../types/data'
import Header from '.'
import { AuthContextProvider } from 'contexts/AuthContext'
import { theme } from 'themes'
import type { User } from 'types'

// ダミーユーザー
const authUser: User = {
  id: 1,
  username: 'dummy',
  password: 'password',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  dateOfBirth: new Date(),
  sex: SexType.Man,
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
  SnsGithubLink: '',
}

describe('Header', () => {
  let renderResult: RenderResult
  it('カートに商品が存在する', async () => {
    renderResult = render(
      <ThemeProvider theme={theme}>
        <AuthContextProvider
          authUser={authUser}
          context={{ apiRootUrl: 'https://dummy' }}
        >
          <Header />
        </AuthContextProvider>
      </ThemeProvider>,
    )

    // カートに入っている（バッジが出てる）
    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0)

    renderResult.unmount()
  })

  it('未サインイン', async () => {
    renderResult = render(
      <ThemeProvider theme={theme}>
        <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
          <Header />
        </AuthContextProvider>
      </ThemeProvider>,
    )

    // サインインしていない
    expect(screen.queryByTestId('profile-shape-image')).toBeNull()

    // カートが空
    expect(screen.queryByTestId('badge-wrapper')).toBeNull()

    renderResult.unmount()
  })
})
