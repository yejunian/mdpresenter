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

  'font-family':
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", NanumGothic, "Malgun Gothic", "Helvetica Neue", "Arial", sans-serif',
  'font-size': '7.5',
  'font-weight-regular': '600',
  'font-weight-bold': '800',
  'font-feature-settings': '"calt", "case"',
  'primary-color': '#99f6e4',

  'line-height': '140',
  'text-align': 'center',
  'container-align-x': 'center',
  'container-align-y': 'center',
  'window-padding': '5',

  'file-encoding': 'utf-8',
  'styles-user-defined': '',
}

export const configContents: ConfigContents = [
  // {
  //   title: '디스플레이',
  //   description: '송출 화면과 관련된 설정',
  //   contents: [
  //     {
  //       key: 'display-name',
  //       name: '송출 창 출력 모니터',
  //       description:
  //         '값을 비워 두면 주 모니터의 다음 모니터에 송출 창을 띄웁니다.',
  //     },
  //     {
  //       key: 'display-simulaton-enabled',
  //       name: '화면비 시뮬레이션',
  //       description: '특정 화면비에서 어떻게 송출될지를 테스트합니다.',
  //     },
  //     {
  //       key: 'display-simulaton-ratio',
  //       name: '시뮬레이션할 화면비',
  //       description:
  //         '`m:n`을 `m / n` 형태로 입력합니다. m과 n을 약분하지 않아도 괜찮습니다.',
  //     },
  //   ],
  // },
  {
    title: '글자',
    description: '송출 창의 글자 속성',
    contents: [
      {
        key: 'font-family',
        name: '폰트',
        description:
          'CSS의 `font-family` 속성을 입력하듯이 폰트명을 우선순위에 따라 쉼표로 구분하여 나열합니다. 공백이 포함되어 있는 폰트명은 따옴표로 감싸야 합니다.',
      },
      {
        key: 'font-size',
        name: '글자 크기 (%)',
        description:
          '기본 글자 크기를 화면 높이에 대한 백분율로 ‘%’를 제외하고 입력합니다.',
      },
      {
        key: 'font-weight-regular',
        name: '일반 글자 굵기',
        description:
          '일반 글자의 굵기를 입력합니다. 일반적으로 Regular 굵기는 400이지만, 필요에 따라 다른 굵기를 지정할 수 있습니다. 폰트가 지원하지 않는 굵기로 지정한 경우, 의도와 다르게 표시될 수 있습니다.',
      },
      {
        key: 'font-weight-bold',
        name: '굵은 글자 굵기',
        description:
          '**굵게** 처리되는 글자의 굵기를 입력합니다. 일반적으로 Bold 굵기는 700이지만, 필요에 따라 다른 굵기를 지정할 수 있습니다. 폰트가 지원하지 않는 굵기로 지정한 경우, 의도와 다르게 표시될 수 있습니다.',
      },
      {
        key: 'font-feature-settings',
        name: 'OpenType 기능',
        description:
          'OpenType 기능 설정을 쉼표로 구분하여 나열합니다. 설정 방법은 “MDN Web Docs”의 “font-feature-settings” 문서와, 사용 중인 폰트의 소개·설명 페이지를 참고합니다.',
      },
      {
        key: 'primary-color',
        name: '강조 색상',
        description: '제목 컬러 등에 사용할 강조 색상을 입력합니다.',
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
        description:
          '줄 높이를 글자 크기에 대한 백분율로 ‘%’를 제외하고 입력합니다.',
      },
      {
        key: 'text-align',
        name: '텍스트 정렬',
        description: '텍스트 박스 안에서의 텍스트 정렬 방향을 입력합니다.',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'container-align-x',
        name: '컨테이너 좌우 정렬',
        description: '텍스트 박스 자체의 좌우 정렬 방향을 입력합니다.',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'container-align-y',
        name: '컨테이너 상하 정렬',
        description: '텍스트 박스 자체의 상하 정렬 방향을 입력합니다.',
        domain: ['start', 'center', 'end'],
      },
      {
        key: 'window-padding',
        name: '송출 창 여백 (%)',
        description:
          '상-우-하-좌 순서로, 각 변의 여백을 공백으로 구분하여 ‘%’를 제외하고 입력합니다. 누락된 쪽은 반대쪽의 값이 적용됩니다. 단, CSS와는 다르게 좌우 여백은 화면 너비 비례, 상하 여백은 화면 높이 비례입니다.',
      },
    ],
  },
  // {
  //   title: '고급',
  //   contents: [
  //     {
  //       key: 'file-encoding',
  //       name: '파일 인코딩',
  //       description: '파일을 불러올 때 적용할 인코딩 방식을 입력합니다. Windows 10 19H1보다 낮은 버전이 아니라면 ‘utf-8’을 사용할 것을 권장합니다.',
  //       domain: ['utf-8'],
  //     },
  //     {
  //       key: 'styles-user-defined',
  //       name: '사용자 정의 스타일시트 파일',
  //       description: '사용자 정의 스타일시트 파일의 경로를 입력합니다.',
  //     },
  //   ],
  // },
]
