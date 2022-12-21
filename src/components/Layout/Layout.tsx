import { PropsWithChildren } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import { Box } from '@mui/material';
import links from '../../constants/links';
import InstructionsBar from '../InstructionsBar';

type TLayout = PropsWithChildren<{
  onFooterClick: () => void;
}>;

function Layout({ children, onFooterClick }: TLayout) {
  return (
    <>
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: '1fr auto',

        }}
      >
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <NavBar links={links} />
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: '750px',
              padding: '48px 16px',
            }}
          >
            {children}
            <InstructionsBar onClick={onFooterClick} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
