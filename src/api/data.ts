// #region API Error code
/** 
 * API レスポンスコード
*/
export enum ApiResponseCode{
  OK = 200,
  // リクエスト不正
  BadRequest = 400,
  // 認証が必要
  Unauthorized = 401,
  // アクセス禁止
  Forbidden = 403,
  // ページが見つからない
  NotFound = 404,
  // リクエストが不正
  Gone = 410,
  // サーバー内エラー
  InternalServerError = 500,
  // サーバー利用不可
  ServiceUnavailable = 503,
}
// #endregion API Error code