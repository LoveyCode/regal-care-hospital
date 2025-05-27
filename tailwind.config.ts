import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"; // ✅ Use import, not require
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
     extend: {
      screens: {
        '2xl': '1366px', // ✅ custom 2xl breakpoint
      },

      colors: {
        green: {
          500: "#24AE7C",
          600: "#0D2A1F",
        },
        blue: {
          100: "#D1ECFF",
          300: "#0080DB",
          400: "#71B5E6",
          500: "#79B5EC",
          600: "#152432",
        },
        yellow: {
          600: "#D28B21",
        },
        red: {
          400: "#FE0606",
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        condensed: ['var(--font-roboto-condensed)', ...fontFamily.sans],
      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      safelist: [
        {
          pattern: /after:animate-aurora/,
        },
      ],
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        aurora: {
          "0%": {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          "100%": {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },

        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        aurora: "aurora 60s linear infinite", // ✅ Correctly defined here
        scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
    
        
      },
    },
  },

  variants: {
    extend: {
      animation: ["after"],
    },
  },

    plugins: [
    require('@tailwindcss/typography'),
   
  ],

};

export default config;
