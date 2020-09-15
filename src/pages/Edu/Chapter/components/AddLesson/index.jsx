import React, { Component } from "react";
import { Card, Form, Button, Input, Switch } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Upload from "@/components/Upload";
import { reqAddLesson } from "@/api/edu/lesson";
const { Item } = Form;
export default class AddLesson extends Component {
  handleFinish = async (values) => {
    values.chapterId = this.props.location.state.id;
    await reqAddLesson(values);
    this.props.history.goBack();
  };
  render() {
    return (
      <Card
        title={
          <div>
            <Button
              onClick={() => this.props.history.goBack()}
              type="link"
              icon={<ArrowLeftOutlined />}
            />
            <span>新增课时</span>
          </div>
        }
      >
        <Form
          onFinish={this.handleFinish}
          wrapperCol={{ span: 4 }}
          initialValues={{
            isfree: false,
          }}
        >
          <Item
            name="title"
            label="课时名"
            rules={[{ required: true, message: "必须输入课时名" }]}
          >
            <Input placeholder=" 请输入课时名" />
          </Item>
          <Item name="free" label="是否免费" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Item>
          <Item label="课时视频" name="video">
            <Upload />
          </Item>
          <Item>
            <Button htmlType="submit" type="primary">
              添加
            </Button>
          </Item>
        </Form>
        <br />
      </Card>
    );
  }
}
