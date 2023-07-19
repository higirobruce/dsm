"use client";
import { url } from "@/app/page";
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

async function getDistributorDetails(
  id,
  setDistributor,
  messageApi,
  setLoading
) {
  setLoading(true);
  fetch(`${url}/distributors/${id}`, {
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
      setDistributor(res.data[0]);
    })
    .catch((err) => {
      messageApi.error(`${err}`);
    })
    .finally(() => setLoading(false));
}

export default function distributor() {
  let params = useParams();

  let [distributor, setDistributor] = useState(null);
  let [messageApi, contextHolder] = message.useMessage();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    getDistributorDetails(params?.id, setDistributor, messageApi, setLoading);
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
      {distributor && (
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
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </div>
          <div className="text-lg font-semibold">
            {distributor?.dist_full_name}
          </div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <BankOutlined />
            </div>
            <div>{distributor?.dist_company_name}</div>
          </div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <MailOutlined />
            </div>
            <div>{distributor?.email_address}</div>
          </div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <PhoneOutlined />
            </div>
            <div>{distributor?.telephone_number}</div>
          </div>

          <div className="text-sm flex flex-row space-x-2 items-center text-gray-400">
            <div>
              <CompassOutlined />
            </div>
            <div>{distributor?.address}</div>
          </div>

          <Button icon={<EditOutlined />}>Update</Button>
        </div>
      )}
    </div>
  );
}
