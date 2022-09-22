import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator';
import { ApiRequestFetcher, ApiRequestType } from 'utils'

// 受講申請新規追加
export const AddApplicationOfLecture = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.ApplicationOfLecture,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.ApplicationOfLecture } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/application_of_lectures`;
  const apiResult: { code: number, message: string, data: UserTypes.ApplicationOfLecture } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

// 受講申請一覧取得
export const GetMyApplicationOfLectures = async (
  context: UserTypes.ApiContext,
  user_id: number,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.ApplicationOfLecture[] } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/application_of_lectures`;
  const apiResult: { code: number, message: string, data: UserTypes.ApplicationOfLecture[] } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

// 受講申請受信ボックスの申請リスト取得
export const GetMyApplyBoxList = async (
  context: UserTypes.ApiContext,
  user_id: number,
  postData: any
): Promise<{ result: UserTypes.AppResult, data: UserTypes.ApplicationOfLectureWithOptionData[] } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/applybox`;
  console.log(postData);
  const apiResult: { code: number, message: string, data: UserTypes.ApplicationOfLectureWithOptionData[] } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}