import Link from 'next/link'
import { Fragment } from 'react'
import Flex from 'components/layout/Flex'
import Box from 'components/layout/Box'
import { LinkInformationSet } from '../../../types'
import Text from 'components/atoms/Text'

interface SubMenuProps {
	menuLinkList: LinkInformationSet[],
}

const SubMenu = ({
	menuLinkList
}: SubMenuProps) => {
  return (
		<>
			<Flex
				width="300px"
				backgroundColor="#BFBFBF"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Fragment>
					{menuLinkList.map((item) => (
						<Box paddingTop={1} paddingBottom={1}>
							<Link href={`${item.pageLink}`} passHref>
								<Text variant="extraLarge" margin={0} padding={0}>
									{`${item.dispaleyName}`}
								</Text>
							</Link>
						</Box>
					))}
				</Fragment>
			</Flex>
    </>
  )
}

export default SubMenu
