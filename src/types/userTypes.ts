// #region Error code
/** 
 * エラーコード
*/
export enum AppErrorCode{
  Success = 0,
	Error = 1,
}

/** 
 * エラーサブコード
*/
export enum AppErrorSubCode{
  None = 0,
  Error = 1,
  DuplicateUser = 2, // ユーザ重複
  UserLoginFail = 3, // ユーザログイン失敗
  NotFoundUserData = 4, // ユーザーデータなし
}

/**
 * 処理実行結果格納クラス
 */
export class AppResult{
  // エラーコード
  public Code: AppErrorCode;
  // サブコード
  public SubCode: AppErrorSubCode;
  // コンストラクタ
  constructor() {
    this.Code = AppErrorCode.Success;
    this.SubCode = AppErrorSubCode.None;
  }
}
// #endregion Error Code

// #region User
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

// #region App types
// ユーザー
export type User = {
  // ユーザーID
  id: number
  // ログインID
  login_id: number
  // ログインパスワード
  password: string
  // ユーザー名
  user_name: string
  // メールアドレス
  email: string
  // プロフィール画像パス
  image_path: string
  // 自己紹介文
  self_introduction: string
  // クレジットカード番号
  credit_card_number: number
  // 金融機関ID
  financial_institution_id: number
  // 銀行口座番号
  bank_number: number
}

export enum UserSkillType{
  PHP = 1,
  JavaScript = 2,
}

// ユーザースキル
export type Skill = {
  // ID
  id: number;
  // ユーザーID
  user_id: number;
  // スキルID
  skill_id: UserSkillType;
}
// 授業
export type Lecture = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 講義タイトル
  title: string;
  // 講義説明
  explanation: string;
}
// 生徒役割
export enum StudentPosition {
  Unknown = 0,
  Leader = 1,
  Frontend = 2,
  Backend = 3,
  Design = 4,
}

// 受講ステータス
export enum AttendanceStatus {
  Unknown = 0,
  Waiting = 1,
  OnGoing = 2,
  Done = 3,
  Retired = 4,
}

// 生徒
export type Student = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 講義ID
  lecture_id: number;
  // 参加役割
  position: StudentPosition;
  // 受講ステータス
  status: AttendanceStatus;
  // 支払い金額
  pay_amount: number;
  // 目標到達レベル
  goal: string;
  // 参加必要条件
  requirement: string;
  // 必要開発環境
  dev_env: string;
}
// 講師
export type Teacher = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 講義ID
  lecture_id: number;
  // 担当役割
  type: StudentPosition;
  // 報酬金額
  pay_amount: number;
}
// 講義日程
export type LectureSchedule = {
  // 講義ID
  id: number;
  // 講義ID
  lecture_id: number;
  // 開始時刻
  start_time: Date;
  // 終了時刻
  end_time: Date;
  // MTG URL
  url: string;
  // ミーティングID
  meeting_id: string;
  // パスコード
  passcord: string;
}
// 教材
export type TeachingMaterial = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 講義ID
  lecture_id: number;
  // タイトル
  title: string;
  // 説明
  explanation: string;
  // 保存先パス
  path: string;
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
// 受講申請
export type ApplicationOfLecture = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 生徒ID
  student_id: number;
  // 申請ステータス
  status: ApplicationStatus;
  // 受講動機
  motivation: string;
}
// チーム内チャット
export type TeamChat = {
  // 講義ID
  id: number;
  // ユーザーID
  user_id: number;
  // 講義ID
  lecture_id: number;
  // コメント
  comment: string;
}

// 講義データ
export class LectureWithOptionData {

  // 講義
  public lecture: Lecture;
  public students: Student[];
  public teachers: Teacher[];
  public schedules: LectureSchedule[];
  public materials: TeachingMaterial[];

  constructor() {
    this.lecture = {
      id: 0,
      user_id: 0,
      title: "",
      explanation: "",
    };
    this.students = new Array();
    this.teachers = new Array();
    this.schedules = new Array();
    this.materials = new Array();
  }
}
// #endregion App types

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
