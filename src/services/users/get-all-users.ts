import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

/**
 * ユーザーAPI（一覧取得）
 * @param context APIコンテキスト
 * @returns ユーザー一覧
 */
const getAllUsers = async (context: ApiContext): Promise<User[]> => {
  return new Promise((resolve) => {
    const users: User[] = new Array();
    users.push({
      id: 1,
      username: "taketo",
      displayName: "Taketo Yoshida",
      email: "taketo@example.com",
      profileImageUrl: "/users/1.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    });
    users.push({
      id: 2,
      username: "takuya",
      displayName: "Takuya Tejima",
      email: "takuya@example.com",
      profileImageUrl: "/users/2.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    });
    users.push({
      id: 3,
      username: "kourin",
      displayName: "Yoshiki Takabayashi",
      email: "kourin@example.com",
      profileImageUrl: "/users/3.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    });
    resolve(users);
  });
  // return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/users`, {
  //   headers: {
  //     Origin: '*',
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // })
}

export default getAllUsers
