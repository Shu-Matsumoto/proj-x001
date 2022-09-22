import styled from 'styled-components'
import ScaleImage from 'components/atoms/ScaleImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'

interface ApplicationOfLectureCardProps {
  // 講義タイトル
  title: string
  // 生徒名
  studentName: string
  // 定員(募集人数)
  capacity: number
  // 参加者数
  numberOfStudents: number
  // 講師プロフィール画像URL
  teacherProfileImageUrl: string
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'listing' | 'small' | 'detail'
}

// 受講申請カードのコンテナ
const ApplicationOfLectureCardContainer = styled.div`
  position: relative;
`

// 受講申請カード画像のコンテナ
const ApplicationOfLectureCardImageContainer = styled.div`
  z-index: 99;
`

// 受講申請カードの情報
const ApplicationOfLectureCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`

/**
 * 受講申請カード
 */
const ApplicationOfLectureCard = ({
  title,
  studentName,
  capacity,
  numberOfStudents,
  teacherProfileImageUrl,
  variant = 'listing',
}: ApplicationOfLectureCardProps) => {
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
      <ApplicationOfLectureCardContainer>
        <ApplicationOfLectureCardImageContainer>
          <ScaleImage
            src={teacherProfileImageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
          />
        </ApplicationOfLectureCardImageContainer> 
        {variant !== 'small' && (
          <ApplicationOfLectureCardInfo>
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
                {studentName}
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
                講義：{title}
              </Text>
              {/* <Text
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
                定員：{capacity}名
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
                参加者：{numberOfStudents}名
              </Text> */}
            </Box>
          </ApplicationOfLectureCardInfo>
        )}
        {variant === 'small' && (
          <Box marginTop={1}>
            <Text as="h2" variant="medium" margin={0} padding={0}>
              {studentName}
            </Text>
            <Text as="span" variant="medium">
              講義：{title}
            </Text>
            {/* <Text as="span" variant="medium">
              定員：{capacity}名
            </Text>
            <Text as="span" variant="medium">
              参加者：{numberOfStudents}名
            </Text> */}
          </Box>
        )}
      </ApplicationOfLectureCardContainer>
    </>
  )
}

export default ApplicationOfLectureCard
