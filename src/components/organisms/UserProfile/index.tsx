import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import * as React from 'react'

import { UpdateUserProfileImage } from '../../../api/users'
import { GetUrlOfImageFileInDataServer } from '../../../utils'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

import {
  User,
  GetCopyObj_User,
  ApiContext,
  AppErrorCode,
} from 'types/userTypes'

interface UserProfileProps {
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'normal' | 'small'
  /**
   * ユーザー情報
   */
  user: User
  /**
   * 編集モードフラグ
   */
  editMode: boolean
  /**
   * プロフィール編集ボタンを押した時のイベントハンドラ
   */
  onTransitToEdit?: () => void
  /**
   * プロフィール保存ボタンを押した時のイベントハンドラ
   */
  onTransitToRef?: () => void
  /**
   * ユーザーデータ更新通知
   */
  updateUserData?: (user: User) => void
}

interface ShowPasswordGroup {
  password: boolean
  credit_card_number: boolean
  financial_institution_id: boolean
  bank_number: boolean
}

export default function UserProfile(props: UserProfileProps) {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const userData = GetCopyObj_User(props.user)
  const [values, setValues] = React.useState<User>(props.user)
  const [showPasswords, setshowPasswords] = React.useState<ShowPasswordGroup>({
    password: false,
    credit_card_number: false,
    financial_institution_id: false,
    bank_number: false,
  })

  const profileImageSize = props.variant === 'small' ? '200px' : '360px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 360
  // #endregion Fields

  const handleChange =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  // #region Functions
  // 編集モード遷移の確認
  function confirmEntryToEditMode(): void {
    const result = confirm('プロフィールを編集しますか？')
    if (!result) {
      return
    }
    // 編集モードへ遷移
    props.onTransitToEdit && props.onTransitToEdit()
  }
  // パラメータ保存の確認
  function confirmSaveProfile(): void {
    const result = confirm('プロフィールを保存しますか？')
    if (!result) {
      return
    }
    // 参照モードへ遷移
    props.onTransitToRef && props.onTransitToRef()
  }
  // 画像ファイルアップロード
  function uploadImageToImageServer(formData: FormData) {
    console.log('image file received')
    console.log('form:', formData.get('file'))

    // 画像アップロード
    UpdateUserProfileImage(apiContext, props.user.id, formData).then(
      (apiResult) => {
        console.log(apiResult)
        if (apiResult.result.Code == AppErrorCode.Success) {
          // ユーザーデータ更新通知
          props.updateUserData && props.updateUserData(apiResult.data)
        }
      },
    )
  }
  // #endregion Functions

  return (
    <Flex>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Flex flexDirection={'column'}>
          {/* ユーザー画像 */}
          {props.user?.image_path !== null && props.user?.image_path !== '' ? (
            <ShapeImage
              shape="circle"
              quality="85"
              src={GetUrlOfImageFileInDataServer(props.user?.image_path)}
              alt={props.user?.user_name}
              height={profileImageSize}
              width={profileImageSize}
            />
          ) : (
            <PersonIcon size={profileImageSizeNumber} />
          )}
          {props.editMode ? (
            <>
              <Flex justifyContent={'flex-end'}>
                <ImageUploadButton onPost={uploadImageToImageServer} />
              </Flex>
              <Button onClick={confirmSaveProfile} marginTop={2}>
                <Text variant="small" color={'white'}>
                  プロフィールを保存
                </Text>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={confirmEntryToEditMode} marginTop={2}>
                <Text variant="small" color={'white'}>
                  プロフィールを編集
                </Text>
              </Button>
            </>
          )}
        </Flex>
      </Box>
      <Box
        marginLeft={2}
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="ユーザーID"
            id="text-user-id"
            value={userData?.login_id}
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="ユーザー名"
            id="text-user-name"
            value={userData?.user_name}
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="e-mail"
            id="text-email"
            value={userData?.email}
            sx={{ m: 1, width: '55ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="自己紹介"
            id="text-self-introduction"
            value={userData?.self_introduction}
            //sx={{ m: 1, width: '100ch' }}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="クレジットカード番号"
            id="text-credit-card-number"
            value={userData?.credit_card_number}
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            label="金融機関番号"
            id="text-financial-institution-id"
            value={userData?.financial_institution_id}
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="入金用銀行口座番号"
            id="text-bank-number"
            value={userData?.bank_number}
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    </Flex>
  )
}
