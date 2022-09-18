import Link from 'next/link'
import React, { Fragment } from 'react'
import Flex from 'components/layout/Flex'
import Box from 'components/layout/Box'
import { LinkInformationSet } from '../../../types/userTypes'
import Text from 'components/atoms/Text'

interface MainPartLayoutProps {
	subMenu: React.ReactNode,
	children: React.ReactNode,
}

const MainPartLayout = ({
	subMenu,
	children
}: MainPartLayoutProps) => {
  return (
		<>
			<Box width="100%">
				<Flex>
					<Box width='20%' >
						{ subMenu }
					</Box>
					<Box width='80%'>
						{children}
					</Box>
				</Flex>	
			</Box>
    </>
  )
}

export default MainPartLayout
