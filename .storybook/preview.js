
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import { withVuetify } from '@socheatsok78/storybook-addon-vuetify/dist/decorators'

export const decorators = [
  withVuetify
]
