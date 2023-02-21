export type ConfigContents = ConfigSection[]

export type ConfigSection = {
  title: string
  description?: string
  contents: ConfigEntry[]
}

export type ConfigEntry = {
  key: string
  name: string
  description?: string
  domain?: string[]
}

export type Config = {
  'display-name': string
  'display-simulaton-enabled': boolean
  'display-simulaton-ratio': string

  'font-family': string
  'font-size': string
  'font-weight-regular': string
  'font-weight-bold': string
  'font-feature-settings': string
  'primary-color': string

  'line-height': string
  'text-align': string
  'container-align-x': string
  'container-align-y': string
  'window-padding': string

  'file-encoding': string
  'styles-user-defined': string
}

export const baseConfig: Config = {
  'display-name': '',
  'display-simulaton-enabled': false,
  'display-simulaton-ratio': '5 / 4',

  'font-family': '"Pretendard Variable", Pretendard',
  'font-size': '7.5',
  'font-weight-regular': '600',
  'font-weight-bold': '800',
  'font-feature-settings': '"calt", "case"',
  'primary-color': '#fbcfe8',

  'line-height': '140',
  'text-align': 'center',
  'container-align-x': 'center',
  'container-align-y': 'center',
  'window-padding': '5',

  'file-encoding': 'utf-8',
  'styles-user-defined': '',
}

export const configContents: ConfigContents = [
  {
    title: '디스플레이',
    description: '송출 화면과 관련된 설정',
    contents: [
      {
        key: 'display-name',
        name: '송출 창 출력 모니터',
        description:
          '값을 비워 두면 주 모니터의 다음 모니터에 송출 창을 띄웁니다.',
      },
      {
        key: 'display-simulaton-enabled',
        name: '화면비 시뮬레이션',
        description: '특정 화면비에서 어떻게 송출될지를 테스트합니다.',
      },
      {
        key: 'display-simulaton-ratio',
        name: '시뮬레이션할 화면비',
        description:
          '`m:n`을 `m / n` 형태로 입력합니다. m과 n을 약분하지 않아도 괜찮습니다.',
      },
    ],
  },
  {
    title: '글자',
    description: '송출 창의 글자 속성',
    contents: [
      {
        key: 'font-family',
        name: '폰트',
        description:
          'CSS의 `font-family`를 입력하듯이, 우선순위대로 쉼표로 구분하여 나열합니다. 폰트명에 공백이 포함되어 있다면 폰트명을 따옴표로 감싸야 합니다.',
      },
      {
        key: 'font-size',
        name: '글자 크기',
        description: '화면 높이의 %',
      },
      {
        key: 'font-weight-regular',
        name: '일반 글자 굵기',
      },
      {
        key: 'font-weight-bold',
        name: '굵은 글자 굵기',
      },
      {
        key: 'font-feature-settings',
        name: 'TrueType 기능',
      },
      {
        key: 'primary-color',
        name: '강조 색상',
      },
    ],
  },
  {
    title: '문단 및 컨테이너',
    description: '송출 창의 문단 및 텍스트 박스 속성',
    contents: [
      {
        key: 'line-height',
        name: '줄 높이 (%)',
      },
      {
        key: 'text-align',
        name: '텍스트 정렬',
        description: '텍스트 박스 안에서의 텍스트 정렬 방향',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'container-align-x',
        name: '컨테이너 좌우 정렬',
        description: '텍스트 박스 자체의 좌우 위치',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'container-align-y',
        name: '컨테이너 상하 정렬',
        description: '텍스트 박스 자체의 상하 위치',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'window-padding',
        name: '송출 창 여백 (%)',
        description:
          '상-우-하-좌 순서로, 공백으로 구분하여 입력합니다. 누락된 쪽은 반대쪽의 값이 적용됩니다. 단, CSS와는 다르게 좌우 여백은 화면 너비 비례, 상하 여백은 화면 높이 비례입니다.',
      },
    ],
  },
  {
    title: '고급',
    contents: [
      {
        key: 'file-encoding',
        name: '파일 인코딩',
        domain: ['utf-8'],
      },
      {
        key: 'styles-user-defined',
        name: '사용자 정의 스타일시트 파일',
      },
    ],
  },
]
