"use client";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
    key: "/system/tellers",
    icon: React.createElement(UserOutlined),
    label: "Tellers",
  },
  {
    key: "/system/distributors",
    icon: React.createElement(TeamOutlined),
    label: "Distributors",
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
      <Layout hasSider className="h-screen">
        <Layout.Sider
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
            style={{ margin: "2rem" }}
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
            style={{ height: "100%", paddingTop: "0.2rem" }}
          />
        </Layout.Sider>

        <Layout className="site-layout bg-gray-50" style={{ marginLeft: 200 }}>
          <Layout.Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              background: "#fff",
            }}
          ></Layout.Header>

          <Layout.Content
            style={{ margin: "24px 16px 0", overflow: "initial" }}
            
          >
            {children}
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }} className="bg-gray-50">
            DSM System ©2023 MVEND
          </Layout.Footer>
        </Layout>
      </Layout>
    </motion.div>
  );
}
