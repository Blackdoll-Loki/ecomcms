import { Outlet } from "@remix-run/react";
import { Layout, Page } from "@shopify/polaris";

export default function AdminAuth(){
  return (
    <Page narrowWidth>
    <Layout>
      <Layout.Section>
        <Outlet />
      </Layout.Section>
    </Layout>
  </Page>
  );
}