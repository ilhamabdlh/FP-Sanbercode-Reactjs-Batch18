import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import UserContext from '../context/UserContext'
import { Form, Input, Button, Typography, PageHeader } from 'antd';

const { Title } = Typography

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

const EditGame = () => {

    let { id } = useParams();
    let history = useHistory()

    const [user, , , setAlert] = useContext(UserContext)
    const [game, setGame] = useState(null)
    const [input, setInput] = useState(null)

    useEffect(() => {
        if (input === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
                .then(res => {
                    setInput(res.data)
                })
        }
    })

    const submitForm = (event) => {
        event.preventDefault()
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`,
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
                setAlert("successedit")
                history.push("/gametable")
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
            {
                input !== null &&
                <>
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={true}
                            onBack={() => window.history.back()}
                            title="Game Table"
                            style={{ margin: "0 auto" }}
                        >
                        </PageHeader>
                    </div>
                    <Title>Edit Game</Title>
                    <Form {...layout} name="nest-messages" onSubmitCapture={submitForm} validateMessages>
                        <Form.Item
                            name="Name"
                            label="Name"
                        >
                            <Input type="text" name="name" onChange={changeInput} defaultValue={input.name} value={input.name} />
                        </Form.Item>
                        <Form.Item
                            name="genre"
                            label="Genre"
                        >
                            <Input type="text" name="genre" onChange={changeInput} defaultValue={input.genre} value={input.genre} />
                        </Form.Item>
                        <Form.Item
                            name="platform"
                            label="Platform"
                        >
                            <Input type="text" name="platform" onChange={changeInput} defaultValue={input.platform} value={input.platform} />
                        </Form.Item>
                        <Form.Item
                            name="singlePlayer"
                            label="Single Player"
                            rules={[
                                {
                                    min: 0,
                                    max: 1,
                                },
                            ]}
                        >
                            <Input type="number" min={0} max={1} name="singlePlayer" defaultValue={input.singlePlayer} onChange={changeInput} value={input.singlePlayer} />
                        </Form.Item>
                        <Form.Item
                            name="multiPlayer"
                            label="Multi Player"
                            rules={[
                                {
                                    min: 0,
                                    max: 1,
                                },
                            ]}
                        >
                            <Input type="number" min={0} max={1} name="multiPlayer" defaultValue={input.multiPlayer} onChange={changeInput} value={input.multiPlayer} />
                        </Form.Item>
                        <Form.Item
                            name="release"
                            label="Release Year"
                            rules={[
                                {
                                    max: 2020,
                                },
                            ]}
                        >
                            <Input type="number" max={2020} name="release" defaultValue={input.release} onChange={changeInput} value={input.release} />
                        </Form.Item>
                        <Form.Item
                            name="image_url"
                            label="Image URL"
                        >
                            <Input type="text" name="image_url" defaultValue={input.image_url} onChange={changeInput} value={input.image_url} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </>
            }
        </>
    )
}

export default EditGame