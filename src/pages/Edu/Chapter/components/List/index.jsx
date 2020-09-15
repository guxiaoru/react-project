import React, { Component } from "react";
import { Card, Table, Button, Tooltip, Modal } from "antd";
import {
  FullscreenOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { reqAllLessonListByCourseId } from "@/api/edu/lesson";
import Pubsub from "pubsub-js";
import { withRouter } from "react-router-dom";
import { Player } from "video-react";
import screenfull from "screenfull";
import "video-react/dist/video-react.css";
import "./index.less";
class List extends Component {
  state = {
    chapterList: [],
    visible: false,
    lessonTitle: "",
    url: "",
    isFull: false,
  };
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
  handleCancel = () => {
    console.log("你点击了取消按钮");
    this.setState({ visible: false });
  };
  showModal = (data) => {
    return () =>
      this.setState({
        visible: true,
        lessonTitle: data.title,
        url: data.video,
      });
  };
  switchFullScreen = () => {
    screenfull.toggle(this.refs.lesson_list);
  };
  componentDidMount() {
    this.msg_id = Pubsub.subscribe("chapter_list", (_, data) => {
      console.log("搜索回来的章节数据", data.items);
      const items = data.items.map((chapter) => ({
        ...chapter,
        children: [],
      }));
      this.setState({ chapterList: items });
    });
    screenfull.on("change", () => {
      const { isFull } = this.state;
      this.setState({ isFull: !isFull });
    });
  }

  componentWillUnmount() {
    Pubsub.unsubscribe(this.msg_id);
  }
  render() {
    const { lessonTitle, visible, url, isFull } = this.state;
    const { chapterList } = this.state;
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        align: "center",
        render: (data) => ("free" in data ? (data.free ? "是" : "否") : ""),
      },
      {
        title: "视频",
        render: (data) =>
          "video" in data ? (
            <Button onClick={this.showModal(data)} icon={<EyeOutlined />} />
          ) : (
            ""
          ),
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
      <>
        <div ref="lesson_list" style={{ backgroundColor: "white" }}>
          <Card
            title="章节列表"
            extra={
              <>
                <Button type="primary" className="mar_right_btn">
                  新增章节
                </Button>
                <Button type="danger">批量删除</Button>
                <Button
                  size="large"
                  onClick={this.switchFullScreen}
                  className="link_btn"
                  icon={
                    isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />
                  }
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
        </div>
        <Modal
          title={lessonTitle}
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
        >
          <Player>
            <source src={url} />
          </Player>
        </Modal>
      </>
    );
  }
}
export default withRouter(List);
