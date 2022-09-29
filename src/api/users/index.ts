import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator'
import { ApiRequestFetcher, ApiRequestType } from 'utils'

// ユーザー情報取得
export const GetUserInformation = async (
  context: UserTypes.ApiContext,
  user_id: number,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.User }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/${user_id}`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.User
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// ユーザーリスト取得
export const GetUserList = async (
  context: UserTypes.ApiContext,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.User[] }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.User[]
  } = await ApiRequestFetcher(address, ApiRequestType.GET, null)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// ユーザー情報更新
export const UpdateUserInformation = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.User,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.User }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/${
    postData.id
  }`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.User
  } = await ApiRequestFetcher(address, ApiRequestType.PUT, postData)
  //console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}

// ユーザープロフィール画像アップロード
export const UpdateUserProfileImage = async (
  context: UserTypes.ApiContext,
  user_id: number,
  postData: FormData,
): Promise<{ result: UserTypes.AppResult; data: UserTypes.User }> => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/image`
  const apiResult: {
    code: number
    message: string
    data: UserTypes.User
  } = await ApiRequestFetcher(
    address,
    ApiRequestType.POST,
    postData,
    'multipart/form-data',
  )
  console.log(apiResult)
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  }
}
