import { Helmet } from 'react-helmet-async';
// sections
import CoursesView from 'src/sections/courses/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Cusrsos</title>
      </Helmet>

      <CoursesView />
    </>
  );
}
