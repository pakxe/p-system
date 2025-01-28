const PRIMITIVE_COLORS = {
  gray: {
    50: '#F9F8FD',
    100: '#F1F0F5',
    200: '#E7E6EB',
    300: '#D6D5DA',
    400: '#B2B1B6',
    500: '#929195',
    600: '#6A696D',
    700: '#56555A',
    800: '#38373B',
    900: '#18171B',
  },
  orange: {
    50: '#FFF8F1',
    100: '#FEECDC',
    200: '#FCD9BD',
    300: '#FDBA8C',
    400: '#FF8A4C',
    500: '#FF682A',
    600: '#F05117',
    700: '#D03801',
    800: '#B43403',
    900: '#8A2C0D',
  },
} as const;

const colors = {
  primary: PRIMITIVE_COLORS.orange[500],

  black: PRIMITIVE_COLORS.gray[800],
  white: PRIMITIVE_COLORS.gray[50],

  // 반투명한 검정색
  float: 'rgba(0, 0, 0, 0.3)',
  floatHighlight: 'rgba(0, 0, 0, 0.7)',
} as const;

const theme = {
  colors,
} as const;

export default theme;
