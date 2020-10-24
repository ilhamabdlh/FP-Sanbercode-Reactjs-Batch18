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

const CreateMovie = () => {

    let history = useHistory()

    const [user, , , setAlert] = useContext(UserContext)
    const [movie, setMovie] = useState(null)
    const [input, setInput] = useState({
        id: null,
        title: '',
        rating: 1,
        duration: 1,
        genre: '',
        description: "",
        image_url: "",
        year: 1980,
        review: ""
    })

    const submitForm = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`,
            {
                title: input.title,
                rating: parseInt(input.rating),
                duration: parseInt(input.duration),
                genre: input.genre,
                description: input.description,
                image_url: input.image_url,
                year: parseInt(input.year),
                review: input.review
            },
            { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
                var data = res.data
                setMovie([...movie, {
                    id: data.id,
                    title: data.title,
                    rating: data.rating,
                    duration: data.duration,
                    genre: data.genre,
                    description: data.description,
                    image_url: data.image_url,
                    year: data.year,
                    review: data.review
                }])
                setInput({
                    id: null,
                    title: "",
                    rating: 0,
                    duration: 0,
                    genre: "",
                    description: "",
                    image_url: "",
                    year: 1990,
                    review: ""
                })
                setAlert("successadd")
                history.push("/movietable")
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
            <Title>Add Movie Data</Title>
            <Form {...layout} name="nest-messages" onSubmitCapture={submitForm} validateMessages>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" name="title" onChange={changeInput} value={input.title} />
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
                    <Input type="text" name="genre" onChange={changeInput} value={input.genre} />
                </Form.Item>
                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[
                        {
                            required: true,
                            min: 1,
                            max: 10,
                        },
                    ]}
                >
                    <Input type="number" min={1} max={10} defaultValue={1} onChange={changeInput} name="rating" value={input.rating} />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[
                        {
                            required: true,
                            min: 1,
                            max: 1000,
                        },
                    ]}
                >
                    <Input type="number" min={1} max={1000} defaultValue={1} onChange={changeInput} name="duration" value={input.duration} />
                </Form.Item>
                <Form.Item
                    name="year"
                    label="Year"
                    rules={[
                        {
                            required: true,
                            max: 2020,
                        },
                    ]}
                >
                    <Input type="number" max={2020} defaultValue={1980} onChange={changeInput} name="year" value={input.year} />
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
                    <Input type="text" name="image_url" onChange={changeInput} value={input.image_url} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea name="description" onChange={changeInput} value={input.description} />
                </Form.Item>
                <Form.Item
                    name="review"
                    label="Review"
                >
                    <Input.TextArea name="review" onChange={changeInput} value={input.review} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CreateMovie