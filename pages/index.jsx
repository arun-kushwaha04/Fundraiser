import React from 'react';
import { Card } from 'semantic-ui-react';
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
   <Card.Group items={items} />
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
