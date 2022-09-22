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
export type AuthUser = {
  // ユーザーID
  id: number
}
// AuthUser型デフォルトオブジェクト
export function GetDefaultAuthUser():AuthUser {
  let obj: AuthUser = {
    id: -1,
  }
  return obj;
}
// AuthUser型デフォルトオブジェクト
export function GetObj_AuthUser():AuthUser {
  let obj: AuthUser = {
    id: 0,
  }
  return obj;
}
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
// User型初期化オブジェクト
export function GetObj_User() {
  let obj: User = {
    id: 0,
    login_id: 0,
    password: "",
    user_name: "",
    email: "",
    image_path: "",
    self_introduction: "",
    credit_card_number: 0,
    financial_institution_id: 0,
    bank_number: 0,
  }
  return obj;
}

export enum UserSkillType{
  Nothing = 0,
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
// Skill型初期化オブジェクト
export function GetObj_Skill() {
  let obj: Skill = {
    id: 0,
    user_id: 0,
    skill_id: UserSkillType.Nothing
  }
  return obj;
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
// Lecture型初期化オブジェクト
export function GetObj_Lecture() {
  let obj: Lecture = {
    id: 0,
    user_id: 0,
    title: "",
    explanation: "",
  }
  return obj;
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
// Student型初期化オブジェクト
export function GetObj_Student() {
  let obj: Student = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    position: StudentPosition.Unknown,
    status: AttendanceStatus.Unknown,
    pay_amount: 0,
    goal: "",
    requirement: "",
    dev_env: ""
  }
  return obj;
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
// Teacher型初期化オブジェクト
export function GetObj_Teacher() {
  let obj: Teacher = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    type: StudentPosition.Unknown,
    pay_amount: 0,
  }
  return obj;
}
// 講義日程
export type LectureSchedule = {
  // 講義ID
  id: number;
  // 講義ID
  lecture_id: number;
  // 開始時刻 (format:yyyy-mm-dd HH:MM:SS)
  start_time: string;
  // 終了時刻 (format:yyyy-mm-dd HH:MM:SS)
  end_time: string;
  // MTG URL
  url: string;
  // ミーティングID
  meeting_id: string;
  // パスコード
  passcord: string;
}
// LectureSchedule型初期化オブジェクト
export function GetObj_LectureSchedule() {
  let obj: LectureSchedule = {
    id: 0,
    lecture_id: 0,
    start_time: "1900-01-01 00:00:00",
    end_time: "1900-01-01 00:00:00",
    url: "",
    meeting_id: "",
    passcord: "",
  }
  return obj;
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
// TeachingMaterial型初期化オブジェクト
export function GetObj_TeachingMaterial() {
  let obj: TeachingMaterial = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    title: "",
    explanation: "",
    path: "",
  }
  return obj;
}
/**
 * 申請ステータス
 */
export enum ApplicationStatus{
  // 不定
  Unknown = 0,
  // 待機中
  Waiting = 1,
  // 許可
  Accept = 2,
  // 却下
  Reject = 3,
}
/**
 * 申請ステータス(文字列)
 */
export enum ApplicationStatusString{
  // 不定
  Unknown = "Unknown",
  // 待機中
  Waiting = "Waiting",
  // 許可
  Accept = "Accept",
  // 却下
  Reject = "Reject",
}
// 文字列の数値化
export function ConvertToNumberApplicationStatus(status: string) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == ApplicationStatusString.Accept) {
    return ApplicationStatus.Accept;
  } else if (status == ApplicationStatusString.Reject) {
    return ApplicationStatus.Reject;
  } else if (status == ApplicationStatusString.Waiting) {
    return ApplicationStatus.Waiting;
  } else {
    return ApplicationStatus.Unknown;
  }
}
// 数値の文字列化
export function ConvertToStringApplicationStatus(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == ApplicationStatus.Accept) {
    return ApplicationStatusString.Accept;
  } else if (status == ApplicationStatus.Reject) {
    return ApplicationStatusString.Reject;
  } else if (status == ApplicationStatus.Waiting) {
    return ApplicationStatusString.Waiting;
  } else {
    return ApplicationStatusString.Unknown;
  }
}
// 受講申請
export type ApplicationOfLecture = {
  // 申請ID
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
// ApplicationOfLecture型初期化オブジェクト
export function GetObj_ApplicationOfLecture() {
  let obj: ApplicationOfLecture = {
    id: 0,
    user_id: 0,
    student_id: 0,
    status: ApplicationStatus.Waiting,
    motivation: "",
  }
  return obj;
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
// TeamChat型初期化オブジェクト
export function GetObj_TeamChat() {
  let obj: TeamChat = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    comment: "",
  }
  return obj;
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

// 受講申請データ(詳細版)
export type ApplicationOfLectureWithOptionData = {
   // 申請ID
  id: number;
  // ユーザーID
  user_id: number;
  // 生徒ID
  student_id: number;
  // 申請ステータス
  status: ApplicationStatus;
  // 受講動機
  motivation: string;
  // ユーザー情報
  user: User;
  // 生徒情報
  student: Student;
  // 講義情報
  lecture: Lecture;
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
