import { Form, Input, Modal } from "antd-mobile";

type ConfirmType = {
  open: boolean;
  setOpen: (s: boolean) => void;
  onSubmit: (o) => void;
};

export function Confirm({ open, setOpen, onSubmit }: ConfirmType) {
  const [form] = Form.useForm();

  function onConfirm() {
    form
      .validateFields()
      .then((val) => {
        onSubmit(val);
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Modal
      visible={open}
      content={
        <Form form={form}>
          <Form.Header>
            为了工作人员为您提供更有针对性的服务，请留下您的手机号。
          </Form.Header>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[
              { required: true },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" }
            ]}
          >
            <Input placeholder="请输入您的手机号" />
          </Form.Item>
          <Form.Item
            name="wechat"
            label="微信号"
            rules={[
              { required: true },
              {
                pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
                message: "请输入正确格式的微信号"
              }
            ]}
          >
            <Input placeholder="请输入您的微信号" />
          </Form.Item>
        </Form>
      }
      // closeOnMaskClick: true,
      //
      actions={[
        {
          key: "confirm",
          text: "确定",
          onClick: onConfirm
        }
      ]}
    />
  );
}
