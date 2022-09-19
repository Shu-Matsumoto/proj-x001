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
  let init: RequestInit;
  if (params != null) {
    init = {
      method: convertApiRequestTypeToString(type),
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(params),
    }
  } else {
    init = {
      method: convertApiRequestTypeToString(type),
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
      }
    }
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

/**
 * 日時データの文字列化(2022-09-19 12:34:56)
 */
export function ToDatetimeString(datetime: Date): string {
  const year = datetime.getFullYear();
  const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  const day = ("0" + datetime.getDate()).slice(-2);
  const hour = ("0" + datetime.getHours()).slice(-2);
  const minutes = ("0" + datetime.getMinutes()).slice(-2);
  const seconds = ("0" + datetime.getSeconds()).slice(-2);
  return year + "-" + month + "-" + day + " "+ hour + ":" + minutes + ":" + seconds;
}