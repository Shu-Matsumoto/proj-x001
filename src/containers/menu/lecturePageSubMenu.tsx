import React from 'react'
import { LinkInformationSet } from '../../types'
import SubMenu from 'components/templates/Layout/subMenu';

const LecturePageSubMenu = () => {

	const menuList: LinkInformationSet[] = [
    { dispaleyName: "講義一覧", pageLink: "/lecture/me" },
    { dispaleyName: "受講申請一覧", pageLink: "/attendance/me" },
  ];

  return (
		<>
			<SubMenu menuLinkList={menuList} />
    </>
  )
}

export default LecturePageSubMenu
