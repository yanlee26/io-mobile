import React, { useEffect } from "react";
import { Form, Stepper } from "antd-mobile";


export const stepperStyle = {
  width: 120
  // marginLeft: -10
};
export function getId() {
  const id = (Math.random() + 1).toString(36).substring(7);
  return id;
}

export default function IoForm({
  form,
  initialValues,
  config,
  step
}: {
  form: any;
  initialValues: any;
  config: any;
  step: number;
}) {

  useEffect(() => {
    // sync first
    form.setFieldsValue(initialValues);
    return ()=>form.resetFields()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)]);

  console.log(initialValues);
  return (
    <div className="form-container">
      <Form mode="card" form={form} initialValues={initialValues}>
        {config.items?.map((x, idx) => (
          <Form.Item
            layout="horizontal"
            name={`${step}item${idx}`}
            label={x.label}
            key={idx}
            // required
            // rules={[
            //   { required: true, message: "输入不能为空" },
            //   {
            //     type: "number",
            //     message: "请输入数字"
            //   }
            // ]}
          >
            <Stepper style={stepperStyle} />
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
