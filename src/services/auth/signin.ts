// typesは後ほど定義
import { ApiContext, User } from 'types'
// 先ほど定義したsrc/utils/index.tsから読み込み
import { fetcher } from 'utils'

export type SigninParams = {
  /**
   * ユーザー名
   * サンプルユーザーのユーザー名は "user"
   */
  username: string
  /**
   * パスワード
   * サンプルユーザーのパスワードは "password"
   */
  password: string
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams,
): Promise<User> => {
  return new Promise((resolve) => {
    const user: User = {
      id: 1,
      username: "taketo",
      displayName: "Taketo Yoshida",
      email: "taketo@example.com",
      profileImageUrl: "/users/1.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    };
    resolve(user);
  });
  // return await fetcher(
  //   `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(params),
  //   },
  // )
}

export default signin
