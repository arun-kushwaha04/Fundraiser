import React from 'react'
import Layout from '../../components/layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import { Card, Grid, Button } from 'semantic-ui-react';
import {Link} from '../../routes'
import ContributeForm from '../../components/contributeForm'

const Show = (props) => {
  const {managerAddress,minimumContribution,requestsCount,contributers,balance,address} = props  
  const items = [
      {
        header: managerAddress,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. This show total requests made by this contract. Requests must be approved by approvers'
      },
      {
        header: contributers,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
  ]
  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
         <Grid.Row>
           <Grid.Column width={10}>
              <Card.Group items={items}/>
           </Grid.Column>

           <Grid.Column width={6}>
             <ContributeForm address={address} />
           </Grid.Column>
         </Grid.Row>

         <Grid.Row>
           <Grid.Column>
             <Link route={`/campaigns/${address}/requests`}>
               <a>
                 <Button primary>View Requests</Button>
               </a>
             </Link>
           </Grid.Column>
         </Grid.Row>
       </Grid>
    </Layout>
  )
}

Show.getInitialProps = async(props) => {
  const campaign = Campaign(props.query.address)
  const summary = await campaign.methods.contarctSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    contributers: summary[3],
    managerAddress: summary[4]
  }
}

export default Show;
