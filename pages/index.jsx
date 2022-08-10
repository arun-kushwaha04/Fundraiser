import React from 'react';
import { Card, Button, Grid} from 'semantic-ui-react';
import {Link} from "../routes"
import Layout from '../components/layout';
import contractInterface from '../ethereum/factory';

function HomePage({ deployedCampaigns }) {
 const [items, updateItems] = React.useState([]);
 React.useEffect(() => {
  const temp = deployedCampaigns.map((address) => {
   return {
    header: address,
    description: <Link route={`/campaigns/${address}`}><a><p>View Campaign</p></a></Link>,
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
   <Link route='/campaigns/new'>
   <a><Button primary>Create Campaign</Button></a>
   </Link>
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
