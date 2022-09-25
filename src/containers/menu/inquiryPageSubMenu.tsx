import React from 'react'
import { LinkInformationSet } from '../../types/userTypes'
import SubMenu from 'components/templates/Layout/subMenu'

const InquiryPageSubMenu = () => {
  const menuList: LinkInformationSet[] = [
    { dispaleyName: 'お問い合わせ', pageLink: '/inquiry' },
  ]

  return (
    <>
      <SubMenu menuLinkList={menuList} />
    </>
  )
}

export default InquiryPageSubMenu
