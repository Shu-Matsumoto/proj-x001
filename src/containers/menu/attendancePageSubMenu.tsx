import React from 'react'
import { LinkInformationSet } from '../../types'
import SubMenu from 'components/templates/Layout/subMenu';

const AttendancePageSubMenu = () => {

	const menuList: LinkInformationSet[] = [
    { dispaleyName: "受講一覧", pageLink: "/attendance/me" },
    { dispaleyName: "講義検索", pageLink: "/attendance/me" },
    { dispaleyName: "講師検索", pageLink: "/attendance/me" },
  ];

  return (
		<>
			<SubMenu menuLinkList={menuList} />
    </>
  )
}

export default AttendancePageSubMenu
