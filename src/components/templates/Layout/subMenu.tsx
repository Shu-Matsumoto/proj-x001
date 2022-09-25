import Link from 'next/link'
import { Fragment } from 'react'
import { LinkInformationSet } from '../../../types/userTypes'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface SubMenuProps {
  menuLinkList: LinkInformationSet[]
}

const SubMenu = ({ menuLinkList }: SubMenuProps) => {
  return (
    <>
      <Box width="100%">
        <Flex
          backgroundColor="#BFBFBF"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Fragment>
            {menuLinkList.map((item, index) => (
              <Box key={index} paddingTop={1} paddingBottom={1}>
                <Link key={index} href={`${item.pageLink}`} passHref>
                  <Text key={index} variant="medium" margin={0} padding={0}>
                    {`${item.dispaleyName}`}
                  </Text>
                </Link>
              </Box>
            ))}
          </Fragment>
        </Flex>
      </Box>
    </>
  )
}

export default SubMenu
