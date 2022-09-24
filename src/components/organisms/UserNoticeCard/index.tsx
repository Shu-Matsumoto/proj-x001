import styled from 'styled-components'
import ScaleImage from 'components/atoms/ScaleImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Button from 'components/atoms/Button'

interface UserNoticeCardProps {
	// 通知タイプ
	type: number
	// 既読ステータス
	alreadyRead: number
	// タイトル
  title: string
  // サブタイトル
  subTitle: string
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'listing' | 'small' | 'detail'
}

// UserNoticeカードのコンテナ
const UserNoticeCardContainer = styled.div`
  position: relative;
`

// ユーザー通知カード画像のコンテナ
const UserNoticeCardImageContainer = styled.div`
  z-index: 99;
`

// ユーザー通知カードの情報
const UserNoticeCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`

/**
 * ユーザー通知カード
 */
const UserNoticeCard = ({
	type,
	alreadyRead,
	title,
  subTitle,
  variant = 'listing',
}: UserNoticeCardProps) => {
  const { size, imgSize } = (() => {
    switch (variant) {
      case 'detail':
        return { size: { base: '320px', md: '540px' }, imgSize: 540 }
      case 'listing':
        return { size: { base: '160px', md: '240px' }, imgSize: 240 }
      default:
        return { size: { base: '160px' }, imgSize: 160 }
    }
  })()

  return (
    <>
      <UserNoticeCardContainer>
        {variant !== 'small' && (
          <UserNoticeCardInfo>
            <Box>
              <Text
                as="h2"
                fontSize={{ base: 'small', md: 'mediumLarge' }}
                letterSpacing={{ base: 2, md: 3 }}
                lineHeight={{ base: '32px', md: '48px' }}
                backgroundColor="white"
                margin={0}
                paddingRight={2}
                paddingLeft={2}
                paddingTop={0}
                paddingBottom={0}
              >
                {title}
              </Text>
              <Text
                as="span"
                fontWeight="bold"
                display="inline-block"
                backgroundColor="white"
                fontSize={{ base: 'extraSmall', md: 'medium' }}
                lineHeight={{ base: '8px', md: '12px' }}
                letterSpacing={{ base: 2, md: 4 }}
                margin={0}
                padding={{ base: 1, md: 2 }}
              >
                {subTitle}
							</Text>
							<Button>既読</Button>
            </Box>
          </UserNoticeCardInfo>
        )}
        {variant === 'small' && (
          <Box marginTop={1}>
            <Text as="h2" variant="medium" margin={0} padding={0}>
              {title}
            </Text>
            <Text as="span" variant="medium">
              {subTitle}
						</Text>
						<Button>既読</Button>
          </Box>
        )}
      </UserNoticeCardContainer>
    </>
  )
}

export default UserNoticeCard
