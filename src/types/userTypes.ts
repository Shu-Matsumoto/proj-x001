// #region Error code
/**
 * エラーコード
 */
export enum AppErrorCode {
  Success = 0,
  Error = 1,
}

/**
 * エラーサブコード
 */
export enum AppErrorSubCode {
  None = 0,
  Error = 1,
  DuplicateUser = 2, // ユーザ重複
  UserLoginFail = 3, // ユーザログイン失敗
  NotFoundUserData = 4, // ユーザーデータなし
}

/**
 * 処理実行結果格納クラス
 */
export class AppResult {
  // エラーコード
  public Code: AppErrorCode
  // サブコード
  public SubCode: AppErrorSubCode
  // コンストラクタ
  constructor() {
    this.Code = AppErrorCode.Success
    this.SubCode = AppErrorSubCode.None
  }
}
// #endregion Error Code

// #region User
/**
 * 講義ステータス
 */
export enum LectureStatus {
  Pending = 0, // ペンディング
  Recruiting = 1, // 募集中
  Waiting = 2, // 開始待ち(メンバー募集締切)
  InProgress = 3, // 進行中
  Finish = 4, // 終了
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
export class LectureBasicInformation {
  // 講義ID
  public Id = 0
  // 講師ID
  public TeacherId = 0
  // 講義タイトル
  public Title = ''
  // 講師名
  public TeacherName = ''
  // 講師プロフィール画像URL
  public TeacherProfileImageURL = ''
  // 講義ステータス
  public State: LectureStatus = LectureStatus.Pending
  // 定員(募集人数)
  public Capacity = 0
  // 受講者数
  public NumberOfStudents = 0
}
/**
 * 講義情報(詳細)
 */
export class LectureDetailInformation {
  // 講義ID
  public Id = 0
  // 講義の説明
  public Explanation = ''
}
// #endregion User

// #region App types
export type AuthUser = {
  // ユーザーID
  id: number
  // ログインユーザー名
  user_name: string
  // プロフィール画像パス
  profile_image_path: string
}
// AuthUser型デフォルトオブジェクト
export function GetDefaultAuthUser(): AuthUser {
  const obj: AuthUser = {
    id: -1,
    user_name: 'anonymous',
    profile_image_path: '',
  }
  return obj
}
// AuthUser型デフォルトオブジェクト
export function GetObj_AuthUser(): AuthUser {
  const obj: AuthUser = {
    id: 0,
    user_name: 'anonymous',
    profile_image_path: '',
  }
  return obj
}
// ユーザー
export type User = {
  // ユーザーID
  id: number
  // ログインID
  login_id: string
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
  credit_card_number: string
  // 金融機関ID
  financial_institution_id: string
  // 銀行口座番号
  bank_number: string
}
// User型初期化オブジェクト
export function GetObj_User() {
  const obj: User = {
    id: 0,
    login_id: '',
    password: '',
    user_name: 'anonymous',
    email: 'sample@sample.com',
    image_path: '',
    self_introduction: 'nothing',
    credit_card_number: '',
    financial_institution_id: '',
    bank_number: '',
  }
  return obj
}

// User型初期化オブジェクト
export function GetCopyObj_User(src: User) {
  if (!src) {
    return null
  }

  const obj: User = {
    id: src.id,
    login_id: src.login_id,
    password: src.password,
    user_name: src.user_name,
    email: src.email,
    image_path: src.image_path,
    self_introduction: src.self_introduction,
    credit_card_number: src.credit_card_number,
    financial_institution_id: src.financial_institution_id,
    bank_number: src.bank_number,
  }
  return obj
}

export enum UserSkillType {
  Nothing = 0,
  PHP = 1,
  JavaScript = 2,
}

// ユーザースキル
export type Skill = {
  // ID
  id: number
  // ユーザーID
  user_id: number
  // スキルID
  skill_id: UserSkillType
}
// Skill型初期化オブジェクト
export function GetObj_Skill() {
  const obj: Skill = {
    id: 0,
    user_id: 0,
    skill_id: UserSkillType.Nothing,
  }
  return obj
}

// 授業
export type Lecture = {
  // 講義ID
  id: number
  // ユーザーID
  user_id: number
  // 講義タイトル
  title: string
  // 講義説明
  explanation: string
}
// Lecture型初期化オブジェクト
export function GetObj_Lecture() {
  const obj: Lecture = {
    id: 0,
    user_id: 0,
    title: '',
    explanation: '',
  }
  return obj
}
// Lecture型とUser型のセット
export type LectureWithUser = {
  lecture: Lecture
  user: User
}

// 生徒役割
export enum StudentPosition {
  Unknown = 0,
  Leader = 1,
  Frontend = 2,
  Backend = 3,
  Design = 4,
}
/**
 * 申請ステータス(文字列)
 */
export enum StudentPositionString {
  Unknown = 'Unknown',
  Leader = 'リーダー',
  Frontend = 'フロントエンドエンジニア',
  Backend = 'バックサイドエンジニア',
  Design = 'デザインエンジニア',
}
// 文字列の数値化
export function ConvertToNumberStudentPosition(status: string) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == StudentPositionString.Leader) {
    return StudentPosition.Leader
  } else if (status == StudentPositionString.Frontend) {
    return StudentPosition.Frontend
  } else if (status == StudentPositionString.Backend) {
    return StudentPosition.Backend
  } else if (status == StudentPositionString.Design) {
    return StudentPosition.Design
  } else {
    return StudentPosition.Unknown
  }
}
// 数値の文字列化
export function ConvertToStringStudentPosition(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == StudentPosition.Leader) {
    return StudentPositionString.Leader
  } else if (status == StudentPosition.Frontend) {
    return StudentPositionString.Frontend
  } else if (status == StudentPosition.Backend) {
    return StudentPositionString.Backend
  } else if (status == StudentPosition.Design) {
    return StudentPositionString.Design
  } else {
    return StudentPositionString.Unknown
  }
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
  id: number
  // ユーザーID
  user_id: number
  // 講義ID
  lecture_id: number
  // 参加役割
  position: StudentPosition
  // 受講ステータス
  status: AttendanceStatus
  // 支払い金額
  pay_amount: number
  // 目標到達レベル
  goal: string
  // 参加必要条件
  requirement: string
  // 必要開発環境
  dev_env: string
}
// Student型初期化オブジェクト
export function GetObj_Student() {
  const obj: Student = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    position: StudentPosition.Unknown,
    status: AttendanceStatus.Unknown,
    pay_amount: 0,
    goal: '',
    requirement: '',
    dev_env: '',
  }
  return obj
}
// Teacher型オブジェクトコピー
export function GetCopyObj_Student(src: Student) {
  const obj: Student = {
    id: src.id,
    user_id: src.user_id,
    lecture_id: src.lecture_id,
    position: src.position,
    status: src.status,
    pay_amount: src.pay_amount,
    goal: src.goal,
    requirement: src.requirement,
    dev_env: src.dev_env,
  }
  return obj
}
// Student型とUser型のセット
export type StudentWithUser = {
  student: Student
  user: User
}

// 講師
export type Teacher = {
  // 講義ID
  id: number
  // ユーザーID
  user_id: number
  // 講義ID
  lecture_id: number
  // 担当役割
  type: StudentPosition
  // 報酬金額
  pay_amount: number
}
// Teacher型初期化オブジェクト
export function GetObj_Teacher() {
  const obj: Teacher = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    type: StudentPosition.Unknown,
    pay_amount: 0,
  }
  return obj
}
// Teacher型オブジェクトコピー
export function GetCopyObj_Teacher(src: Teacher) {
  const obj: Teacher = {
    id: src.id,
    user_id: src.user_id,
    lecture_id: src.lecture_id,
    type: src.type,
    pay_amount: src.pay_amount,
  }
  return obj
}
// Teacher型とUser型のセット
export type TeacherWithUser = {
  teacher: Teacher
  user: User
}
// 講義日程
export type LectureSchedule = {
  // 講義ID
  id: number
  // 講義ID
  lecture_id: number
  // 開始時刻 (format:yyyy-mm-dd HH:MM:SS)
  start_time: string
  // 終了時刻 (format:yyyy-mm-dd HH:MM:SS)
  end_time: string
  // MTG URL
  url: string
  // ミーティングID
  meeting_id: string
  // パスコード
  passcord: string
}
// LectureSchedule型初期化オブジェクト
export function GetObj_LectureSchedule() {
  const obj: LectureSchedule = {
    id: 0,
    lecture_id: 0,
    start_time: '1900-01-01 00:00:00',
    end_time: '1900-01-01 00:00:00',
    url: '',
    meeting_id: '',
    passcord: '',
  }
  return obj
}
// 教材
export type TeachingMaterial = {
  // 講義ID
  id: number
  // ユーザーID
  user_id: number
  // 講義ID
  lecture_id: number
  // タイトル
  title: string
  // 説明
  explanation: string
  // 保存先パス
  path: string
}
// TeachingMaterial型初期化オブジェクト
export function GetObj_TeachingMaterial() {
  const obj: TeachingMaterial = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    title: '',
    explanation: '',
    path: '',
  }
  return obj
}
/**
 * 申請ステータス
 */
export enum ApplicationStatus {
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
export enum ApplicationStatusString {
  // 不定
  Unknown = 'Unknown',
  // 待機中
  Waiting = 'Waiting',
  // 許可
  Accept = 'Accept',
  // 却下
  Reject = 'Reject',
}
// 文字列の数値化
export function ConvertToNumberApplicationStatus(status: string) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == ApplicationStatusString.Accept) {
    return ApplicationStatus.Accept
  } else if (status == ApplicationStatusString.Reject) {
    return ApplicationStatus.Reject
  } else if (status == ApplicationStatusString.Waiting) {
    return ApplicationStatus.Waiting
  } else {
    return ApplicationStatus.Unknown
  }
}
// 数値の文字列化
export function ConvertToStringApplicationStatus(status: number) {
  // TODO：if使わずにスマートに書き換えたい
  if (status == ApplicationStatus.Accept) {
    return ApplicationStatusString.Accept
  } else if (status == ApplicationStatus.Reject) {
    return ApplicationStatusString.Reject
  } else if (status == ApplicationStatus.Waiting) {
    return ApplicationStatusString.Waiting
  } else {
    return ApplicationStatusString.Unknown
  }
}
// 受講申請
export type ApplicationOfLecture = {
  // 申請ID
  id: number
  // ユーザーID
  user_id: number
  // 生徒ID
  student_id: number
  // 申請ステータス
  status: ApplicationStatus
  // 受講動機
  motivation: string
  // フィードバックコメント
  fb_comment: string
}
// ApplicationOfLecture型初期化オブジェクト
export function GetObj_ApplicationOfLecture() {
  const obj: ApplicationOfLecture = {
    id: 0,
    user_id: 0,
    student_id: 0,
    status: ApplicationStatus.Waiting,
    motivation: '',
    fb_comment: '',
  }
  return obj
}

// チーム内チャット
export type TeamChat = {
  // 講義ID
  id: number
  // ユーザーID
  user_id: number
  // 講義ID
  lecture_id: number
  // コメント
  comment: string
}
// TeamChat型初期化オブジェクト
export function GetObj_TeamChat() {
  const obj: TeamChat = {
    id: 0,
    user_id: 0,
    lecture_id: 0,
    comment: '',
  }
  return obj
}

// 講義データ
export class LectureWithOptionData {
  // 講義
  public lecture: Lecture
  public students: StudentWithUser[]
  public teachers: TeacherWithUser[]
  public schedules: LectureSchedule[]
  public materials: TeachingMaterial[]

  constructor() {
    this.lecture = {
      id: 0,
      user_id: 0,
      title: '',
      explanation: '',
    }
    this.students = []
    this.teachers = []
    this.schedules = []
    this.materials = []
  }
}

// 受講申請データ(詳細版)
export type ApplicationOfLectureWithOptionData = {
  // 申請ID
  id: number
  // ユーザーID
  user_id: number
  // 生徒ID
  student_id: number
  // 申請ステータス
  status: ApplicationStatus
  // 受講動機
  motivation: string
  // フィードバックコメント
  fb_comment: string
  // ユーザー情報
  user: User
  // 生徒情報
  student: Student
  // 講義情報
  lecture: Lecture
}

// ApplicationOfLectureWithOptionData型初期化オブジェクト
export function GetObj_ApplicationOfLectureWithOptionData() {
  const obj: ApplicationOfLectureWithOptionData = {
    id: 0,
    user_id: 0,
    student_id: 0,
    status: ApplicationStatus.Unknown,
    motivation: '',
    fb_comment: '',
    user: GetObj_User(),
    student: GetObj_Student(),
    lecture: GetObj_Lecture(),
  }
  return obj
}

// ユーザー通知
export enum UserNoticeType {
  // 不定
  Unknown = 0,
  // 通知
  Notice = 1,
  // お知らせ
  News = 2,
}

// 既読ステータス
export enum AlreadyReadStatus {
  // 不定
  Unknown = 0,
  // 既読
  True = 1,
  // 未読
  False = 2,
}

// ユーザー通知
export type UserNotice = {
  // ID
  id: number
  // ユーザーID
  user_id: number
  // 通知タイプ
  type: UserNoticeType
  // 既読
  already_read: AlreadyReadStatus
  // タイトル
  title: string
  // サブタイトル
  sub_title: string
}
// UserNotice型初期化オブジェクト
export function GetObj_UserNotice() {
  const obj: UserNotice = {
    id: 0,
    user_id: 0,
    type: UserNoticeType.Unknown,
    already_read: AlreadyReadStatus.Unknown,
    title: '',
    sub_title: '',
  }
  return obj
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
  dispaleyName: string
  pageLink: string
}

// #endregion Component
