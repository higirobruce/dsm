"use client";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: "/system/system/tellers",
    icon: React.createElement(UserOutlined),
    label: "Tellers",
  },
  {
    key: "/system/system/distributors",
    icon: React.createElement(TeamOutlined),
    label: "Distributors",
  },
];

const topNavMenuItems = [
  {
    label: "Subscriptions",
    key: "subscriptions",
    icon: <DesktopOutlined />,
    children: [
      {
        label: "Renew Subscrioption",
        key: "/system/subscriptions/renew",
      },
      {
        label: "Sales accessories",
        key: "/system/subscriptions/sales-accessories",
      },
      {
        label: "Subscription record",
        key: "/system/subscriptions/record",
      },
      {
        label: "New subscriber",
        key: "/system/subscribers/new",
      },
    ],
  },

  {
    label: "Teller Sales",
    key: "tellerSales",
    icon: <SolutionOutlined />,
    children: [
      {
        label: "Daily sales report",
        key: "/system/teller-sales/report",
      },
      {
        label: "Active branch",
        key: "/system/teller-sales/active-branch",
      },
    ],
  },

  {
    label: "Distributors",
    key: "distributors",
    icon: <ApartmentOutlined />,
    children: [
      {
        label: "List",
        key: "/system/distributors",
      },
      {
        label: "Top up",
        key: "/system/distributors/topup",
      },
      {
        label: "Request Top up",
        key: "/system/distributors/request-topup",
      },
    ],
  },

  {
    label: "Tellers",
    key: "tellers",
    icon: <ShopOutlined />,
    children: [
      {
        label: "List",
        key: "/system/tellers",
      },
      {
        label: "Top up",
        key: "/system/tellers/topup",
      },
      {
        label: "Request Top up",
        key: "/system/tellers/request-topup",
      },
    ],
  },

  {
    // key: "username",
    label: `Administrator`,
    icon: <UserOutlined />,
    style: { marginLeft: "auto" },
    children: [
      {
        label: "My Profile",
        key: "/system/profile",
      },
    ],
    // onClick: logout,
  },

  {
    key: "logout",
    label: "Logout",
    danger: true,
    icon: <LogoutOutlined className="text-red-400" />,
    // style: { marginLeft: "auto" },
    // onClick: logout,
  },
];

export default function GlobalComponent({ children }) {
  let router = useRouter();
  let pathName = usePathname();
  const [current, setCurrent] = useState(pathName.substring(1));

  let parts = pathName.split("/");
  if (parts.length >= 3) {
    pathName = `/${parts[1]}/${parts[2]}`;
  }
  useEffect(() => {
    setCurrent(pathName.substring(1));
  }, [pathName]);

  const onClick = (e) => {
    if (e.key === "logout") {
      //   logout();
    } else {
      router.push(`${e.key}`);
      // setScreen(e.key);
    }
    setCurrent(e.key);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        type: "tween",
        ease: "circOut",
      }}
    >
      <Layout className="h-screen">
        {/* <Layout.Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#fff",
          }}
        >
          <div
            className="demo-logo-vertical font-semibold items-center justify-center flex"
            style={{
              marginTop: "1rem",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <Image src="/android-chrome-192x192.png" height={40} width={40} />
          </div>
          <Menu
            //   theme="dark"
            mode="inline"
            onClick={onClick}
            defaultSelectedKeys={["/system/distributors"]}
            selectedKeys={[current]}
            items={items}
            style={{ height: "100%", paddingTop: "1.5rem" }}
          />
        </Layout.Sider> */}

        <Layout className="site-layout ">
          <Layout.Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              padding: "0",

              //   background: "#fff",
            }}
            className="flex flex-row items-center bg-white"
          >
            <Image
              src="/android-chrome-192x192.png"
              className="mx-5"
              height={35}
              width={35}
            />
            <Menu
              onClick={onClick}
              className="w-full p-0 m-0"
              //   selectedKeys={[current]}
              mode="horizontal"
              items={topNavMenuItems}
            />
          </Layout.Header>

          <Layout.Content
            className="my-5 mx-20"
            // style={{ margin: "24px 16px 0", overflow: "initial" }}
          >
            {children}
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }} className="">
            DSM System ©2023 MVEND
          </Layout.Footer>
        </Layout>
      </Layout>
    </motion.div>
  );
}
