import Grid from 'components/layout/Grid'

interface UserNoticeCardListProps {
  /**
   * 1行に表示する商品数
   */
  numberPerRow?: number
  /**
   * モバイルで1行に表示する商品数
   */
  numberPerRowForMobile?: number
}

/**
 * ユーザー通知カードリスト
 */
const UserNoticeCardList = ({
  numberPerRow = 1,
  numberPerRowForMobile = 1,
  children,
}: React.PropsWithChildren<UserNoticeCardListProps>) => {
  return (
    <Grid
      gridGap="16px"
      gridTemplateColumns={{
        base: `repeat(${numberPerRowForMobile}, 1fr)`,
        md: `repeat(${numberPerRow}, 1fr)`,
      }}
    >
      {children}
    </Grid>
  )
}

export default UserNoticeCardList
