import Link from 'next/link'
import React, { Fragment } from 'react'
import Flex from 'components/layout/Flex'
import Box from 'components/layout/Box'
import { LinkInformationSet } from '../../../types'
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
			<Flex>
				<Flex>{subMenu}</Flex>
				<Flex>{children}</Flex>
			</Flex>
    </>
  )
}

export default MainPartLayout
