import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto",
        italic: "Roboto",
      },
      200: {
        normal: "Roboto",
        italic: "Roboto",
      },
      300: {
        normal: "Roboto",
        italic: "Roboto",
      },
      400: {
        normal: "Roboto",
        italic: "Roboto",
      },
      500: {
        normal: "Roboto",
      },
      600: {
        normal: "Roboto",
        italic: "Roboto",
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
});
