import { height } from '@mui/system'
import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        height: 'auto !important',
        minHeight: '100%',
      }}
    >
      <Header />
      <main
        style={{
          backgroundImage: `url(${'https://beiz.jp/images_T/white/white_00036.jpg'})`,
          paddingBottom: '75px',
          width: '100%',
          height: 'auto',
        }}
      >
        {children}
      </main>
      <Separator />
      <Box
        width="100%"
        padding={0}
        style={{
          backgroundColor: 'lightgrey',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '75px',
          // top: "100vh",
          // position: "sticky",
          //bottom: 0
        }}
      >
        <Footer />
      </Box>
    </div>
  )
}

export default Layout
