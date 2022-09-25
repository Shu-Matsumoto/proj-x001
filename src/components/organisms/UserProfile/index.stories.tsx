import { ComponentMeta, ComponentStory } from '@storybook/react'
import UserProfile from './index'
import { GetObj_User } from 'types/userTypes'

export default {
  title: 'Organisms/UserProfile',
  argTypes: {
    variant: {
      options: ['normal', 'small'],
      control: { type: 'radio' },
      defaultValue: 'normal',
      description: 'バリアント（表示スタイル）',
      table: {
        type: { summary: 'normal | small' },
        defaultValue: { summary: 'normal' },
      },
    },
    username: {
      control: { type: 'text' },
      description: 'ユーザー名',
      table: {
        type: { summary: 'string' },
      },
    },
    profileImageUrl: {
      control: { type: 'text' },
      description: 'ユーザー画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    numberOfProducts: {
      control: { type: 'number' },
      description: 'ユーザーが所有する商品数',
      table: {
        type: { summary: 'number' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'ユーザーの説明',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof UserProfile>

const Template: ComponentStory<typeof UserProfile> = (args) => (
  <UserProfile {...args} />
)

export const Small = Template.bind({})
Small.args = {
  variant: 'small',
  user: GetObj_User(),
}

export const Normal = Template.bind({})
Normal.args = {
  variant: 'normal',
  user: GetObj_User(),
}
