'use strict';

export const RACE = 'RACE';
export const RELAY = 'RELAY';

export const COLORS = {
  PRIMARY: '#010A1E',
  SECONDARY: '#FF0000',
  NAV_BUTTON: '#fff',
  WATCH_BUTTON: '#fff',
  BUTTON_UNDERLAY: '#f3f3f3',
  BUTTON_START: '#FF0000',
  FONT_LIGHT: '#fff',
  FONT_MEDIUM: '#433C3C',
  FONT_ERRROR: '#FF0000',
  BACKGROUND_LIGHT: '#fff',
  BACKGROUND_CONTAINER: 'lightgray',
  BACKGROUND_DARK: '#000',
  ATHLETE1: '#00D3FF',
  ATHLETE2: '#0840F4',
  ATHLETE3: '#073184',
  ATHLETE4: '#010A1E',
  ATHLETE5: '#0CE8D1',
};

COLORS.TABS = {
  SELECTED: COLORS.SECONDARY,
  UNSELECTED: COLORS.PRIMARY,
};

export const ICONS = {
  TABS: {
    WATCH: 'ios-stopwatch',
    ATHLETES: 'ios-contacts',
    HISTORY: 'ios-list-box',
  },
};

export const BASE_NAV_OPTIONS = {
  headerTintColor: COLORS.NAV_BUTTON,
  headerStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
  headerTitleStyle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
  },
};
