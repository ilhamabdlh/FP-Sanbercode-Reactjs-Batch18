import React, { useContext, useState } from "react"
import { UserContext } from '../context/UserContext'
import axios from "axios"
import { Typography, Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom"

const { Title } = Typography

const Login = () => {
    let history = useHistory()
    const [, setUser, , setAlert] = useContext(UserContext)
    const [input, setInput] = useState({ email: "", password: "" })

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/user-login`, {
            email: input.email,
            password: input.password
        }).then(
            (res) => {
                var user = res.data.user
                var token = res.data.token
                var currentUser = { name: user.name, email: user.email, token }
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))
                history.push("/")
                setAlert("successlogin")
            }
        ).catch((err) => {
            alert(err)
            setAlert("failedlogin")
        })
    }

    const changeInput = (event) => {
        var value = event.target.value
        setInput({ ...input, [event.target.name]: value })
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Title> LOGIN </Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onSubmitCapture={handleSubmit}
            >
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
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login