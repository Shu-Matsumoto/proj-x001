/**
 * APIリクエストタイプ
 */
export enum ApiRequestType{
  GET,
  POST,
  PUT,
  DELETE,
}

/**
 * APIリクエストタイプの文字列化
 */
const convertApiRequestTypeToString = (apiType: ApiRequestType): string => {
  if (apiType == ApiRequestType.POST) {
    return "POST";
  } else if (apiType == ApiRequestType.PUT) {
    return "PUT";
  } else if (apiType == ApiRequestType.DELETE) {
    return "DELETE";
  } else {
    return "GET";
  }
}

// APIリクエストを行うfetch関数のラッパーメソッド
/**
 * @param resource 送信先パス
 * @param init 初期化オプション
 */
export const ApiRequestFetcher = async (
  resource: RequestInfo,
  type: ApiRequestType,
  params: any,
): Promise<any> => {
  let init: RequestInit = {
      method: convertApiRequestTypeToString(type),
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(params),
    }
  const res = await fetch(resource, init)
  const jsonData = await res.json();

  if (!res.ok) {
    return {
      code: res.status,
      message: jsonData.message ?? 'APIリクエスト中にエラーが発生しました',
      data: null
    };
  } else {
    return {
      code: res.status,
      message: jsonData.message,
      data: jsonData.data
    };
  }
}
