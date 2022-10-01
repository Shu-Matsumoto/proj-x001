import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { UserNotice, AlreadyReadStatus } from '../types/userTypes'
import UserNoticeCard from 'components/organisms/UserNoticeCard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

interface UserNoticeCardListProps {
  isLoading: boolean
  userNotices: UserNotice[]
  onChangeToAlreadyReadNotice?: (id: number) => void
}

export default function BasicStack({
  isLoading,
  userNotices,
  onChangeToAlreadyReadNotice,
}: UserNoticeCardListProps) {
  // #region Functions
  function changeToAlreadyReadNotice(id: number) {
    onChangeToAlreadyReadNotice && onChangeToAlreadyReadNotice(id)
  }
  // #endregion Functions

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {userNotices != null &&
          userNotices.map(
            (notice, index) =>
              notice.already_read != AlreadyReadStatus.True && (
                <Item key={index}>
                  {/* ユーザー通知カード */}
                  <UserNoticeCard
                    id={notice.id}
                    type={notice.type}
                    alreadyRead={notice.already_read}
                    title={notice.title}
                    subTitle={notice.sub_title}
                    onChangeToAlreadyReadNotice={changeToAlreadyReadNotice}
                  />
                </Item>
              ),
          )}
      </Stack>
    </Box>
  )
}
