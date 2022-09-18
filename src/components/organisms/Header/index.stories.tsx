import { ComponentMeta } from '@storybook/react'
import React, { useEffect } from 'react'
import Header from './index'
import { AuthContextProvider } from 'contexts/AuthContext'

export default { title: 'organisms/Header' } as ComponentMeta<typeof Header>

export const NoLogin = () => <Header />

export const Login = () => {
  const authUser = {
    id: 1,
    username: 'dummy',
    password: 'password',
    displayName: 'Taketo Yoshida',
    email: 'test@example.com',
    profileImageUrl: '',
    description: '',
  }

  const ChildComponent = () => {
    return <Header />
  }

  return (
    <>
      <AuthContextProvider
        context={{ apiRootUrl: 'https://dummy' }}
        authUser={authUser}
      >
        <ChildComponent />
      </AuthContextProvider>
    </>
  )
}
