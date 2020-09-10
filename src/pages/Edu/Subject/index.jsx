import React, { Component } from "react";
import { Card, Button, Table } from "antd";
import {
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { reqAllSubject } from "@/api/edu/subject";
import "./index.less";
export default class Subject extends Component {
  async componentDidMount() {
    const result = await reqAllSubject();
  }
  render() {
    const dataSource = [
      {
        key: "1",
        name: "测试分类一",
      },
      {
        key: "2",
        name: "测试分类二",
      },
    ];
    const columns = [
      {
        title: "分类名",
        dataIndex: "name",
        key: "0",
        width: "80%",
      },
      {
        title: "操作",
        dataIndex: "name",
        key: "1",
        align: "center",
        render: () => (
          <>
            <Button
              className="left_btn"
              type="primary"
              icon={<FormOutlined />}
            ></Button>
            <Button type="danger" icon={<DeleteOutlined />}></Button>
          </>
        ),
      },
    ];
    return (
      <Card
        title={
          <Button type="primary" icon={<PlusCircleOutlined />}>
            新增分类
          </Button>
        }
      >
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    );
  }
}
