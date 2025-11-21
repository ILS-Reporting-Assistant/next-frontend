/* eslint-disable react/no-unknown-property */
import React, { Fragment } from 'react'

export const AppFonts = () => (
  <Fragment>
    <style global jsx>{`
      /* Avenir ################################################## */
      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir/AvenirNextLTPro-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir/AvenirNextLTPro-Bold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
        font-weight: 500;
      }

      @font-face {
        font-family: 'Avenir';
        src: url('/fonts/Avenir/AvenirNextLTPro-Italic.otf') format('opentype');
        font-weight: normal;
        font-style: italic;
        font-display: swap;
      }
    `}</style>
  </Fragment>
)

export default AppFonts
