import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../config/constant';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../stores/auth.slice';
const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, isSuccess, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const signInWithGoogle = async (event) => {
        event.preventDefault();
        dispatch(login({ username: email, password }));
        history.push(ROUTES.BOARDS);
    };
    useEffect(() => {
        if (isSuccess === true) history.push('/boards');
    }, [isSuccess]);
    const onFinish = () => dispatch(login({ username: email, password }));

    return (
        <div>
            <h1 className={`text-xl mb-3 text-center`}>Sign In</h1>

            <Form onFinish={onFinish}>
                <Form.Item name="email">
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Item>

                <Form.Item name="password">
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                    />

                    <div className={`text-red-500`}>{errorMessage}</div>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={`w-full my-2`}
                        disabled={isLoading}
                    >
                        Sign in
                    </Button>
                    <Button
                        type="danger"
                        htmlType="submit"
                        className={`w-full mb-2`}
                        onClick={signInWithGoogle}
                        disabled={isLoading}
                    >
                        Continue with Google
                    </Button>
                    <p>
                        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
};

export const SignInPage = ({ history }) => (
    <div className={`flex h-full`}>
        <div className={`w-64 m-auto`}>
            <SignInForm history={history} />
        </div>
    </div>
);
