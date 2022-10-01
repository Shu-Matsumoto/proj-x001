import styled from 'styled-components'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

/**
 * フッター
 */
const Footer = () => {
  return (
    <footer>
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Box
          minWidth={{ base: '100%', md: '120px' }}
          paddingRight={{ base: 0, md: 1 }}
        >
          <nav></nav>
        </Box>
      </Flex>
      <Box paddingTop={3} paddingBottom={2}>
        <Text>© 2022 ******* Co., Ltd.. All rights reserved.</Text>
      </Box>
    </footer>
  )
}

export default Footer
