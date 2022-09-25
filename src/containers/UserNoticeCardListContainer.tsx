import Link from 'next/link'
import type { UserNotice } from '../types/userTypes'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import UserNoticeCard from 'components/organisms/UserNoticeCard'
import UserNoticeCardList from 'components/organisms/UserNoticeCardList'

interface UserNoticeCardListProps {
  isLoading: boolean
  userNotices: UserNotice[]
}

/**
 * ユーザー通知カードリストコンテナ
 */
const UserNoticeCardListContainer = ({
  isLoading,
  userNotices,
}: UserNoticeCardListProps) => {
  return (
    <UserNoticeCardList>
      {/* ロード中はレクトローダーを表示 */}
      {isLoading &&
        Array.from(Array(16), (_, k) => (
          <Box key={k}>
            <Box display={{ base: 'none', md: 'block' }}>
              <RectLoader width={480} height={480} />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
              <RectLoader width={320} height={320} />
            </Box>
          </Box>
        ))}
      {!isLoading &&
        userNotices != null &&
        userNotices.length != 0 &&
        userNotices.map((p) => (
          <Box key={p.id}>
            {/* ユーザー通知カード */}
            <UserNoticeCard
              variant="listing"
              type={p.type}
              alreadyRead={p.already_read}
              title={p.title}
              subTitle={p.sub_title}
            />
          </Box>
        ))}
    </UserNoticeCardList>
  )
}

export default UserNoticeCardListContainer
