import { PropaneSharp } from '@mui/icons-material'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface UserNoticeCardProps {
  // 通知No
  id: number
  // 通知タイプ
  type: number
  // 既読ステータス
  alreadyRead: number
  // タイトル
  title: string
  // サブタイトル
  subTitle: string
  // 既読実行時イベントハンドラ
  onChangeToAlreadyReadNotice?: (id: number) => void
}

/**
 * ユーザー通知カード
 */
const UserNoticeCard = ({
  id,
  type,
  alreadyRead,
  title,
  subTitle,
  onChangeToAlreadyReadNotice,
}: UserNoticeCardProps) => {
  // #region Functions
  function changeToAlreadyReadNotice() {
    const result = confirm('この通知を既読にしますか？')
    if (result) {
      onChangeToAlreadyReadNotice && onChangeToAlreadyReadNotice(id)
    }
  }
  // #endregion Functions

  return (
    <>
      <Flex justifyContent={'space-between'}>
        <Box width="90%">
          <Flex flexDirection={'column'} alignItems={'flex-start'}>
            {/* タイトル */}
            <Box>
              <Text
                as="span"
                fontSize={{ base: 'mediumLarge', md: 'large' }}
                letterSpacing={{ base: 2, md: 3 }}
                lineHeight={{ base: '32px', md: '32px' }}
                color="blue"
                backgroundColor="white"
                margin={2}
              >
                {title}
              </Text>
            </Box>
            {/* サブタイトル */}
            <Box>
              <Text
                as="span"
                backgroundColor="white"
                fontSize={{ base: 'medium', md: 'mediumLarge' }}
                lineHeight={{ base: '16px', md: '24px' }}
                letterSpacing={{ base: 2, md: 4 }}
                margin={2}
              >
                {subTitle}
              </Text>
            </Box>
          </Flex>
        </Box>
        {/* 既読ボタン */}
        <Box width="10%">
          <Flex
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            alignContent={'center'}
          >
            <Button onClick={changeToAlreadyReadNotice}>既読</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default UserNoticeCard
