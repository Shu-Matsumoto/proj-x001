import { ComponentMeta } from '@storybook/react'
import React from 'react'
import Header from './index'
import { AuthContextProvider } from 'contexts/AuthContext'

export default { title: 'organisms/Header' } as ComponentMeta<typeof Header>

export const NoLogin = () => <Header />

export const Login = () => {
  const ChildComponent = () => {
    return <Header />
  }

  return (
    <>
      <AuthContextProvider>
        <ChildComponent />
      </AuthContextProvider>
    </>
  )
}
