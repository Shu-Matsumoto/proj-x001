import { signin, SigninParams } from '../api/auth/signin'
import { ApiContext, AuthUser, AppErrorCode } from '../types/userTypes'
import SigninForm from 'components/organisms/SigninForm'
import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext'

interface SigninFormContainerProps {
  /**
   * サインインした時に呼ばれるイベントハンドラ
   */
  onSignin: (user: AuthUser, error?: Error) => void
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)
      const targetUser: SigninParams = {
        username: username,
        password: password,
      }

      const apiContext: ApiContext = {
        apiRootUrl:
          process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
      }
      await signin(apiContext, targetUser).then((apiResult) => {
        if (apiResult.result.Code == AppErrorCode.Success) {
          const loggedInUser: AuthUser = {
            id: apiResult.data.id,
          }
          // console.log("loggedInUser user is ...");
          // console.log(loggedInUser);
          onSignin && onSignin(loggedInUser)
        } else {
          const unAuthUser: AuthUser = {
            id: -1,
          }
          const err = { cause: 'signin failed.' }
          if (err instanceof Error) {
            // エラーの内容を表示
            window.alert(err.message)
            onSignin && onSignin(unAuthUser, err)
          }
        }
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message)
        const unAuthUser: AuthUser = {
          id: -1,
        }
        onSignin && onSignin(unAuthUser, err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer
