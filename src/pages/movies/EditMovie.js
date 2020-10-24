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

const EditMovie = () => {

    let { id } = useParams();
    let history = useHistory()

    const [user, , , setAlert] = useContext(UserContext)
    const [movie, setMovie] = useState(null)
    const [input, setInput] = useState(null)

    useEffect(() => {
        if (input === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
                .then(res => {
                    setInput(res.data)
                })
        }
    })

    const submitForm = (event) => {
        event.preventDefault()
        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`,
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
                setAlert("successedit")
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
            {
                input !== null &&
                <>
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={true}
                            onBack={() => window.history.back()}
                            title="Movie Table"
                            style={{ margin: "0 auto" }}
                        >
                        </PageHeader>
                    </div>
                    <Title>Edit Movie</Title>
                    <Form {...layout} name="nest-messages" onSubmitCapture={submitForm} validateMessages>
                        <Form.Item
                            name="title"
                            label="Title"
                        >
                            <Input type="text" name="title" onChange={changeInput} defaultValue={input.title} value={input.title} />
                        </Form.Item>
                        <Form.Item
                            name="genre"
                            label="Genre"
                        >
                            <Input type="text" name="genre" onChange={changeInput} defaultValue={input.genre} value={input.genre} />
                        </Form.Item>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[
                                {
                                    min: 1,
                                    max: 10,
                                },
                            ]}
                        >
                            <Input type="number" min={1} max={10} onChange={changeInput} name="rating" defaultValue={input.rating} value={input.rating} />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            label="Duration"
                            rules={[
                                {
                                    min: 1,
                                    max: 1000,
                                },
                            ]}
                        >
                            <Input type="number" min={1} max={1000} onChange={changeInput} name="duration" defaultValue={input.duration} value={input.duration} />
                        </Form.Item>
                        <Form.Item
                            name="year"
                            label="Year"
                            rules={[
                                {
                                    max: 2020,
                                },
                            ]}
                        >
                            <Input type="number" max={2020} onChange={changeInput} name="year" defaultValue={input.year} value={input.year} />
                        </Form.Item>
                        <Form.Item
                            name="image_url"
                            label="Image URL"
                        >
                            <Input type="text" name="image_url" onChange={changeInput} defaultValue={input.image_url} value={input.image_url} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <Input.TextArea name="description" onChange={changeInput} defaultValue={input.description} value={input.description} />
                        </Form.Item>
                        <Form.Item
                            name="review"
                            label="Review"
                        >
                            <Input.TextArea name="review" onChange={changeInput} defaultValue={input.review} value={input.review} />
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

export default EditMovie