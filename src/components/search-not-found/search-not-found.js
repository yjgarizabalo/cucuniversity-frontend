import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------

export default function SearchNotFound({ query, sx, ...other }) {
  return query ? (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        No se encontraron resultados
      </Typography>

      <Typography variant="body2">
        No se encontraron resultados &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Prueba palabras clave diferentes.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      Ingresa palabras clave
    </Typography>
  );
}

SearchNotFound.propTypes = {
  query: PropTypes.string,
  sx: PropTypes.object,
};
