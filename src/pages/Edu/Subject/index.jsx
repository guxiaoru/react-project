import React, { Component } from "react";
import { Card, Button, Table } from "antd";
import {
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { reqNo1SubjectPagination } from "@/api/edu/subject";
import "./index.less";
export default class Subject extends Component {
  state = {
    no1SubjectInfo: {
      items: [],
      total: 0,
    },
    pageSize: 5,
  };
  getNo1SubjectPagination = async (page, pageSize = this.state.pageSize) => {
    const { items, total } = await reqNo1SubjectPagination(page, pageSize);
    this.setState({ no1SubjectInfo: { items, total } });
  };
  async componentDidMount() {
    this.getNo1SubjectPagination(1);
  }
  render() {
    const {
      no1SubjectInfo: { items, total },
      pageSize,
    } = this.state;
    const columns = [
      {
        title: "分类名",
        dataIndex: "title",
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
        <Table
          dataSource={items}
          columns={columns}
          rowKey="_id"
          pagination={{
            pageSize,
            total,
            onChange: (page) => {
              this.getNo1SubjectPagination(page);
            },
          }}
        />
      </Card>
    );
  }
}
