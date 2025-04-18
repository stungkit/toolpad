import * as React from 'react';
import PropTypes from 'prop-types';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Link, useDemoRouter } from '@toolpad/core/internal';
import { useActivePage } from '@toolpad/core/useActivePage';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import invariant from 'invariant';

const NAVIGATION = [
  {
    segment: 'inbox',
    title: 'Orders',
    pattern: 'inbox/:id',
  },
];

function Content({ router }) {
  const id = Number(router.pathname.replace('/inbox/', ''));

  const activePage = useActivePage();
  invariant(activePage, 'No navigation match');

  const title = `Item ${id}`;
  const path = `${activePage.path}/${id}`;

  const breadcrumbs = [...activePage.breadcrumbs, { title, path }];

  return (
    // preview-start
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
      {/* preview-end */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href={`/inbox/${id - 1}`}>previous</Link>
        <Link href={`/inbox/${id + 1}`}>next</Link>
      </Box>
    </PageContainer>
  );
}

Content.propTypes = {
  router: PropTypes.shape({
    Link: PropTypes.elementType,
    navigate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    searchParams: PropTypes.instanceOf(URLSearchParams).isRequired,
  }).isRequired,
};

export default function CustomPageContainer() {
  const router = useDemoRouter('/inbox/123');

  const theme = useTheme();

  let content = (
    <PageContainer>
      <Link href={`/inbox/123`}>Item 123</Link>
    </PageContainer>
  );

  if (router.pathname.startsWith('/inbox/')) {
    content = <Content router={router} />;
  }

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
      <Paper sx={{ width: '100%' }}>{content}</Paper>
    </AppProvider>
  );
}
