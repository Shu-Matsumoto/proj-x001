import Grid from 'components/layout/Grid'

interface LectureCardListProps {
  /**
   * 1行に表示する講義数
   */
  numberPerRow?: number
  /**
   * モバイルで1行に表示する講義数
   */
  numberPerRowForMobile?: number
}

/**
 * 講義カードリスト
 */
const LectureCardList = ({
  numberPerRow = 3,
  numberPerRowForMobile = 1,
  children,
}: React.PropsWithChildren<LectureCardListProps>) => {
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

export default LectureCardList
