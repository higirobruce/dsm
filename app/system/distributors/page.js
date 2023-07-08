"use client";
import { url } from "@/app/page";
import { Spin, Table, message, Skeleton, Empty } from "antd";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";

export async function getDistributors(
  setDistributors,
  setLoading,
  setDataFound,
  messageApi
) {
  setLoading(true);
  fetch(`${url}/distributors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`${res.statusText}`);
      }
    })
    .then((res) => {
      setDistributors(res.data);
      setDataFound(true);
    })
    .catch((err) => {
      setDataFound(false);
      messageApi.error(`${err}`);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
}
export default function page() {
  let [distributors, distributord] = useState([]);
  let [loading, setLoading] = useState(false);
  let [dataFound, setDataFound] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getDistributors(distributord, setLoading, setDataFound, messageApi);
  }, []);

  let columns = [
    {
      title: "Id",
      dataIndex: "distributor_id",
      key: "distributor_id",
    },
    {
      title: "Names",
      dataIndex: "dist_full_name",
      key: "dist_full_name",
    },
    {
      title: "Company Name",
      dataIndex: "dist_company_name",
      key: "dist_company_name",
    },
    {
      title: "Email",
      dataIndex: "email_address",
      key: "email_address",
    },
    {
      title: "Telephone",
      dataIndex: "telephone_number",
      key: "telephone_number",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      {contextHolder}
      {dataFound && !loading && (
        <div>
          <Typography.Title level={4}>Distributors</Typography.Title>
          <Table
            size="middle"
            columns={columns}
            dataSource={distributors}
            className="rounded shadow"
          />
        </div>
      )}
      {!dataFound && !loading && <Empty />}
      {loading && (
        <div>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </div>
  );
}
