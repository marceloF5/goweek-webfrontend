import React from 'react'
import { distanceInWords } from 'date-fns'
import { pt } from 'date-fns/locale/pt'
import DropZone from 'react-dropzone'
import socket from 'socket.io-client'

import api from '../../services/api'

import { MdInsertDriveFile } from 'react-icons/md'

import logo from '../../assets/logo.svg'
import './styles.css'

class Box extends React.Component {
    state = {
        box: {},
    }

    async componentDidMount() {
        this.subscribeToNewFiles()

        const { match } = this.props
        const box = match.params.id
        const response = await api.get(`boxes/${box}`)
        
        this.setState({ box: response.data })
    }

    subscribeToNewFiles = () => {
        const { match } = this.props
        const box = match.params.id
        const io = socket('https://goweekbackend.herokuapp.com/')

        io.emit('connectRoom', box)
        io.on('file', data => {
            this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
        })
    }

    handleUpload = files => {
        const { match } = this.props
        const box = match.params.id

        files.forEach(file => {
            const data = new FormData()

            data.append('file', file)
            api.post(`boxes/${box}/files`, data)
        })
    }

    render() {
        const { box } = this.state
        return (
            <div id='box-container'>
                <header>
                    <img src={logo} alt={''} />
                    <h1>{box.title}</h1>
                </header>

                <DropZone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className='upload' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag, Drop or click your files here</p>
                        </div>
                    )}
                </DropZone>
                <ul>
                    {box.files &&
                        box.files.map(file => (
                            <li key={file._id}>
                                <a className={'fileInfo'} href={file.url} target={'_blank'}>
                                    <MdInsertDriveFile size={24} color={'#A5CFFF'} />
                                    <strong>{file.title}</strong>
                                </a>
                                <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
}

export default Box
