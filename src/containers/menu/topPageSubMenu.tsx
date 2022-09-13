import React from 'react'
import { LinkInformationSet } from '../../types/userTypes'
import SubMenu from 'components/templates/Layout/subMenu';

const TopPageSubMenu = () => {

	const menuList: LinkInformationSet[] = [
    { dispaleyName: "お知らせ", pageLink: "/top" },
    { dispaleyName: "menu2", pageLink: "/top" },
    { dispaleyName: "menu3", pageLink: "/top" },
  ];

  return (
		<>
			<SubMenu menuLinkList={menuList} />
    </>
  )
}

export default TopPageSubMenu
