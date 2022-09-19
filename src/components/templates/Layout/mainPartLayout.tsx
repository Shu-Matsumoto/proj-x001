import Link from 'next/link'
import React from 'react'
import Flex from 'components/layout/Flex'
import Box from 'components/layout/Box'
import Breadcrumb from 'components/molecules/Breadcrumb'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'

interface MainPartLayoutProps {
	subMenu: React.ReactNode,
	breadcrumbList: { link: string, title: string} [],
	children: React.ReactNode,
}

const MainPartLayout = ({
	subMenu,
	breadcrumbList,
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
						<Flex
							flexDirection={"column"}
						>
							<Box margin={1}>
								<Flex>
									<Breadcrumb>
										{(breadcrumbList != null) &&
											breadcrumbList.map((item) => (
												<BreadcrumbItem>
													<Link href={item.link}>
														<a>{item.title}</a>
													</Link>
												</BreadcrumbItem>
											))
										}
									</Breadcrumb>
								</Flex>
							</Box>
							{children}
						</Flex>
					</Box>
				</Flex>	
			</Box>
    </>
  )
}

export default MainPartLayout
