import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
// import { SYSTEM_LOGO } from '@/constants';
import { message, Tabs, Space, Divider } from 'antd';
import React, { useState } from 'react';
import { history, Link } from 'umi';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword } = values;
    //校验
    if (userPassword !== checkPassword) {
      message.error('再次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: 'login',
          query,
        });
        return;
      } else {
        throw new Error('register error id = ${id}');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          // logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="井水深宇宙中心"
          subTitle={'井水深，前程似锦'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号注册'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账户'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '长度不能小于4！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 6,
                    type: 'string',
                    message: '长度不能小于6！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 6,
                    type: 'string',
                    message: '长度不能小于6！',
                  },
                ]}
              />
              <ProFormText
                name="universeCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入宇宙编号'}
                rules={[
                  {
                    required: true,
                    message: '宇宙编号是必填项！',
                  },
                  {
                    max: 4,
                    type: 'string',
                    message: '长度不能大于5！',
                  },
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <Space split={<Divider type="vertical" />}>
                  <Link to="/user/login">返回</Link>
                </Space>
              </div>
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
