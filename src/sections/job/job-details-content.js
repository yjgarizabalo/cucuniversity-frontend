import PropTypes from 'prop-types';
// @mui
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

export default function JobDetailsContent({ job }) {
  const {
    title,
    description,
    benefits,
    createAt,
    workingHours,
    salary,
    experience,
    company,
    location,
    roleJob
  } = job || {};

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">{title}</Typography>

      <Markdown children={description} />

      <Stack spacing={2}>
        <Typography variant="h6">Beneficios</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {!benefits ?
            <Typography variant="body2" color="text.secondary">
              No hay beneficios
            </Typography> :
            <Chip label={benefits} />
          }
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Rol o Cargo</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {!roleJob ?
            <Typography variant="body2" color="text.secondary">
              No hay Rol
            </Typography> :
            <Chip label={roleJob} />
          }
        </Stack>
      </Stack>
    </Stack>
  );

  const renderGeneral = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Fecha de publicación',
          value: fDate(createAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Horario Laboral',
          value: workingHours,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Salario',
          value: fCurrency(salary),
          icon: <Iconify icon="solar:wad-of-money-bold" />,
        },
        {
          label: 'Experiencia',
          value: experience,
          icon: <Iconify icon="carbon:skill-level-basic" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  const renderCompany = (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={2}
      direction="row"
      sx={{ p: 3, borderRadius: 2, mt: 3 }}
    >
      <Avatar
        alt={job.company.name}
        src={job.company.logo}
        variant="rounded"
        sx={{ width: 64, height: 64 }}
      />

      <Stack spacing={1}>
        <Typography variant="subtitle1">{company}</Typography>
        <Typography variant="body2">{location}</Typography>
      </Stack>
    </Stack>
  );

  return (

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          {renderContent}
        </Grid>

        <Grid xs={12} md={4}>
          {renderGeneral}

          {renderCompany}
        </Grid>
      </Grid>
  );

}


JobDetailsContent.propTypes = {
  job: PropTypes.object,
};
