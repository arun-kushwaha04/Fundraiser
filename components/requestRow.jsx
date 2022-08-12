import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = (props) => {
  const onApprove = async () => {
    const campaign = Campaign(props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0]
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0]
    });
  };

  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approversCount > approversCount / 2;
  return (
    <Row
      disabled={request.isCompleted}
      positive={readyToFinalize && !request.isCompleted}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.moneyRequired, 'ether')}</Cell>
      <Cell>{request.recepient}</Cell>
      <Cell>
        {request.approversCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
