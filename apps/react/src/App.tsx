import {
  AppProvider,
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("Nam");

  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Add Product">
        <Card>
          <Form
            onSubmit={() => {
              console.log("submitted");
            }}
          >
            <FormLayout>
              <TextField
                value={name}
                onChange={(value) => {
                  setName(value);
                }}
                label="Name"
                type="text"
                autoComplete="off"
              />
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </AppProvider>
  );
}
