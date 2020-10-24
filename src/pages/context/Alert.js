import React, { useContext } from "react"
import { UserContext } from './UserContext'
import { Alert } from 'antd';

const AlertNotif = () => {
    const [, , alert,] = useContext(UserContext)

    if (alert === "successregist") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Registration Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "failedregist") {
        return (
            <>
                <Alert
                    message="Error"
                    description="Registration Failed."
                    type="error"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "failedlogin") {
        return (
            <>
                <Alert
                    message="Error"
                    description="Login Failed."
                    type="error"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successlogin") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Login Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successlogout") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Logout Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successadd") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Add Data Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successdelete") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Delete Data Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successedit") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Edit Data Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "successchange") {
        return (
            <>
                <Alert
                    message="Success"
                    description="Change Password Success."
                    type="success"
                    showIcon
                    closable
                />
            </>
        )
    }
    else if (alert === "failedchange") {
        return (
            <>
                <Alert
                    message="Error"
                    description="Change Password Failed."
                    type="error"
                    showIcon
                    closable
                />
            </>
        )
    }
}

export default AlertNotif