import React from 'react'
import { LinkInformationSet } from '../../types/userTypes'
import SubMenu from 'components/templates/Layout/subMenu';

const AttendancePageSubMenu = () => {

	const menuList: LinkInformationSet[] = [
    { dispaleyName: "受講一覧", pageLink: "/attendance/me" },
    { dispaleyName: "講義検索", pageLink: "/search/lecture" },
    { dispaleyName: "講師検索", pageLink: "/search/teacher" },
  ];

  return (
		<>
			<SubMenu menuLinkList={menuList} />
    </>
  )
}

export default AttendancePageSubMenu
