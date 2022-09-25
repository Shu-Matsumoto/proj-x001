import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import { alpha, styled } from '@mui/material/styles'
import Button from 'components/atoms/Button'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { User } from 'types/userTypes'

interface UserProfileProps {
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'normal' | 'small'
  /**
   * ユーザー情報
   */
  user: User
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
const UserProfile = ({ variant = 'normal', user }: UserProfileProps) => {
  // #region Fields
  const profileImageSize = variant === 'small' ? '200px' : '360px'
  // #endregion Fields

  // #region Functions
  // 編集モード遷移の確認
  function confirmEntryToEditMode(): void {
    const result = confirm('プロフィールを編集しますか？')
    if (!result) {
      return
    }
  }
  // #endregion Functions

  return (
    <Flex>
      <Box minWidth={profileImageSize}>
        <Flex flexDirection={'column'}>
          {/* ユーザー画像 */}
          <ShapeImage
            shape="circle"
            quality="85"
            src={'/users/1.png' /*user.image_path*/}
            alt={user.user_name}
            height={profileImageSize}
            width={profileImageSize}
          />
          <Button onClick={confirmEntryToEditMode} marginTop={2}>
            <Text variant="small" color={'white'}>
              プロフィールを編集
            </Text>
          </Button>
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
                <BootstrapInput id="bootstrap-input" value={user.user_name} />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  ユーザーID
                </InputLabel>
                <BootstrapInput id="bootstrap-input" value={user.login_id} />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  e-mail address
                </InputLabel>
                <BootstrapInput id="bootstrap-input" value={user.email} />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  自己紹介文
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={user.self_introduction}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  クレジットカード番号
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={user.credit_card_number}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  金融機関番号
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={user.financial_institution_id}
                />
              </FormControl>
              <FormControl variant="standard" margin={'normal'}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  入金用銀行口座番号
                </InputLabel>
                <BootstrapInput id="bootstrap-input" value={user.bank_number} />
              </FormControl>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default UserProfile
