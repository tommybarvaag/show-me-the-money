import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

export type { VariantProps } from "@stitches/react";
export type CSS = Stitches.CSS<typeof config>;

export const { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config } =
  createStitches({
    theme: {
      colors: {
        white: "hsl(360, 100%, 100%)",
        black: "hsl(0, 0%, 0%)",
        background: "hsl(0, 0%, 7%)",
        main: "$black",
        mainDark: "hsl(0, 0%, 0%)",
        secondary: "$white",
        secondaryDark: "hsl(0, 0%, 63%)",
        link: "$green",
        text: "$secondary",
        textDark: "$secondaryDark",
        gray: "hsl(0, 0%, 20%)",
        grayDark: "hsl(0, 0%, 7%)",
        grayLight: "hsl(0, 0%, 26%)",
        grayLighter: "hsl(0, 0%, 31%)",
        grayLightest: "hsl(0, 0%, 37%)",
        green: "hsl(158, 64%, 52%)",
        greenDark: "hsl(163, 94%, 24%)",
        greenLight: "hsl(156, 72%, 67%)",
        greenLighter: "hsl(152, 76%, 80%)",
        greenLightest: "hsl(149, 80%, 90%)",
        red: "hsl(0, 91%, 71%)",
        redDark: "hsl(0, 74%, 42%)",
        redLight: "hsl(0, 94%, 82%)",
        redLighter: "hsl(0, 96%, 89%)",
        redLightest: "hsl(0, 93%, 94%)",
        // Semantic colors
        hiContrast: "$slate12",
        // loContrast: '$slate1',
        loContrast: "white",
        canvas: "hsl(0 0% 93%)",
        panel: "$main",
        avatarImageFallback: "$gray",
        transparentPanel: "hsl(0 0% 0% / 97%)",
        shadowLight: "hsl(206 22% 7% / 35%)",
        shadowDark: "hsl(206 22% 7% / 20%)",
        overlay: "rgba(0, 0, 0, 0.8)"
      },
      fonts: {
        default: "-apple-system, system-ui, sans-serif"
      },
      space: {
        1: "4px",
        2: "8px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "40px",
        7: "48px",
        8: "56px",
        9: "64px",
        10: "62px",
        11: "80px",
        12: "96px",
        13: "120px",
        14: "140px",
        15: "180px",
        16: "200px",
        17: "300px"
      },
      sizes: {
        1: "4px",
        2: "8px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "40px",
        7: "48px",
        8: "56px",
        9: "64px",
        10: "62px",
        11: "80px",
        12: "96px",
        13: "120px",
        14: "140px",
        15: "180px",
        16: "200px",
        17: "300px",
        logoFull: "170px",
        smContainer: "384px",
        mdContainer: "672px",
        lgContainer: "1024px",
        xlContainer: "1280px",
        scrollBar: "10px",
        calendarContainer: "512px",
        themeSelect: "88px"
      },
      fontSizes: {
        tiny: "10px",
        1: "12px",
        2: "14px",
        3: "16px",
        4: "18px",
        5: "20px",
        6: "26px",
        7: "32px",
        8: "40px",
        9: "56px",
        10: "64px",
        11: "72px",
        12: "96px",
        13: "120px"
      },
      radii: {
        1: "2px",
        2: "4px",
        3: "6px",
        4: "8px",
        5: "12px",
        6: "24px",
        round: "50%",
        pill: "9999px"
      },
      zIndices: {
        1: "100",
        2: "200",
        3: "300",
        4: "400",
        max: "999"
      },
      shadows: {
        card: "0 0 0 1px $colors$gray",
        input: "0 0 0 2px $colors$gray",
        select: "0 0 0 1px $colors$gray",
        selectHover: "0 0 0 1px $colors$secondary",
        inputHover: "0 0 0 2px $colors$secondary",
        inputActive: "0 0 0 2px $colors$secondary",
        inputFocus: "0 0 0 2px $colors$secondary",
        alertInfo: "0 0 0 1px $colors$gray",
        alertSuccess: "0 0 0 1px $colors$green",
        alertWarning: "0 0 0 1px $colors$red",
        alertError: "0 0 0 1px $colors$red"
      },
      letterSpacings: {
        1: "1x",
        2: "2px",
        3: "3px",
        4: "4px",
        normal: "normal",
        caps: "4px",
        avatarImageFallback: "$2"
      }
    },
    media: {
      bp1: "(min-width: 600px)",
      bp2: "(min-width: 900px)",
      bp3: "(min-width: 1200px)",
      bp4: "(min-width: 1800px)",
      motion: "(prefers-reduced-motion)",
      hover: "(any-hover: hover)",
      dark: "(prefers-color-scheme: dark)",
      light: "(prefers-color-scheme: light)"
    },
    utils: {
      p: (value: Stitches.PropertyValue<"padding">) => ({
        padding: value
      }),
      pt: (value: Stitches.PropertyValue<"paddingTop">) => ({
        paddingTop: value
      }),
      pr: (value: Stitches.PropertyValue<"paddingRight">) => ({
        paddingRight: value
      }),
      pb: (value: Stitches.PropertyValue<"paddingBottom">) => ({
        paddingBottom: value
      }),
      pl: (value: Stitches.PropertyValue<"paddingLeft">) => ({
        paddingLeft: value
      }),
      px: (value: Stitches.PropertyValue<"paddingLeft">) => ({
        paddingLeft: value,
        paddingRight: value
      }),
      py: (value: Stitches.PropertyValue<"paddingTop">) => ({
        paddingTop: value,
        paddingBottom: value
      }),

      m: (value: Stitches.PropertyValue<"margin">) => ({
        margin: value
      }),
      mt: (value: Stitches.PropertyValue<"marginTop">) => ({
        marginTop: value
      }),
      mr: (value: Stitches.PropertyValue<"marginRight">) => ({
        marginRight: value
      }),
      mb: (value: Stitches.PropertyValue<"marginBottom">) => ({
        marginBottom: value
      }),
      ml: (value: Stitches.PropertyValue<"marginLeft">) => ({
        marginLeft: value
      }),
      mx: (value: Stitches.PropertyValue<"marginLeft">) => ({
        marginLeft: value,
        marginRight: value
      }),
      my: (value: Stitches.PropertyValue<"marginTop">) => ({
        marginTop: value,
        marginBottom: value
      }),

      ta: (value: Stitches.PropertyValue<"textAlign">) => ({ textAlign: value }),

      fd: (value: Stitches.PropertyValue<"flexDirection">) => ({ flexDirection: value }),
      fw: (value: Stitches.PropertyValue<"flexWrap">) => ({ flexWrap: value }),

      ai: (value: Stitches.PropertyValue<"alignItems">) => ({ alignItems: value }),
      ac: (value: Stitches.PropertyValue<"alignContent">) => ({ alignContent: value }),
      jc: (value: Stitches.PropertyValue<"justifyContent">) => ({ justifyContent: value }),
      as: (value: Stitches.PropertyValue<"alignSelf">) => ({ alignSelf: value }),
      fg: (value: Stitches.PropertyValue<"flexGrow">) => ({ flexGrow: value }),
      fs: (value: Stitches.PropertyValue<"flexShrink">) => ({ flexShrink: value }),
      fb: (value: Stitches.PropertyValue<"flexBasis">) => ({ flexBasis: value }),

      bc: (value: Stitches.PropertyValue<"backgroundColor">) => ({
        backgroundColor: value
      }),

      br: (value: Stitches.PropertyValue<"borderRadius">) => ({
        borderRadius: value
      }),
      btrr: (value: Stitches.PropertyValue<"borderTopRightRadius">) => ({
        borderTopRightRadius: value
      }),
      bbrr: (value: Stitches.PropertyValue<"borderBottomRightRadius">) => ({
        borderBottomRightRadius: value
      }),
      bblr: (value: Stitches.PropertyValue<"borderBottomLeftRadius">) => ({
        borderBottomLeftRadius: value
      }),
      btlr: (value: Stitches.PropertyValue<"borderTopLeftRadius">) => ({
        borderTopLeftRadius: value
      }),

      bs: (value: Stitches.PropertyValue<"boxShadow">) => ({ boxShadow: value }),

      lh: (value: Stitches.PropertyValue<"lineHeight">) => ({ lineHeight: value }),

      ox: (value: Stitches.PropertyValue<"overflowX">) => ({ overflowX: value }),
      oy: (value: Stitches.PropertyValue<"overflowY">) => ({ overflowY: value }),

      pe: (value: Stitches.PropertyValue<"pointerEvents">) => ({ pointerEvents: value }),
      us: (value: Stitches.PropertyValue<"userSelect">) => ({
        WebkitUserSelect: value,
        userSelect: value
      }),

      userSelect: (value: Stitches.PropertyValue<"userSelect">) => ({
        WebkitUserSelect: value,
        userSelect: value
      }),

      size: (value: Stitches.PropertyValue<"width">) => ({
        width: value,
        height: value
      }),

      appearance: (value: Stitches.PropertyValue<"appearance">) => ({
        WebkitAppearance: value,
        appearance: value
      }),
      backgroundClip: (value: Stitches.PropertyValue<"backgroundClip">) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value
      })
    }
  });

export const lightTheme = createTheme("light-theme", {
  colors: {
    main: "$white",
    secondary: "$black",
    secondaryDark: "hsl(0, 0%, 33%)",
    background: "hsl(45, 12%, 94%)",
    gray: "hsl(0, 0%, 40%)",
    grayDark: "hsl(45, 12%, 94%)",
    grayLight: "hsl(0, 0%, 52%)",
    grayLighter: "hsl(0, 0%, 62%)",
    grayLightest: "hsl(0, 0%, 74%)",
    overlay: "rgba(0, 0, 0, 0.35)",
    avatarImageFallback: "$grayLightest"
  },
  shadows: {
    card: "0 2px 4px hsla(0, 0%, 0%, 0.1)",
    input: "0 0 0 1px $colors$grayLightest",
    inputHover: "0 0 0 1px $colors$secondary",
    inputActive: "0 0 0 1px $colors$secondary",
    inputFocus: "0 0 0 1px $colors$secondary"
  }
});
