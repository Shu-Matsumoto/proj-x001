import { ComponentMeta, ComponentStory } from '@storybook/react'
import LectureCard from './index'

export default {
  title: 'Organisms/LectureCard',
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '講義タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    teacherName: {
      control: { type: 'text' },
      description: '講師名',
      table: {
        type: { summary: 'string' },
      },
    },
    capacity: {
      control: { type: 'number' },
      description: '定員',
      table: {
        type: { summary: 'number' },
      },
    },
    numberOfStudents: {
      control: { type: 'number' },
      description: '参加者数',
      table: {
        type: { summary: 'number' },
      },
    },
    teacherProfileImageUrl: {
      control: { type: 'text' },
      description: '講師プロフィール画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      options: ['listing', 'small', 'detail'],
      control: { type: 'radio' },
      defaultValue: 'listing',
      description: 'バリアント（表示スタイル）',
      table: {
        type: { summary: 'listing | small | detail' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
} as ComponentMeta<typeof LectureCard>

const Template: ComponentStory<typeof LectureCard> = (args) => (
  <LectureCard {...args} />
)

// Listingカード
export const Listing = Template.bind({})
Listing.args = {
  variant: 'listing',
  title: "開発現場におけるGithub活用方法",
  teacherName: "鈴木亮平",
  teacherProfileImageUrl: '/images/users/1.png',
}

// Smallカード
export const Small = Template.bind({})
Small.args = {
  variant: 'small',
  title: "開発現場におけるGithub活用方法",
  teacherName: "鈴木亮平",
  teacherProfileImageUrl: '/images/users/1.png',
}

// Detailカード
export const Detail = Template.bind({})
Detail.args = {
  variant: 'detail',
  title: "開発現場におけるGithub活用方法",
  teacherName: "鈴木亮平",
  teacherProfileImageUrl: '/images/users/1.png',
}
