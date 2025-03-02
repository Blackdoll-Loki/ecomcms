import { Form, useLoaderData } from "@remix-run/react";
import { adminAuthLoader } from "~/.server/admin/loaders/auth.login.loader";
import { AdminAuthLoginAction } from "~/.server/admin/actions/auth.login.action";
import { Button, Card, FormLayout, TextField, Text, Box, Banner, TextContainer } from "@shopify/polaris";
import { useState } from "react";

export const action = AdminAuthLoginAction

export const loader = adminAuthLoader;

export default function Index() {
  const data = useLoaderData<typeof loader>()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Admin CMS
      </Text>

      {data.error && (
        <Box paddingBlockStart="200">
          <Banner tone="warning">
            <p>
              Use your finance report to get detailed information about your
              business.
            </p>
          </Banner>
        </Box>
      )}

      <Box paddingBlockStart="200">
        <Form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
          <FormLayout>
            <TextField
            label="email"
            type="email"
            name="email"
            autoComplete="email" 
            value={email}
            onChange={setEmail}/>
            <TextField
            label="password"
            type="password"
            name="password"
            autoComplete="on" 
            value={password}
            onChange={setPassword}/>

            <Button submit={true}>Sign In</Button>
          </FormLayout>
        </Form>
      </Box>
    </Card>
  );
}
