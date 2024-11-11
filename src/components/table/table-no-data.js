import PropTypes from 'prop-types';
// @mui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

export default function TableNoData({ notFound, title, sx }) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12} sx={{ p: 0, width: '100%' }}>
          <EmptyContent
            filled
            title={title || "No hay información disponible"}
            sx={{
              py: 10,
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}

TableNoData.propTypes = {
  notFound: PropTypes.bool,
  title: PropTypes.string,
  sx: PropTypes.object,
};
