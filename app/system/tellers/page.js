"use client";
import { url } from "@/app/page";
import { Spin, Table, message, Empty, Skeleton } from "antd";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";

export async function getTellers(
  setTellers,
  setLoading,
  setDataFound,
  messageApi
) {
  setLoading(true);
  fetch(`${url}/tellers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((res) => {
      setTellers(res.data);
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
  let [tellers, setTellers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [dataFound, setDataFound] = useState(false);
  let [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getTellers(setTellers, setLoading, setDataFound, messageApi);
  }, []);

  let columns = [
    {
      title: "Id",
      dataIndex: "teller_id",
      key: "teller_id",
    },
    {
      title: "Names",
      dataIndex: "full_name",
      key: "full_name",
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
          <Typography.Title level={4}>Tellers</Typography.Title>
          <Table
            size="middle"
            columns={columns}
            dataSource={tellers}
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
      '
    </div>
  );
}
