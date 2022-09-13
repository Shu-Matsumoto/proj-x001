// #region User
/**
 * 性別
 */
export enum SexType{
  Man = 0,
  Woman = 1,
}

/**
 * 申請ステータス
 */
export enum ApplicationStatus{
  // 待機中
  Waiting = 0,
  // 許可
  Permission = 1,
  // 却下
  Rejected = 2,
}

/**
 * 講義ステータス
 */
export enum LectureStatus{
  Pending = 0,    // ペンディング
  Recruiting = 1, // 募集中
  Waiting = 2,    // 開始待ち(メンバー募集締切)
  InProgress = 3, // 進行中
  Finish = 4,     // 終了
}

// ユーザー
export type User = {
  id: number
  username: string
  password: string
  displayName: string
  email: string
  dateOfBirth: Date
  sex: SexType
  profileImageUrl: string
  description: string
  SnsGithubLink: string
}

/**
 * ユーザプロフィール上のタグ(PHP, Laravel)
 */
export type UserHasTag = {
  tags: string[]
}

/**
 * 講義情報(ベーシック)
 */
export class LectureBasicInformation{
  // 講義ID
  public Id: number = 0;
  // 講師ID
  public TeacherId: number = 0;
  // 講義タイトル
  public Title: string = "";
  // 講師名
  public TeacherName: string = "";
  // 講師プロフィール画像URL
  public TeacherProfileImageURL: string = "";
  // 講義ステータス
  public State: LectureStatus = LectureStatus.Pending;
  // 定員(募集人数)
  public Capacity: number = 0;
  // 受講者数
  public NumberOfStudents: number = 0;
}
/**
 * 講義情報(詳細)
 */
export class LectureDetailInformation{
  // 講義ID
  public Id: number = 0;
  // 講義の説明
  public Explanation: string = "";
} 

/**
 * 受講リスト
 */
export type AttendanceList = {

}
/**
 * 講義リスト
 */
export type LectureList = {
  
}
/**
 * フォロワーリスト
 */
export type FollowerList = {
  
}

/**
 * フォローリスト
 */
export type FollowList = {
  
}
// #endregion User

// #region API
// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
// #endregion API

// #region Component
/**
 * リンク情報を固めたもの
 */
export type LinkInformationSet = {
  dispaleyName: string,
  pageLink: string
}

// #endregion Component
