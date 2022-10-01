import Link from 'next/link'
import type { ApplicationOfLectureWithOptionData } from '../types/userTypes'
import { ConvertToStringStudentPosition } from '../types/userTypes'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import ApplicationOfLectureCard from 'components/organisms/ApplicationOfLectureCard'
import ApplicationOfLectureCardList from 'components/organisms/ApplicationOfLectureCardList'

interface ApplicationOfLectureCardListProps {
  isLoading: boolean
  applicationOfLectures: ApplicationOfLectureWithOptionData[]
  view_mode_mine: boolean
}

/**
 * 受講申請カードリストコンテナ
 */
const ApplicationOfLectureCardListContainer = ({
  isLoading,
  applicationOfLectures,
  view_mode_mine,
}: ApplicationOfLectureCardListProps) => {
  return (
    <ApplicationOfLectureCardList>
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
        applicationOfLectures != null &&
        applicationOfLectures.length != 0 &&
        applicationOfLectures.map((p) => (
          <Box key={p.id}>
            {/* リンク先ページには受講申請のIDを渡す */}
            <Link
              href={`/lecture/applicationOfLecture/accept/${p.id}`}
              passHref
            >
              <a>
                {/* 受講申請カード */}
                <ApplicationOfLectureCard
                  variant="listing"
                  title={p.lecture.title}
                  studentName={p.user.user_name}
                  position={ConvertToStringStudentPosition(p.student.position)}
                  capacity={4}
                  numberOfStudents={4}
                  studentProfileImageUrl={p.user.image_path}
                />
              </a>
            </Link>
          </Box>
        ))}
    </ApplicationOfLectureCardList>
  )
}

export default ApplicationOfLectureCardListContainer
