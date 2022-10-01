import React from 'react'
import { LinkInformationSet } from '../../types/userTypes'
import SubMenu from 'components/templates/Layout/subMenu'

const LecturePageSubMenu = () => {
  const menuList: LinkInformationSet[] = [
    { dispaleyName: '講義投稿', pageLink: '/lecture/newpost' },
    {
      dispaleyName: '受講申請一覧',
      pageLink: '/lecture/applicationOfLecture/inbox',
    },
  ]

  return (
    <>
      <SubMenu menuLinkList={menuList} />
    </>
  )
}

export default LecturePageSubMenu
