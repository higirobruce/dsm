"use client";
import { url } from "@/app/page";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Skeleton,
  Typography,
  message,
} from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  BankOutlined,
  PhoneOutlined,
  CompassOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function distributor() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  let [distributor, setDistributor] = useState(null);
  let [messageApi, contextHolder] = message.useMessage();
  let [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col  p-10 md:px-20 space-y-3 bg-white rounded-md shadow-md">
        {contextHolder}
        <Typography.Title level={4}>Please fill below form</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          className="grid md:grid-cols-4 gap-10"
        >
          <Form.Item
            label="Full names"
            required
            tooltip="This is a required field"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

         

          <Form.Item
            label="Email address"
            required
            tooltip="This is a required field"
            rules={[
              {
                required:true,
                message:"Input required"
              }
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            label="Telephone number"
            required
            tooltip="This is a required field"
            rules={[
              {
                required:true,
                message:"Input required"
              }
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          
          <Form.Item className="col-span-4">
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
