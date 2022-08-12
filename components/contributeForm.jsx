import React,{useState} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) => {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async(event) => {
    event.preventDefault();
    const campaign = Campaign(props.address);
    setIsLoading(true)
    setErrorMessage('')
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.addContributers().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message)
    }

    setIsLoading(false)
    setValue('')
  }

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={event => {setErrorMessage(''); setValue(event.target.value)}}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>

      <Message error header="Oops! Something Went Worng" content={errorMessage} />
      <Button primary loading={isLoading}>
        Contribute!
      </Button>
    </Form>
  )

}
export default ContributeForm;
