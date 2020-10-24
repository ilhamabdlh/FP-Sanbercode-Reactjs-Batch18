import React, { useContext, useState } from "react"
import { UserContext } from '../context/UserContext'
import axios from "axios"
import { Typography, Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom"

const { Title } = Typography

const ChangePassword = () => {
    let history = useHistory()
    const [user, setUser, , setAlert] = useContext(UserContext)
    const [input, setInput] = useState({ cpassword: "", npassword: "", ncpassword: "" })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (input.npassword !== input.ncpassword) {
            alert("Passwords don't match");
        } else {
            axios.post(`https://backendexample.sanbersy.com/api/change-password`, {
                current_password: input.cpassword,
                new_password: input.npassword,
                new_confirm_password: input.ncpassword
            },
                { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(
                    (res) => {
                        console.log(res)
                        var token = res.data.token
                        var currentUser = { name: user.name, email: user.email, token }
                        setUser(currentUser)
                        localStorage.setItem("user", JSON.stringify(currentUser))
                        history.push("/")
                        setAlert("successchange")
                    }
                ).catch((err) => {
                    alert(err)
                    setAlert("failedchange")
                })
        }
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
            <Title>Change Password</Title>
            <Form
                {...layout}
                name="registration"
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    label="Current Password"
                    name="cpassword"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password type="password" name="cpassword" onChange={changeInput} value={input.cpassword} />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="npassword"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password type="password" name="npassword" onChange={changeInput} value={input.npassword} />
                </Form.Item>

                <Form.Item
                    label="Confirm New Password"
                    name="ncpassword"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password type="password" name="ncpassword" onChange={changeInput} value={input.ncpassword} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ChangePassword