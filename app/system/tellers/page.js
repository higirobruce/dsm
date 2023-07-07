'use client'
import { url } from "@/app/page";
import { Spin, Table } from "antd";
import {Typography} from "antd";
import React, { useEffect, useState } from "react";

export async function getTellers(setTellers, setLoading, setDataFound) {
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
        throw Error(JSON.stringify(res));
      }
    })
    .then((res) => {
      setTellers(res.data);
      setDataFound(true);
    })
    .catch((err) => {
      setDataFound(false);
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

  useEffect(() => {
    getTellers(setTellers, setLoading, setDataFound);
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
      {dataFound && <div>
        <Typography.Title level={4}>Tellers</Typography.Title>
        <Table size="middle" columns={columns} dataSource={tellers} className="rounded shadow" /></div>}
      {loading && <Spin spinning={true} size="small" />}
    </div>
  );
}
