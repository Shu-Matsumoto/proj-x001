import styled from 'styled-components'
import { PersonIcon } from 'components/atoms/IconButton'
import ScaleImage from 'components/atoms/ScaleImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'

interface LectureCardProps {
  // 講義タイトル
  title: string
  // 講師名
  teacherName: string
  // 講師プロフィール画像URL
  teacherProfileImageUrl: string
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'listing' | 'small' | 'detail'
}

// 講義カードのコンテナ
const LectureCardContainer = styled.div`
  position: relative;
`

// 講義カード画像のコンテナ
const LectureCardImageContainer = styled.div`
  z-index: 99;
`

// 講義カードの情報
const LectureCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`

/**
 * 講義カード
 */
const LectureCard = ({
  title,
  teacherName,
  teacherProfileImageUrl,
  variant = 'listing',
}: LectureCardProps) => {
  const profileImageSizeNumber = 360
  const { size, imgSize } = (() => {
    switch (variant) {
      case 'detail':
        return { size: { base: '280px', md: '500px' }, imgSize: 540 }
      case 'listing':
        return { size: { base: '140px', md: '200px' }, imgSize: 240 }
      default:
        return { size: { base: '160px' }, imgSize: 160 }
    }
  })()

  return (
    <>
      <LectureCardContainer>
        <LectureCardImageContainer>
          <ScaleImage
            src={teacherProfileImageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
          />
        </LectureCardImageContainer>
        {variant !== 'small' && (
          <LectureCardInfo>
            <Box>
              <Text
                as="h2"
                fontSize={{ base: 'small', md: 'medium' }}
                letterSpacing={{ base: 2, md: 3 }}
                lineHeight={{ base: '16px', md: '32px' }}
                backgroundColor="#DDDDDD"
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
                backgroundColor="#EEEEDD"
                fontSize={{ base: 'extraSmall', md: 'extraSmall' }}
                lineHeight={{ base: '8px', md: '12px' }}
                letterSpacing={{ base: 2, md: 4 }}
                margin={0}
                padding={{ base: 1, md: 1 }}
              >
                講師：{teacherName}
              </Text>
            </Box>
          </LectureCardInfo>
        )}
        {variant === 'small' && (
          <Box marginTop={1}>
            <Text as="h2" variant="medium" margin={0} padding={0}>
              {title}
            </Text>
            <Text as="span" variant="medium">
              講師：{teacherName}
            </Text>
          </Box>
        )}
      </LectureCardContainer>
    </>
  )
}

export default LectureCard
