import React from 'react';
import { Card, Button, Grid} from 'semantic-ui-react';
import Layout from '../components/layout';
import contractInterface from '../ethereum/factory';

function HomePage({ deployedCampaigns }) {
 const [items, updateItems] = React.useState([]);
 React.useEffect(() => {
  const temp = deployedCampaigns.map((address) => {
   return {
    header: address,
    description: <a>View Campaign</a>,
    fluid: true,
   };
  });

  updateItems(temp);
 }, []);
 return (
  <Layout>
  <Grid>
  <Grid.Column width={12}>
   <Card.Group items={items} />
   </Grid.Column>
   <Grid.Column width={3}>
   <Button primary>Create Campaign</Button>
   </Grid.Column>
   </Grid>
  </Layout>
 );
}

export const getStaticProps = async () => {
 const deployedCampaigns = await contractInterface.methods
  .getDeployedCampaigns()
  .call();
 return {
  props: { deployedCampaigns },
 };
};

export default HomePage;
