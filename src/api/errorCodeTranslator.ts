import { AppResult, AppErrorCode, AppErrorSubCode } from "../types/userTypes";
import { ApiResponseCode } from "./data";

/**
 * API実行時のエラーコードをAPP次元のエラーコードへ変換するクラス
 */
export class ErrorCodeTranslator{

	/**
	 * API実行時のエラーコードをAPP次元のコードへ変換
	 * @param code API実行時のエラーコード
	 * @returns APP次元のコード
	 */
	public static ToAppResult(code: ApiResponseCode): AppResult {
		let result = new AppResult();

		// エラー変換(まだまともな変換コードかけてない。暫定で200以外はエラー扱い)
		if (code != ApiResponseCode.OK) {
			result.Code = AppErrorCode.Error;
			result.SubCode = AppErrorSubCode.None;
		}
		return result;
	}

}