"use client";
import { Layout, Menu } from "antd";
import React from "react";

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
        key:0,
        icon: React.createElement(UserOutlined),
        label: 'Tellers'
    },
    {
        key:1,
        icon: React.createElement(TeamOutlined),
        label:'Distributors'
    }
]
export default function GlobalComponent({ children }) {
  return (
    <Layout hasSider>
      <Layout.Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: '#fff'
        }}
      >
        <div className="demo-logo-vertical font-semibold" style={{margin: '2rem'}} >DSM System</div>
        <Menu
        //   theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          style={{height:'100%', paddingTop:'0.2rem'}}
        />
      </Layout.Sider>

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Layout.Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: '#fff'
          }}
        ></Layout.Header>

        <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Layout.Content>

        <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}