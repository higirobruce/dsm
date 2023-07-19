"use client";
import { Button, Skeleton, message } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  BankOutlined,
  PhoneOutlined,
  CompassOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { url } from "@/app/page";

async function getTenderDetails(id, setTeller, messageApi, setLoading) {
  setLoading(true);
  fetch(`${url}/tellers/${id}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((res) => {
      setTeller(res.data[0]);
    })
    .catch((err) => {
      messageApi.error(`${err}`);
    })
    .finally(() => setLoading(false));
}

export default function teller() {
  let params = useParams();

  let [teller, setTeller] = useState(null);
  let [messageApi, contextHolder] = message.useMessage();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    getTenderDetails(params?.id, setTeller, messageApi, setLoading);
  }, []);
  return (
    <div className="flex flex-col">
      {contextHolder}
      {loading && (
        <div>
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      {teller && (
        <div className="flex flex-col items-center justify-center p-10 md:p-20 space-y-3 bg-white rounded-md shadow-md">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-20 h-20 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
          </div>
          <div className="text-lg font-semibold">{teller?.full_name}</div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <MailOutlined />
            </div>
            <div>{teller?.email_address}</div>
          </div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <PhoneOutlined />
            </div>
            <div>{teller?.telephone_number}</div>
          </div>

          <Button icon={<EditOutlined />}>Update</Button>
        </div>
      )}
    </div>
  );
}
