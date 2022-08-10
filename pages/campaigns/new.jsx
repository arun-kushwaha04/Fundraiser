import React, {useState} from 'react';
import { Form, Button, Input, Message} from 'semantic-ui-react'
import {Router} from "../../routes"
import Layout from '../../components/layout'
import web3 from '../../ethereum/web3'
import factory from '../../ethereum/factory'

const CreateCampaign = () => {
  const [minContri, setMinContri] = useState("")
  const [isLoading, setLoadingState] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  console.log(process.env.DEPLOYED_CONTRACT_ADDRESS, process.env.NODE_ENV)

  const onSubmit = async(event) => {
    event.preventDefault();
    setLoadingState(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(parseInt(minContri)).send({
        from: accounts[0]
      })
      Router.pushRoute('/');
    } catch (err) {
      setErrorMessage(err.message)
    }
    setLoadingState(false)
    setMinContri("")
  }
  return (
    <Layout>
      <h3>Create New Campaign</h3>
      <Form error={!!errorMessage}>
        <Form.Field required>
          <label>Minimum Contribution For Campaign</label>
          <Input label='wei' labelPosition='right' value={minContri} onChange={(e) => {setErrorMessage('');setMinContri(e.target.value)}}/>
        </Form.Field>
        <Message
          error
          header='OOPS!! Something went wrong.'
          content={errorMessage}
        />
        <Button primary loading={isLoading} onClick={onSubmit}>Create Campaign</Button>
      </Form>
    </Layout>
  )
}

export default CreateCampaign;
