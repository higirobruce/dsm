"use client";
import { url } from "@/app/page";
import { Spin, Table, message, Empty, Skeleton, Button } from "antd";
import { Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

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
  let router = useRouter()

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
      title: "Email address",
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
          <div className="flex flex-row justify-between items-center">
            <Typography.Title level={4}>Tellers</Typography.Title>
            <Link href={`/system/tellers/new`}>
              <Button icon={<PlusOutlined />} type="primary">
                New Teller
              </Button>
            </Link>
          </div>
          <Table
            size="middle"
            columns={columns}
            dataSource={tellers}
            className="rounded shadow"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  event.stopPropagation();
                  router.push(`/system/tellers/${record?.teller_id}`);
                }, // click row
              };
            }}
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
