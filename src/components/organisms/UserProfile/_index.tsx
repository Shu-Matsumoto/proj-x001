import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import { alpha, styled } from '@mui/material/styles'
import { UpdateUserProfileImage } from '../../../api/users'
import { GetUrlOfImageFileInDataServer } from '../../../utils'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { User, ApiContext, AppErrorCode } from 'types/userTypes'

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

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

// 情報表示用タグ
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

/**
 * ユーザープロフィール
 */
const UserProfile = (props: UserProfileProps) => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }

  const profileImageSize = props.variant === 'small' ? '200px' : '360px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 360
  // #endregion Fields

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
      <Box minWidth={profileImageSize}>
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
      <Box width="90%" margin={2}>
        <Flex justifyContent={'flex-start'}>
          {/* タイトル */}
          <Box marginBottom={1}>
            <Flex justifyContent={'flex-start'} flexDirection={'column'}>
              {/* 講義タイトルの入力 */}
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  ユーザー名
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.user_name}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  ユーザーID
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.login_id}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  e-mail address
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.email}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  自己紹介文
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.self_introduction}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  クレジットカード番号
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.credit_card_number}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  金融機関番号
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.financial_institution_id}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  入金用銀行口座番号
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={props.user?.bank_number}
                />
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default UserProfile
