import Link from 'next/link'
import React from 'react'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'

interface MainPartLayoutProps {
  subMenu: React.ReactNode
  breadcrumbList: { link: string; title: string }[]
  children: React.ReactNode
}

const MainPartLayout = ({
  subMenu,
  breadcrumbList,
  children,
}: MainPartLayoutProps) => {
  return (
    <>
      <Box width="100%">
        <Flex>
          <Box width="13%">{subMenu}</Box>
          <Box width="87%">
            <Flex flexDirection={'column'}>
              <Box margin={1}>
                <Flex>
                  <Breadcrumb>
                    {breadcrumbList != null &&
                      breadcrumbList.map((item, index) => (
                        <BreadcrumbItem key={index}>
                          <Link key={index} href={item.link}>
                            <a>{item.title}</a>
                          </Link>
                        </BreadcrumbItem>
                      ))}
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
