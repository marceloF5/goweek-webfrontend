import React  from 'react'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import './styles.css'

class Home extends React.Component {
    state = {
        newBox: '',
    }

    handleSubmit = async e => {
        e.preventDefault()
        
        
        const response = await api.post('boxes', {
            title: this.state.newBox
        })

        console.log(response)

        this.props.history.push(`/box/${response.data._id}`)
    }
    handleInputChange = e => {
        this.setState({ newBox: e.target.value })
    }

    render() {
        return (
            <div id='main-container'>
                <form onSubmit={this.handleSubmit} action=''>
                    <img src={logo} alt={''} />
                    <input
                        type='text'
                        placeholder={'Create a Box'}
                        value={this.state.newBox}
                        onChange={this.handleInputChange}
                    />
                    <button type={'submit'}>Create!</button>
                </form>
            </div>
        )
    }
}

export default Home
