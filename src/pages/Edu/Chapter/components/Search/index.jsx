import React, { Component } from "react";
import { Card, Form, Select, Button } from "antd";
import { reqAllCourse } from "@/api/edu/course";
import { reqChapPagListByCourse } from "@/api/edu/chapter";
import Pubsub from "pubsub-js";
import { FormattedMessage, injectIntl } from "react-intl";
import "./index.less";
const { Item } = Form;
const { Option } = Select;
class Search extends Component {
  state = {
    courseList: [],
  };
  getAllCourse = async () => {
    const courseList = await reqAllCourse();
    this.setState({ courseList });
  };
  handleFinish = async (values) => {
    const { courseId } = values;
    const result = await reqChapPagListByCourse(1, 5, courseId);
    Pubsub.publish("chapter_list", result);
  };
  resetForm = () => {
    this.refs.form.resetFields();
  };
  componentDidMount() {
    this.getAllCourse();
  }
  render() {
    const { courseList } = this.state;
    return (
      <Card>
        <Form
          ref="form"
          layout="inline"
          initialValues={{ courseId: "" }}
          onFinish={this.handleFinish}
        >
          <Item
            label={<FormattedMessage id="select_course" />}
            name="courseId"
            rules={[{ required: true, message: "必须选择一个课程" }]}
          >
            <Select className="select_course">
              <Option value="">
                {<FormattedMessage id="please_select_course" />}
              </Option>
              {courseList.map((c) => {
                return (
                  <Option key={c._id} value={c._id}>
                    {c.title}
                  </Option>
                );
              })}
            </Select>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              {this.props.intl.formatMessage({ id: "search" })}
            </Button>
          </Item>
          <Item>
            <Button onClick={this.resetForm}>
              {this.props.intl.formatMessage({ id: "reset" })}
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default injectIntl(Search);
