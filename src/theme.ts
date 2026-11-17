/**
 * Saffron & Smoke — the brand, written once.
 *
 * One theme drives all four roots (Email, Page, Document, Canvas): the same
 * saffron / charcoal / cream palette, the same serif + sans pairing, the same
 * named styles. Inside the theme, tokens are written "{colors.saffron}"; in
 * templates they are read with token("colors.saffron").
 */
import { defineTheme } from "@hyper-elements/react";

export const SERIF = "'Cormorant Garamond', Garamond, Georgia, serif";
export const SANS = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** The palette as plain constants, for Svg shapes (which take literal colours). */
export const PALETTE = {
  cream: "#FAF5EB",
  parchment: "#F2EAD9",
  charcoal: "#221C14",
  charcoalSoft: "#32291D",
  inkSoft: "#4A4132",
  muted: "#7A6E5C",
  border: "#E3D7BF",
  saffron: "#E39B1B",
  saffronDeep: "#A96E07",
  saffronDark: "#C98A12",
  ember: "#A63A1E",
  onDark: "#FAF5EB",
  onDarkMuted: "#CBBFA6",
  onDarkFaint: "#9A8F7A",
} as const;

/**
 * The web fonts, as the roots' `fonts` prop. The woff2 files live on
 * fonts.gstatic.com (the URLs the Google Fonts CSS API returns for the latin
 * subset); every stack falls back to Georgia / Helvetica where a client
 * doesn't load web fonts. The same families are given as WOFF files to
 * renderPdf / renderImage (see src/fonts.ts) — those engines never fetch.
 */
export const WEB_FONTS = [
  {
    family: "Cormorant Garamond",
    src: "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
    format: "woff2",
    weight: "300 700",
  },
  {
    family: "Cormorant Garamond",
    src: "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2",
    format: "woff2",
    weight: "300 700",
    style: "italic",
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
    format: "woff2",
    weight: "100 900",
  },
] as const;

export const saffronSmoke = defineTheme({
  colors: {
    background: PALETTE.cream,
    foreground: PALETTE.charcoal,
    primary: PALETTE.saffron,
    primaryForeground: PALETTE.charcoal,
    muted: PALETTE.muted,
    border: PALETTE.border,
    saffron: PALETTE.saffron,
    saffronDeep: PALETTE.saffronDeep,
    ember: PALETTE.ember,
    charcoal: PALETTE.charcoal,
    charcoalSoft: PALETTE.charcoalSoft,
    cream: PALETTE.cream,
    parchment: PALETTE.parchment,
    inkSoft: PALETTE.inkSoft,
    onDark: PALETTE.onDark,
    onDarkMuted: PALETTE.onDarkMuted,
  },
  fonts: {
    body: SANS,
    heading: SERIF,
  },
  fontSizes: {
    body: 16,
    small: 13,
    eyebrow: 12,
  },
  lineHeights: {
    body: 1.6,
  },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 44, fontWeight: 500, lineHeight: 1.05, letterSpacing: -0.5, mobile: { fontSize: 34 } },
          2: { fontSize: 32, fontWeight: 500, lineHeight: 1.1, letterSpacing: -0.5, mobile: { fontSize: 26 } },
          3: { fontSize: 22, fontWeight: 600, lineHeight: 1.2 },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.primary}",
      color: "{colors.primaryForeground}",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      padding: [16, 28],
      borderRadius: 2,
      hover: { backgroundColor: PALETTE.saffronDark },
    },
  },
  styles: {
    /** Small caps label above a heading. */
    eyebrow: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: "{colors.saffronDeep}",
    },
    /** The same, on a dark band. */
    eyebrowLight: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: "{colors.onDarkMuted}",
    },
    /** A parchment panel (tasting-menu card, chef's note). */
    card: {
      backgroundColor: "{colors.parchment}",
      padding: 28,
      gap: 12,
      borderRadius: 4,
    },
    /** One course in the ruled list: name, description, price. */
    courseRow: {
      gap: 16,
      padding: [14, 0],
      border: { top: { width: 1, style: "solid", color: "{colors.border}" } },
    },
    /** A course's price, set in the serif. */
    price: {
      fontFamily: SERIF,
      fontSize: 21,
      fontWeight: 600,
      lineHeight: 1.2,
      textAlign: "right",
    },
    /** Small muted supporting text. */
    smallMuted: {
      fontSize: 13,
      lineHeight: 1.6,
      color: "{colors.muted}",
    },
  },
});

/** Types every token() path and style.apply name in this project. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof saffronSmoke;
  }
}
