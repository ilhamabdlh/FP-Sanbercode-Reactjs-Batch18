import React, { useContext, useState } from "react"
import { UserContext } from '../context/UserContext'
import axios from "axios"
import { Typography, Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom"

const { Title } = Typography

const Register = () => {
    let history = useHistory()
    const [, , alert, setAlert] = useContext(UserContext)
    const [input, setInput] = useState({ name: "", email: "", password: "" })

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/register`, {
            name: input.name,
            email: input.email,
            password: input.password
        }).then(
            (res) => {
                console.log(res)
                // var user = res.data.user
                // var token = res.data.token
                // var currentUser = { name: user.name, email: user.email, token }
                // setUser(currentUser)
                // localStorage.setItem("user", JSON.stringify(currentUser))
                history.push("/login")
                setAlert("successregist")
            }
        ).catch((err) => {
            alert(err)
            setAlert("failedregist")
        })
    }

    const changeInput = (event) => {
        var value = event.target.value
        setInput({ ...input, [event.target.name]: value })
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    }

    return (
        <>
            <Title>REGISTER</Title>
            <Form
                {...layout}
                name="registration"
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input type="text" name="name" onChange={changeInput} value={input.name} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input type="email" name="email" onChange={changeInput} value={input.email} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password type="password" name="password" onChange={changeInput} value={input.password} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register