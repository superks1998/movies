import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
    return <Footer style={{ textAlign: "center" }}>Ant Design ©2021</Footer>;
};

export default React.memo(FooterComponent);
