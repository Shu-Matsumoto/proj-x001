//import type { ApiContext } from '../../types'
import * as UserTypes from '../../types/userTypes'

export type UseSearch = {
  /**
   * 検索にヒットした講義リスト
   */
  lectures: UserTypes.LectureBasicInformation[]
  /**
   * ロードフラグ
   */
  isLoading: boolean
  /**
   * エラーフラグ
   */
  isError: boolean
}

/**
 * プロダクトAPI（一覧取得）のカスタムフック
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧とAPI呼び出しの状態
 */
const searchLectures = (context: UserTypes.ApiContext): UseSearch => {
  return {
    lectures: createData(),
    isLoading: false,
    isError: false,
  }
}

// Fakeデータ作成
const createData = (): UserTypes.LectureBasicInformation[] => {
  const data = []
  const lecture1 = new UserTypes.LectureBasicInformation()
  lecture1.Id = 1
  lecture1.Title = 'Githubをつかったソースコード管理(実践編)'
  lecture1.TeacherName = '山田太郎'
  lecture1.TeacherProfileImageURL = '/lectures/github.png'
  const lecture2 = new UserTypes.LectureBasicInformation()
  lecture2.Id = 2
  lecture2.Title = 'Laravelでのポートフォリオ作成をしよう'
  lecture2.TeacherName = '鈴木一郎'
  lecture2.TeacherProfileImageURL = '/lectures/laravel9.0.png'
  const lecture3 = new UserTypes.LectureBasicInformation()
  lecture3.Id = 3
  lecture3.Title = 'JavaScriptを使ってハンバーガーメニューを実装しよう'
  lecture3.TeacherName = '田中洋一'
  lecture3.TeacherProfileImageURL = '/lectures/hamburgerMenu.png'
  data.push(lecture1)
  data.push(lecture2)
  data.push(lecture3)
  return data
}

export default searchLectures
