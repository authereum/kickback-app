import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import SafeMutation from '../components/SafeMutation'
import Button from '../components/Forms/Button'
import { CreatePendingParty } from '../graphql/mutations'

class Create extends Component {
  state = {
    name: '',
    description: '',
    location: '',
    date: '',
    image: '',
    deposit: '0.02',
    limitOfParticipants: 20,
  }

  render() {
    const {
      name,
      description,
      location,
      date,
      image,
      deposit,
      limitOfParticipants
    } = this.state

    return (
      <div className="App">
        <h1>Create a new party</h1>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Name of the event"
          /><br/>
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="Description of the event"
          >{description}</textarea><br/>
          <label>Location</label>
          <input
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
            type="text"
            placeholder="Location of the event"
          /><br/>
          <label>Dates</label>
          <input
            value={date}
            onChange={e => this.setState({ date: e.target.value })}
            type="text"
            placeholder="Dates of the event"
          /><br/>
          <label>Image</label>
          <input
            value={image}
            onChange={e => this.setState({ image: e.target.value })}
            type="text"
            placeholder="URL to image for the event"
          /><br/>
          <label>Deposit</label>
          <input
            value={deposit}
            onChange={e => this.setState({ deposit: e.target.value })}
            type="text"
            placeholder="deposits"
          /><br/>
          <label>Limit of participants</label>
          <input
            value={limitOfParticipants}
            onChange={e => this.setState({ limitOfParticipants: e.target.value })}
            type="text"
            placeholder="number of participants"
          /><br/>
        </div>

        <SafeMutation
          mutation={CreatePendingParty}
          resultKey='id'
          variables={{ meta: { name, description, location, date, image } }}
          onCompleted={this._onCreated}
        >
          {createPendingParty => (
            <div>
              <Button onClick={createPendingParty}>
                Create pending party
              </Button>
            </div>
          )}
        </SafeMutation>
      </div>
    )
  }

  _onCreated = ({ id }) => {
    const { deposit, limitOfParticipants } = this.state

    this.props.history.push(`/deploy?id=${id}&deposit=${deposit}&limitOfParticipants=${limitOfParticipants}`)
  }

  _buildHandler = ({ createParty, createPendingParty }) => {
    return async () => {
      const result = await createPendingParty()
      console.log(result)
      const { id } = result
      await createParty({ id })
    }
  }
}

export default withRouter(Create)
