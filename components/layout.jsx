import Header from '../components/header';
import {Container} from 'semantic-ui-react';

const Layout = ({ children }) => {
 return (
  <Container>
   <Header />
   {children}
  </Container>
 );
};

export default Layout;
