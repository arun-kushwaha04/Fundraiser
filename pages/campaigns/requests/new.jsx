import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/layout';


const RequestNew = (props) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("")
  const [recepient, setRecepient] = useState("")
  const [isloading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(props.address);
    setLoading(true); setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recepient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setErrorMessage(err.message)
    }
    setLoading(false)
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={event =>
               setDescription(event.target.value)
             }
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={event => {
              setErrorMessage('')
              setValue(event.target.value)
            }}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recepient}
            onChange={event =>
              setRecepient(event.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={isloading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async(props) => {
  const { address } = props.query;
  return { address };
}

export default RequestNew;
