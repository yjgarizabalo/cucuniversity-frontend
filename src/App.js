// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
import { SnackbarProvider } from 'src/components/snackbar';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export default function App() {

  const charAt = `

  ██████ ╗██╗   ██╗ ██████╗
  ██╔════╝██║   ██║██╔════╝
  ██║     ██║   ██║██║
  ██║     ██║   ██║██║
  ╚██████╗╚██████╔╝╚██████╗
   ╚═════╝ ╚═════╝  ╚═════╝
  `

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <SnackbarProvider>
              <MotionLazy>
                <SettingsDrawer />
                <ProgressBar />
                <AuthConsumer>
                  <Router />
                </AuthConsumer>
              </MotionLazy>
            </SnackbarProvider>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>

    </AuthProvider>
  );
}
