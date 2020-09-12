import React, { Component } from "react";
import { Card, Button, Table, Tooltip, Input } from "antd";
import {
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  reqNo1SubjectPagination,
  reqAllNo2SubjectByNo1Id,
  reqUpdateSubject,
} from "@/api/edu/subject";
import "./index.less";
export default class Subject extends Component {
  state = {
    no1SubjectInfo: {
      items: [],
      total: 0,
    },
    pageSize: 5,
    expandedRowKeys: [],
    loading: false,
    editSubjectId: "",
    editSubjectTitle: "",
  };
  getNo1SubjectPagination = async (page, pageSize = this.state.pageSize) => {
    this.setState({ loading: true });
    let { items, total } = await reqNo1SubjectPagination(page, pageSize);
    items = items.map((no1Subject) => ({ ...no1Subject, children: [] }));
    this.setState({
      no1SubjectInfo: { items, total },
      pageSize,
      expandedRowKeys: [],
      loading: false,
    });
  };
  handleExpand = async (expandedIds) => {
    const { expandedRowKeys, no1SubjectInfo } = this.state;
    if (expandedRowKeys.length < expandedIds.length) {
      const currentId = expandedIds.slice(-1)[0];
      const currentSubject = no1SubjectInfo.items.find((sub) => {
        return sub._id === currentId;
      });
      if (currentSubject.children && !currentSubject.children.length) {
        const result = await reqAllNo2SubjectByNo1Id(currentId);
        const { items } = result;
        const formatedNo1Items = no1SubjectInfo.items.map((no1Subject) => {
          if (no1Subject._id === currentId) {
            no1Subject.children = items;
            if (!items.length) {
              delete no1Subject.children;
            }
          }
          return no1Subject;
        });
        this.setState({
          no1SubjectInfo: { ...no1SubjectInfo, items: formatedNo1Items },
          //expandedRowKeys: [...expandedRowKeys, record._id],
        });
      }
    }
    this.setState({ expandedRowKeys: expandedIds });
  };
  handleEdit = ({ _id, title }) => {
    return () => {
      this.setState({ editSubjectId: _id, editSubjectTitle: title });
    };
  };
  handleTitleChange = (event) => {
    this.setState({ editSubjectTitle: event.target.value });
  };
  updateSubject = async () => {
    const { editSubjectId, editSubjectTitle } = this.state;
    const result = await reqUpdateSubject(editSubjectId, editSubjectTitle);
    this.getNo1SubjectPagination(1);
    this.setState({ editSubjectId: "", editSubjectTitle: "" });
  };
  componentDidMount() {
    this.getNo1SubjectPagination(1);
  }
  render() {
    const {
      no1SubjectInfo: { total, items },
      pageSize,
      expandedRowKeys,
      loading,
      editSubjectId,
    } = this.state;
    const columns = [
      {
        title: "分类名",
        //dataIndex: "title",
        key: "0",
        width: "80%",
        render: (subject) =>
          subject._id === editSubjectId ? (
            <Input
              onChange={this.handleTitleChange}
              className="edit_input"
              type="text"
              defaultValue={subject.title}
            />
          ) : (
            subject.title
          ),
      },
      {
        title: "操作",
        //dataIndex: "_id",
        key: "1",
        align: "center",
        render: (subject) =>
          subject._id === editSubjectId ? (
            <div className="edit_btn_group">
              <Button
                type="primary"
                className="ok_btn"
                size="small"
                onClick={this.updateSubject}
              >
                确定
              </Button>
              <Button size="small">取消</Button>
            </div>
          ) : (
            <>
              <Tooltip title="编辑">
                <Button
                  onClick={this.handleEdit(subject)}
                  className="left_btn"
                  type="primary"
                  icon={<FormOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button type="danger" icon={<DeleteOutlined />}></Button>
              </Tooltip>
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
          loading={loading}
          expandable={{
            //onExpand: this.handleExpand,
            onExpandedRowsChange: this.handleExpand,
            expandedRowKeys,
          }}
          pagination={{
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["1", "2", "3", "4", "5", "8", "10", "50"], //页大小备选项
            onChange: (page) => {
              this.getNo1SubjectPagination(page);
            },
            onShowSizeChange: (_, pageSize) => {
              this.setState({ pageSize });
              this.getNo1SubjectPagination(1, pageSize);
            },
          }}
        />
      </Card>
    );
  }
}
