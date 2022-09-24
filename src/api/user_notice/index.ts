import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator';
import { ApiRequestFetcher, ApiRequestType} from 'utils'

// ユーザー通知取得
export const GetMyUserNotices = async (
  context: UserTypes.ApiContext,
  user_id: number,
  conditions: string[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.UserNotice[] } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/user_notices`;
  const apiResult: { code: number, message: string, data: UserTypes.UserNotice[] } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

// ユーザー通知更新
export const UpdateUserNotice = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.UserNotice,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.UserNotice } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/user_notices/${postData.id}`;
  const apiResult: { code: number, message: string, data: UserTypes.UserNotice } =
    await ApiRequestFetcher(address, ApiRequestType.PUT, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}