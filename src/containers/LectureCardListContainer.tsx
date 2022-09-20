import Link from 'next/link'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import LectureCard from 'components/organisms/LectureCard'
import LectureCardList from 'components/organisms/LectureCardList'
import type { Lecture } from '../types/userTypes'

interface LectureCardListProps {
	isLoading: boolean
  lectures: Lecture[]
  view_mode_mine: boolean
}

/**
 * 講義カードリストコンテナ
 */
const LectureCardListContainer = ({
	isLoading,
  lectures,
  view_mode_mine,
}: LectureCardListProps) => {
  return (
    <LectureCardList>
      {/* ロード中はレクトローダーを表示 */}
      {isLoading &&
        Array.from(Array(16), (_, k) => (
          <Box key={k}>
            <Box display={{ base: 'none', md: 'block' }}>
              <RectLoader width={240} height={240} />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
              <RectLoader width={160} height={160} />
            </Box>
          </Box>
        ))}
      {!isLoading && lectures != null && lectures.length != 0 &&
        lectures.map((p) => (
          <Box key={p.id}>
            <Link href={`/lecture/${p.id}?view_mode_mine=${view_mode_mine}`} passHref>
              <a>
                {/* 講義カード */}
                <LectureCard
                  variant="listing"
                  title={p.title}
                  teacherName="まつもと"
                  capacity={4}
                  numberOfStudents={4}
                  teacherProfileImageUrl="/lectures/github.png"
                />
              </a>
            </Link>
          </Box>
        ))}
    </LectureCardList>
  )
}

export default LectureCardListContainer
