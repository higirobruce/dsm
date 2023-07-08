"use client";
import React from "react";

import {
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  DesktopOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  ShopOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";
let items = [
  {
    key: "/system/subscriptions/renew",
    label: "Renew subscription",
    icon: <SolutionOutlined />,
  },
  {
    key: "/system/subscriptions/record",
    label: "Subscription record",
    icon: <DesktopOutlined />,
  },

  {
    key: "/system/distributors",
    label: "Distributors List",
    icon: <ApartmentOutlined />,
  },

  {
    key: "/system/tellers",
    label: "Tellers List",
    icon: <ShopOutlined />,
  },

  {
    key: "/system/sales-accessories",
    label: "Sales accessories",
    icon: <SettingOutlined />,
  },
];

export default function page() {
  let router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
      {items?.map((i) => {
        return (
          <div
            onClick={() => router.push(i.key)}
            className="rounded shadow-sm bg-white flex flex-col items-center justify-center space-y-3 p-3 cursor-pointer hover:shadow-md"
          >
            <div className="text-[70px] text-blue-400">{i.icon}</div>
            <div>{i.label}</div>
          </div>
        );
      })}
    </div>
  );
}
