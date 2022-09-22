// typesは後ほど定義
import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator';
import { ApiRequestFetcher, ChangeToInvalidApiAuth, ApiRequestType } from 'utils'


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
 * 外部API認証結果
 */
type AuthResult = {
  token_type: string
  expires_in: string
  access_token: string
  refresh_token: string
}

// /**
//  * 認証API（サインイン）
//  * @param context APIコンテキスト
//  * @param params パラメータ
//  * @returns ログインユーザー
//  */
// export const signin = async (
//   context: UserTypes.ApiContext,
//   params: SigninParams,
// ): Promise<UserTypes.User> => {

//   let address = context.apiRootUrl.replace('api', '');
//   address = `${address.replace(/\/$/g, '')}/oauth/token`;
//   // }
//   const postObject = {
//     grant_type: "client_credentials",
//     client_id: process.env.NEXT_PUBLIC_API_CLIENT_USER_ID,
//     client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
//     username: params.username,
//     password: params.password,
//     scope: "*"
//   }
//   console.log(address);
//   console.log(postObject);

//   try {
//     const apiResult: { data: any} =
//       await ApiRequestFetcher(address, ApiRequestType.POST, postObject, true);
//     console.log(apiResult);
//   } catch (e) {
//     console.log(e);
//     ChangeToInvalidApiAuth();
//     return false;
//   }
//   return true;
// }

export const signin = async (
  context: UserTypes.ApiContext,
  params: SigninParams,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.User } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/signin`;
  const apiResult: { code: number, message: string, data: UserTypes.User } =
    await ApiRequestFetcher(address, ApiRequestType.POST, params);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}
