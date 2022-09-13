import Grid from 'components/layout/Grid'

interface LectureCardListProps {
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
 * 講義カードリスト
 */
const LectureCardList = ({
  numberPerRow = 4,
  numberPerRowForMobile = 2,
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
