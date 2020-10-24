import React, { useContext, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import UserContext from '../context/UserContext'
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

const CreateGame = () => {

    let history = useHistory()

    const [user, , , setAlert] = useContext(UserContext)
    const [game, setGame] = useState(null)
    const [input, setInput] = useState({
        id: null,
        name: "",
        platform: "",
        genre: "",
        image_url: "",
        release: 1980,
        singlePlayer: 0,
        multiPlayer: 0
    })

    const submitForm = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/data-game/`,
            {
                name: input.name,
                platform: input.platform,
                genre: input.genre,
                image_url: input.image_url,
                release: input.release,
                singlePlayer: parseInt(input.singlePlayer),
                multiPlayer: parseInt(input.multiPlayer)
            },
            { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
                var data = res.data
                setGame([...game, {
                    id: data.id,
                    name: data.name,
                    platform: data.platform,
                    genre: data.genre,
                    image_url: data.image_url,
                    release: data.release,
                    singlePlayer: data.singlePlayer,
                    multiPlayer: data.multiPlayer
                }])
                setInput({
                    id: null,
                    name: "",
                    platform: "",
                    genre: "",
                    image_url: "",
                    release: 1990,
                    singlePlayer: 0,
                    multiPlayer: 0,
                })
                history.push("/gametable")
                setAlert("successadd")
            }).catch(
                (err) => { console.log(err) }
            )

    }

    const changeInput = (event) => {
        var value = event.target.value
        setInput({ ...input, [event.target.name]: value })
    }

    return (
        <>
            <Title>Add Game Data</Title>
            <Form {...layout} name="nest-messages" onSubmitCapture={submitForm} validateMessages>
                <Form.Item
                    name="Name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" name="name" onChange={changeInput} defaultValue={input.name} value={input.name} />
                </Form.Item>
                <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" name="genre" onChange={changeInput} defaultValue={input.genre} value={input.genre} />
                </Form.Item>
                <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" name="platform" onChange={changeInput} defaultValue={input.platform} value={input.platform} />
                </Form.Item>
                <Form.Item
                    name="singlePlayer"
                    label="Single Player"
                    rules={[
                        {
                            required: true,
                            min: 0,
                            max: 1,
                        },
                    ]}
                >
                    <Input type="number" name="singlePlayer" min={0} max={1} defaultValue={input.singlePlayer} onChange={changeInput} value={input.singlePlayer} />
                </Form.Item>
                <Form.Item
                    name="multiPlayer"
                    label="Multi Player"
                    rules={[
                        {
                            required: true,
                            min: 0,
                            max: 1,
                        },
                    ]}
                >
                    <Input type="number" name="multiPlayer" min={0} max={1} defaultValue={input.multiPlayer} onChange={changeInput} value={input.multiPlayer} />
                </Form.Item>
                <Form.Item
                    name="release"
                    label="Release Year"
                    rules={[
                        {
                            required: true,
                            max: 2020,
                        },
                    ]}
                >
                    <Input type="number" max={2020} name="release" defaultValue={input.release} onChange={changeInput} value={input.release} />
                </Form.Item>
                <Form.Item
                    name="image_url"
                    label="Image URL"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" name="image_url" onChange={changeInput} defaultValue={input.image_url} value={input.image_url} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CreateGame