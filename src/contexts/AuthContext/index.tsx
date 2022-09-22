import React, { useContext, useState, useEffect } from 'react'
import { AuthUser, GetDefaultAuthUser } from '../../types/userTypes'

// 認証情報データ型
type AuthContextType = {
	// ログイン状態
	isloggdIn: boolean
	// ログインユーザー
	authUser: AuthUser
	// ログインユーザーセット関数
	setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>
}

// 認証情報コンテクスト
const AuthContext = React.createContext<AuthContextType>({
	isloggdIn: false,
  authUser: GetDefaultAuthUser(),
  setAuthUser: () => { }
})

// 認証情報コンテクストのI/F
export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext)

// ローカルストレージ上のキー名
const LocalStarageKeyName: string = "formartion-app-auth-info";

/**
 * 認証情報をローカルストレージから取得
 * @returns
 */
function getAuthInfoToLocalStorage(): AuthUser {
	// localStorageから指定キーのオブジェクト取得
	const defaultAuthInfo = localStorage.getItem(LocalStarageKeyName);
	if (defaultAuthInfo) {
		return JSON.parse(defaultAuthInfo) as AuthUser;
	} else {
		// Localstrageに存在しない場合は未認証ユーザーをリターン
		let unAuthUser = GetDefaultAuthUser();
		unAuthUser.id = -1;
		return unAuthUser;
	}
}
/**
 * 認証情報をローカルストレージに追加
 * @param authInfo
 */
function setAuthInfoToLocalStorage(authInfo: AuthUser): void {
	const authInfoStringfy = JSON.stringify(authInfo);
	localStorage.setItem(LocalStarageKeyName, authInfoStringfy);
}

/**
 * 認証情報をローカルストレージから削除
 */
function clearAuthInfoInLocalStorage(): void {
	localStorage.removeItem(LocalStarageKeyName);
}

interface AuthContextProviderProps {
  children?: React.ReactNode
}

/**
 * 認証コンテキストプロバイダー
 * @param params パラメータ
 */
export const AuthContextProvider = ({
  children,
}: AuthContextProviderProps) => {

	// #region Fields
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<AuthUser>(GetDefaultAuthUser());
	// #endregion Fields

	// 初回のみの実行
	useEffect(() => {
		setUserInfo(getAuthInfoToLocalStorage());
	}, []);

	// #region Functions
	useEffect(() => {
    // userInfoに正しく値がセットされているかどうかをチェック
    if (userInfo.id > 0) {
      setAuthInfoToLocalStorage(userInfo);
      setLoggedIn(true);
		} else {
			// これは実施しない。ブラウザをリロードしてしまうとこの分岐にはいってキー削除されてしまうため。
			//clearAuthInfoInLocalStorage();
      setLoggedIn(false);
    }
  }, [userInfo]);
	// #endregion Functions

  return (
    <AuthContext.Provider
      value={{
        isloggdIn: loggedIn,
				authUser: userInfo,
        setAuthUser: setUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
