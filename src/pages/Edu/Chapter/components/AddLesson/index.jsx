import React, { Component } from "react";
import { Card, Form, Button, Input, Switch } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Upload from "@/components/Upload";
const { Item } = Form;
export default class AddLesson extends Component {
  handleFinish = (values) => {
    values.chapter_id = this.props.location.state.id;
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
            name="lesson_name"
            label="课时名"
            rules={[{ required: true, message: "必须输入课时名" }]}
          >
            <Input placeholder=" 请输入课时名" />
          </Item>
          <Item name="isfree" label="是否免费" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Item>
          <Item label="课时视频">
            <Upload />
          </Item>
          <Item>
            <Button htmlType="submit" type="primary">
              添加
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
