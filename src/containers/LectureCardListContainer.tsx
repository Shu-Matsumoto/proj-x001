import Link from 'next/link'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import LectureCard from 'components/organisms/LectureCard'
import LectureCardList from 'components/organisms/LectureCardList'
import searchLectures from 'services/attendance/search-lectures'
import type { ApiContext } from 'types'

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

/**
 * 講義カードリストコンテナ
 */
const LectureCardListContainer = () => {
  const { lectures, isLoading } = searchLectures(context);

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
      {!isLoading &&
        lectures.map((p) => (
          <Box key={p.Id}>
            <Link href={`/lectures/${p.Id}`} passHref>
              <a>
                {/* 講義カード */}
                <LectureCard
                  variant="detail"
                  title={p.Title}
                  teacherName={p.TeacherName}
                  capacity={p.Capacity}
                  numberOfStudents={p.NumberOfStudents}
                  teacherProfileImageUrl={p.TeacherProfileImageURL}
                />
              </a>
            </Link>
          </Box>
        ))}
    </LectureCardList>
  )
}

export default LectureCardListContainer
