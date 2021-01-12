import React, {FC, Fragment} from 'react';
import {Alert, Button, Col, Form, Input, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {IUserFormValues} from '../../app/models/user';
import {useTranslation} from 'react-i18next';
import {IUserStateType} from "../../app/store/reducers/user/userReducerTypes";
import {connect} from "react-redux";
import {login} from "../../app/store/actions";
import {IStoreState} from "../../app/store/rootReducerTypes";

interface ILoginProps {
    login: Function;
    userState: IUserStateType;
}

const Login: FC<ILoginProps> = ({login, userState}) => {
    const {t} = useTranslation('core_login');
    const {loginError, submitting} = userState;

    const onFinish = (values: IUserFormValues) => {
        login(values);
    };

    return (
        <Row justify="center" align="middle" style={{height: '100vh'}}>
            <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                <h1>{t('title')}</h1>
                <p>{t('subTitle')}</p>
                {loginError && (
                    <Fragment>
                        <Alert message={loginError} type="error"/>
                        <br/>
                    </Fragment>
                )}
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={(values) =>
                        onFinish({email: values.email, password: values.password})
                    }
                >
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: t('username-error')}]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder={t('username-placeholder')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: t('password-error')}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder={t('password-placeholder')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={submitting}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                        >
                            {t('login-btn')}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

// Redux State To Map
const mapStateToProps = ({userState}: IStoreState): { userState: IUserStateType } => {
    return {userState}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
