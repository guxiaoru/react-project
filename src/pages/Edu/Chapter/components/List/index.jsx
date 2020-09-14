import React, { Component } from "react";
import { Card, Table, Button, Tooltip } from "antd";
import {
  FullscreenOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { reqAllLessonListByCourseId } from "@/api/edu/lesson";
import Pubsub from "pubsub-js";
import { withRouter } from "react-router-dom";
import "./index.less";
class List extends Component {
  state = { chapterList: [] };
  componentDidMount() {
    this.msg_id = Pubsub.subscribe("chapter_list", (_, data) => {
      console.log("搜索回来的章节数据", data.items);
      const items = data.items.map((chapter) => ({
        ...chapter,
        children: [],
      }));
      this.setState({ chapterList: items });
    });
  }
  handleExpand = async (isExpanded, record) => {
    if (isExpanded) {
      const lessonList = await reqAllLessonListByCourseId(record._id);
      const chapterList = this.state.chapterList.map((chapter) => {
        if (chapter._id === record._id) {
          chapter.children = lessonList;
        }
        return chapter;
      });
      this.setState({ chapterList });
    }
  };
  componentWillUnmount() {
    Pubsub.unsubscribe(this.msg_id);
  }
  render() {
    const { chapterList } = this.state;
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
      },
      {
        title: "视频",
      },
      {
        title: "操作",
        render: (data) => (
          <>
            {"free" in data ? null : (
              <Tooltip title="新增课时">
                <Button
                  onClick={() =>
                    this.props.history.push("/edu/chapter/addlesson", {
                      id: data._id,
                    })
                  }
                  type="primary"
                  className="mar_right_btn"
                  icon={<PlusOutlined />}
                />
              </Tooltip>
            )}
            <Tooltip title="编辑">
              <Button
                type="primary"
                className="mar_right_btn"
                icon={<FormOutlined />}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button type="danger" icon={<DeleteOutlined />} />
            </Tooltip>
          </>
        ),
      },
    ];
    return (
      <Card
        title="章节列表"
        extra={
          <>
            <Button type="primary" className="mar_right_btn">
              新增章节
            </Button>
            <Button type="danger">批量删除</Button>
            <Button
              type="text"
              className="link_btn"
              icon={<FullscreenOutlined />}
            ></Button>
          </>
        }
      >
        <Table
          dataSource={chapterList}
          columns={columns}
          rowKey="_id"
          expandable={{
            onExpand: this.handleExpand,
          }}
        />
      </Card>
    );
  }
}
export default withRouter(List);
