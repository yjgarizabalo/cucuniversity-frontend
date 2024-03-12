import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      component="img"
      src="/logo/logo_cucuniversity.svg"
      sx={{ width: 150, height: 40, cursor: 'pointer', ...sx }}
    />
  );



  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;


// import { forwardRef } from 'react';
// // @mui
// import Link from '@mui/material/Link';
// import Box, { BoxProps } from '@mui/material/Box';
// // routes
// import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

// export interface LogoProps extends BoxProps {
//   disabledLink?: boolean;
// }

// const Logo = forwardRef<HTMLDivElement, LogoProps>(
//   ({ disabledLink = false, sx }, ref) => {


//     // OR using local (public folder)
//     // -------------------------------------------------------
//     const logo = (
//       <Box
//         component="img"
//         src="/logo/logo_full.svg"
//         sx={{ width: 150, height: 40, cursor: 'pointer', ...sx }}
//       />
//     );


//     if (disabledLink) {
//       return logo;
//     }

//     return (
//       <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
//         {logo}
//       </Link>
//     );
//   }
// );

// export default Logo;
