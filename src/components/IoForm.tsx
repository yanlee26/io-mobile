import React from "react";
import { Form, Stepper } from "antd-mobile";


export const stepperStyle = {
  width: 120
  // marginLeft: -10
};
export function getId() {
  const id = (Math.random() + 1).toString(36).substring(7);
  return id;
}

export default ({
  form,
  initialValues,
  config,
  step
}: {
  form: any;
  initialValues: any;
  config: any;
  step: number;
}) => {
  return (
    <div className="form-container">
      <Form mode="card" form={form} initialValues={initialValues}>
        {config.items?.map((x, idx) => (
          <Form.Item
            name={`${step}item${idx}`}
            layout="horizontal"
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

/**
        {config.addons?.map((x, idx) => (
          <Form.Item
            name={x.name}
            layout="horizontal"
            label={x.label + (1 + idx)}
            key={x.id}
            style={{ height: 53 }}
          >
            <Stepper style={stepperStyle} />
            <CloseOutline
              color="var(--adm-color-danger)"
              style={{
                float: "right",
                position: "relative",
                left: -10,
                top: -24
              }}
              onClick={() => remove(x.id)}
            />
          </Form.Item>
        ))}

    <Button color="primary" block fill="outline" onClick={add}>
        <AddCircleOutline /> 添加
      </Button>

*/
