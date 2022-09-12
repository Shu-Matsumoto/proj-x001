// #region User
export enum SexType{
  Man = 0,
  Woman = 1,
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
 * 講義情報
 */
export type LectureInformation = {
  id: number
  userId: number
  title: string
  state: LectureStatus
  recruitmentNumber: number
  NumberOfStudents: number
} 

export type AttendanceList = {

}

export type LectureList = {
  
}

export type FollowerList = {
  
}

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
