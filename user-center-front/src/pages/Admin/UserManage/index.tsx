import { deleteById, register, searchUsers, updateById } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormRadio, ProTable, TableDropdown } from '@ant-design/pro-components';
import _ from '@umijs/deps/compiled/lodash';
import { useRef } from 'react';
import { Button, Image } from 'antd';
import request from 'umi-request';
import { PlusOutlined } from '@ant-design/icons';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => {
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>;
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueEnum: {
      0: {
        text: '正常',
        status: 'success',
      },
      1: {
        text: '已禁用',
        status: 'Error',
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueEnum: {
      0: {
        text: '普通用户',
      },
      1: {
        text: 'VIP',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: (a, b) => {
      let aTime = new Date(a.createTime).getTime();
      let bTime = new Date(b.createTime).getTime();
      console.log('a', a);
      return aTime - bTime;
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="editable"
        onClick={async () => {
          remove(record);
          action?.reload();
        }}
      >
        删除
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  const handleSubmit = async (values: API.addParams) => {
    const { userPassword, checkPassword } = values;
    //校验
    if (userPassword !== checkPassword) {
      message.error('再次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const id = (await register(values)) as unknown as number;
      if (id > 0) {
        return;
      } else {
        throw new Error('register error id = ${id}');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '新增失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const save = async (rows: RecordKey, record: API.CurrentUser) => {
    updateById(record);
  };

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        // console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (rows, record) => {
          await save(rows, record);
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <ModalForm<{
          username: string;
          company: string;
        }>
          title="新增用户"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新增用户
            </Button>
          }
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await handleSubmit(values as API.addParams);
            console.log(values);
            message.success('提交成功');
            actionRef.current?.reload();
            return true;
          }}
        >
          <ProFormText width="md" name="username" label="名称" placeholder="请输入名称" />
          <ProFormText
            width="md"
            name="userAccount"
            label="账号"
            tooltip="最少为 4 位"
            placeholder="请输入账号"
          />
          <ProFormText width="md" name="userPassword" label="密码" placeholder="请输入密码" />
          <ProFormText
            width="md"
            name="checkPassword"
            label="确认密码"
            placeholder="请再次输入密码"
          />
          <ProForm.Group>
            <ProFormSelect
              request={async () => [
                {
                  value: '0',
                  label: '女',
                },
                {
                  value: '1',
                  label: '男',
                },
              ]}
              width="xs"
              name="gender"
              label="性别"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: '1',
                  label: '管理员',
                },
                {
                  value: '0',
                  label: '普通用户',
                },
              ]}
              name="userRole"
              label="权限"
            />
          </ProForm.Group>
          <ProFormText width="sm" name="universeCode" label="宇宙编号" />
        </ModalForm>,
      ]}
    />
  );
};

import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { RecordKey } from '@ant-design/pro-utils/lib/useEditableArray';
function remove(record: API.CurrentUser) {
  deleteById(record);
  message.info('删除成功');
}
