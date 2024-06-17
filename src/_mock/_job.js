// assets
import { countries } from 'src/assets/data';
//
import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const JOB_DETAILS_TABS = [
  { value: 'content', label: 'Job Content' },
  { value: 'candidates', label: 'Candidates' },
];

export const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'DevOps',
  'System Engineer',
];

export const JOB_WORKING_HOURS = [
  'De lunes a viernes',
  'Disponibilidad de fin de semana',
  'Turno de dia',
];

export const JOB_BENEFIT_OPTIONS = [
  { value: 'Parqueadero gratis', label: 'Parqueadero gratis' },
  { value: 'Comisiones', label: 'Comisiones' },
  { value: 'Viajes', label: 'Viajes' },
];

export const JOB_EXPERIENCE_OPTIONS = [
  { value: 'Sin Experiencia', label: 'Sin Experiencia' },
  { value: '1 años exp', label: '1 año exp' },
  { value: '2 años exp', label: '2 años exp' },
  { value: 'mayor a 3 años exp', label: 'mayor a 3 años exp' },
];

export const JOB_LOCATION = [
  'Colombia',
  'Mexico',
  'Argentina',
  'Chile',
  'Peru',
  'Ecuador',
  'Venezuela',
  'Guatemala',
  'Cuba',
  'Bolivia',
  'Honduras',
  'Paraguay',
  'El Salvador',
  'Nicaragua',
  'Costa Rica',
  'Puerto Rico',
  'Panama',
  'Uruguay',
  'Jamaica',
  'Trinidad y Tobago',
  'Guyana',
  'Surinam',
  'Barbados',
  'Haiti',
  'Bahamas',
  'Canada',
  'United States',
  'Greenland',
];

// ----------------------------------------------------------------------


export const _jobs = [...Array(12)].map((_, index) => {
  const publish = index % 3 ? 'published' : 'draft';

  const salary = {
    type: (index % 5 && 'Custom') || 'Hourly',
    price: _mock.number.price(index),
    negotiable: _mock.boolean(index),
  };

  const benefits = JOB_BENEFIT_OPTIONS.slice(0, 3).map((option) => option.label);

  const experience = JOB_EXPERIENCE_OPTIONS.map((option) => option.label)[index] || JOB_EXPERIENCE_OPTIONS[1].label;


  const company = {
    name: _mock.companyName(index),
    phoneNumber: _mock.phoneNumber(index),
    fullAddress: _mock.fullAddress(index),
  };

  const locations = countries.slice(1, index + 2).map((option) => option.label);

  return {
    id: _mock.id(index),
    salary,
    publish,
    company,
    benefits,
    locations,
    experience,
    workingSchedule: JOB_WORKING_HOURS.slice(0, 2),
  };
});
