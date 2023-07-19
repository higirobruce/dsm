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
  let [fullName, setFullName] = useState(null);
  let [username, setUsername] = useState(null);
  let [companyName, setCompanyName] = useState(null);
  let [tin, setTin] = useState(null);
  let [villageId, setVillageId] = useState(null);
  let [emailAddress, setEmailAddress] = useState(null);
  let [telephoneNumber, setTelephoneNumber] = useState(null);
  let [address, setAddress] = useState(null);

  function createDistrubutor() {
    fetch(`${url}/distributors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dist_full_name: fullName,
        user_name: username,
        dist_company_name: companyName,
        dist_tin_no: tin,
        village_id: villageId,
        email_address: emailAddress,
        telephone_number: telephoneNumber,
        address: address,
      }),
    }).then((res) => {
      if (res.ok) {
        messageApi.info("Success");
      } else {
        messageApi.error(res.statusText);
      }
    }).then(res=>{
      alert(JSON.stringify(res))
    })
  }
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
            <Input
              placeholder="input placeholder"
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Company Name"
            required
            tooltip="This is a required field"
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="TIN"
            required
            tooltip="This is a required field"
            className="w-full"
          >
            <InputNumber
              className="w-full"
              placeholder=""
              onChange={(e) => setTin(e)}
            />
          </Form.Item>

          <Form.Item
            label="Email address"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Telephone number"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="col-span-4">
            <Button type="primary" onClick={createDistrubutor}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
