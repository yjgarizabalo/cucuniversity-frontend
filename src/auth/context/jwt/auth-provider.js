import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import { endpoints, getFetch, postFetch, updateFetch } from 'src/utils/axios';
//
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
  errorMsg: '',
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
      errorMsg: '',
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
      errorMsg: '',
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
      errorMsg: '',
    };
  }
  if (action.type === 'ERRORMSG') {
    return {
      ...state,
      user: null,
      errorMsg: action.payload.errorMsg,
      loading: false,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get('token');
  const inactiveUserError = searchParams.get('ms');

  const initialize = useCallback(async () => {
    if (inactiveUserError) {
      dispatch({
        type: 'ERRORMSG',
        payload: {
          errorMsg: inactiveUserError,
        },
      });
      return;
    }
    try {
      if (tokenFromUrl) {
        setSession(tokenFromUrl);
        sessionStorage.setItem(STORAGE_KEY, tokenFromUrl);
      }

      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await getFetch(endpoints.auth.me);

        const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [tokenFromUrl, inactiveUserError]);

  useEffect(() => {
    initialize();
    if (!state.user && !state.loading && window.location.pathname === 'http://localhost:5173/auth/jwt/login') {
      console.log('estoy aqui');
      router.push('/');
    }
  }, [initialize, router, state.loading, state.user]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = await postFetch(endpoints.auth.auth, data);

    const { token, user } = response.data;

    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, identification, phoneNumber, gender, program, documentType) => {
      const data = {
        password,
        identification,
        phoneNumber,
        gender,
        program,
        documentType,
      };

      const response = await updateFetch(`${endpoints.users}/email/${email}`, data);

      const { token, user } = response.data;

      setSession(token);

      sessionStorage.setItem(STORAGE_KEY, token);

      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      errorMsg: state.errorMsg,
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status, state.errorMsg]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
