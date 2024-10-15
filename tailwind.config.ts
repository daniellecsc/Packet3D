/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(.25,.4,.45,1.4)',
      },
      transitionDuration: {
        'custom-duration': '0.8s',
      },
      colors: {
        teal: {
          navbar_active: '#2DD3FF',
          panel_active: '#409BB4',
          panel_inactive: '#185869',
          button_shade1: '#22B2D8',
          button_shade2: '#2FA0BE',
          button_shade3: '#1E7289',
          button_shade4: '#236476',
          inputf_bg: '#0A3A42',
          inputf_border: '#1F5A62',
          icons: '#409BB4',
          neongreen: '#1eedd9',
        },

        white: {
          panels: '#EFEFEF',
          headline_titles_description: '#F3F3F3',
          subheading_details: '#C5C5C5',
          navbar25percent: '#FFFFFF',
          inactive_titles_desc: '#A2A2A2',
          lightgray_desc: '#828282',
        },

        yellow: {
          title: '#F3C27C',
        },

        darkTeal: {
          bgColor: '#031C22',
          hoverdark: '#195766',
          footerbg: '#09181D',
        },
      },

      backgroundImage: {
        'network-bg': "url('/NetworkBG.png')",
        'bottom-side-shadow': "url('/BottomSideShadow.png')",
        'top-side-shadow': "url('/TopSideShadow.png')",
        'side-blob': "url('/SideBlob.png')",
        'bottom-panel': "url('/BottomPanel.png')",
        'vid-shadow': "url('/BottomShadow.png')",
        'smoke-bg': "url('/Smoke.png')",
        'contacttop-bg': "url('/contactTop.png')",
        'contactbottom-bg': "url('/contactBottom.png')",
        'neon-bg': "url('/neon.png')",
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
    },
  },
  plugins: [],
};
