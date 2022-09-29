import React from 'react';
import Box from '@mui/material/Box'
import SimpleDialog from 'components/molecules/SimpleDialog';
import { GetUserList } from '../../../api/users'
import { ApiContext, AppErrorCode } from 'types/userTypes'

interface DialogButtonProps {
	// ダイアログオープン
	open: boolean
	// ダイアログクローズ時イベントハンドラ
	onClose: (id: number, value: string) => void;
}

/**
 * ユーザー名選択ダイアログ表示ボタン
 * @param buttonName ボタンタイトル
 * @returns ダイアログで選択された文字列
 */
// export const CardData = (props: CardDataProps) => {
export const UserSelectDialogButton = (props: DialogButtonProps)=> {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
	//const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState<{ id: number, value: string }>({id: 1, value: ''});
	const [userList, setUserList] = React.useState<{id: number, value:string}[]>(new Array());
	// #endregion Fields

	// #region Functions
	// 初回のみの実行
  React.useLayoutEffect(() => {
		// ユーザーリスト取得
		GetUserList(apiContext)
			.then((apiResult) => {
      console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
				setSelectedValue({ id: apiResult.data[0].id, value: apiResult.data[0].user_name })
				setUserList(apiResult.data.map((item) => {
					return { id: item['id'], value: item['user_name'] }
				}))
      }
    })
  }, [])
	// #endregion Functions

	// #region View
  return (
    <Box>
			<SimpleDialog
				dialogTitle={'Select User dialog'}
				selectedValue={selectedValue}
				open={props.open}
				targetList={userList}
				onClose={props.onClose}
			/>
    </Box>
	)
	// #endregion View
}
