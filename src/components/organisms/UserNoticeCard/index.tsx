import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface UserNoticeCardProps {
  // 通知タイプ
  type: number
  // 既読ステータス
  alreadyRead: number
  // タイトル
  title: string
  // サブタイトル
  subTitle: string
}

/**
 * ユーザー通知カード
 */
const UserNoticeCard = ({
  type,
  alreadyRead,
  title,
  subTitle,
}: UserNoticeCardProps) => {
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
            <Button>既読</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default UserNoticeCard
