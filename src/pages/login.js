import { Button, Col, Form, Input, Row, Spin } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../services/login";
import * as helper from "../helpers/common";

const LoginPage = () => {
    const history = useHistory();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    const onFinish = async (values) => {
        const user = values.username;
        const pass = values.password;

        setLoadingLogin(true);
        setMessage("Logged...");
        const data = await api.loginApi(user, pass);

        if (!helper.isEmptyObject(data)) {
            setLoadingLogin(false);
            setMessage("Logged In!");
            api.setTokenLocalStorage(data.access_token);
            history.push("/home");
        } else {
            setLoadingLogin(false);
            setMessage("Logged Failed!");
            api.removeTokenLocalStorage();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        setMessage("Logged Failed!");
    };

    return (
        <>
            <Row>
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center", margin: "10px 0px" }}>
                        Login Page
                    </h1>
                    <p style={{ textAlign: "center" }}>{message}</p>
                    <Row>
                        <Col span={24}>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                    {loadingLogin && (
                                        <Spin style={{ marginLeft: "10px" }} />
                                    )}
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default LoginPage;
