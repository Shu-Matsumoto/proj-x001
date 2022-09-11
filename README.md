## TypeScript��React/Next.js�ł�����HWeb�A�v���P�[�V����

�u[TypeScript��React/Next.js�ł�����HWeb�A�v���P�[�V����](https://gihyo.jp/book/2022/978-4-297-12916-3)�v�̃T���v���A�v��

![�T���v���A�v��](https://user-images.githubusercontent.com/2387508/178550902-a7c1e47b-a322-413c-b9ad-2ffff79e041d.png)

## ���ł���̃A�b�v�f�[�g

- [�r���h�����s��������C��](https://github.com/gihyo-book/ts-nextbook-app/pull/6)
- [Storybook���ŐV��Next.js�œ��삵�Ȃ������C��](https://github.com/gihyo-book/ts-nextbook-app/pull/5)

## ��

- Node.js: 16.14.0
- Next.js: 12.2.3
- React: 18.2.0

## �C���X�g�[��

```bash
npm install
```

## ���ϐ��̐ݒ�

.env���J��

```
API_BASE_URL=<�o�b�N�G���hAPI�ւ̃x�[�XURL�̐ݒ�>
NEXT_PUBLIC_API_BASE_PATH=/api/proxy
```

## �J���T�[�o�[�N��

�J���T�[�o�[�̋N�����Ahttp://localhost:3000/ �ɃA�N�Z�X

```
npm run dev
```

## Storybook�N��

Storybook���N�����Ahttp://localhost:6006/ �ɃA�N�Z�X

```
npm run storybook
```

## �e�X�g���s

���j�b�g�e�X�g���s

```
npm run test
```

## �\�[�X�R�[�h�����^�[�E�t�H�[�}�b�^�[

�\�[�X�R�[�h�������^�[�Ń`�F�b�N

```
npm run lint
```

�\�[�X�R�[�h���t�H�[�}�b�^�[�Ő��`

```
npm run format
```

## �f�B���N�g���\��

�ȒP�Ƀf�B���N�g���\�����ȉ��ɐ������܂��B

```
������ .editorconfig
������ .env <-- ���ϐ�
������ .env.production <-- �{�ԗp���ϐ�
������ .eslintrc.json <-- ESLint�ݒ�t�@�C��
������ README.md
������ jest.config.js <-- Jest�̐ݒ�t�@�C��
������ jest.setup.js <-- �e�X�g�t�@�C�������s�����O�ɑ���
������ next-env.d.ts
������ next.config.js <-- Next.js�ݒ�t�@�C��
������ package-lock.json
������ package.json
������ public
������ src
��?? ������ components <-- Presentational Components
��?? ������ containers <-- Container Compoments
��?? ������ contexts <-- React Context
��?? ������ pages <-- Next.js�̃y�[�W
��?? ������ services <-- Web API Client
��?? ������ themes <-- styled-components�̃e�[�}
��?? ������ types <-- �^��`
��?? ������ utils <-- �ėp�֐�
������ tsconfig.json
```
