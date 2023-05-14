import React, { useEffect, useState } from 'react';
import {
  Toast,
  Card,
  Button,
  ProgressBar,
  Form,
  Footer,
  Cascader,
} from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';

import IoForm from './components/IoForm';
import { Confirm } from './components/Confirm';
import { desc, title, options, getConfig } from './config';
import './App.css';
import { addFamily } from './api';
export const stepperStyle = {
  width: 120,
  // marginLeft: -10
};
const IO = 'io';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(['io']);
  const [ioForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const typeKey = type[0];
  const isIo = typeKey === IO;

  const option = isIo ? options[0] : options[1];

  const { list, total, initialData } = getConfig(isIo);
  const [formData, setFormData] = useState(initialData);
  const currentFormValue = formData[`step${step}`];

  //console.log("currentFormValue", currentFormValue);
  const currentFormConfig = list[step] || { title: '' };
  const isToSubmit = step === total - 1;

  useEffect(() => {
    const str = localStorage.getItem(typeKey);
    const json = JSON.parse(str);
    // console.log("json", json);
    if (json) {
      setFormData(json);
    }
  }, [typeKey]);

  useEffect(() => {
    // sync first
    ioForm.setFieldsValue(currentFormValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentFormValue)]);

  function setMemoFormData(values) {
    setFormData((pre) => ({
      ...pre,
      [`step${step}`]: values,
    }));
  }

  function beforeChange(go) {
    ioForm
      .validateFields()
      .then((val) => {
        // console.log(11, val);
        setMemoFormData(val);
        ioForm.resetFields();
        go();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function prev() {
    beforeChange(() => setStep((s) => (!s ? 0 : --s)));
  }

  function next() {
    beforeChange(() => {
      const rst = step === total - 1 ? total - 1 : step + 1;
      setStep(rst);
      if (isToSubmit) {
        setConfirmVisible(true);
      }
    });
  }

  function onTypeChange(params) {
    setType(params);
    setStep(0);
  }

  function onSubmit(val) {
    // console.log(11, val, formData);
    localStorage.setItem(type[0], JSON.stringify(formData));

    addFamily(
      {
        Mobile: val.mobile,
        Wechat: val.wechat,
        JsonData: formData,
      },
      isIo
    )
      .then((res) => {
        Toast.show({
          icon: 'success',
          content: '提交成功',
        });
      })
      .catch((e) => {
        Toast.show({
          icon: 'fail',
          content: '提交失败',
        });
      });
  }

  return (
    <div className='container'>
      <h3
        className='center title'
        onClick={() => {
          setVisible(true);
        }}>
        {title}
        <span className='sub-title primary'>
          {option.label}
          <DownOutline />
        </span>
      </h3>
      <div className='mt-8'>
        <ProgressBar percent={100 * (step / (total - 1))} />
      </div>
      <Card title={currentFormConfig.title + '(万元)'}>
        <IoForm
          form={ioForm}
          config={currentFormConfig}
          initialValues={currentFormValue}
          step={step}></IoForm>

        <div className={'footer'}>
          <div className='between'>
            <div>
              {!!step && (
                <Button color='primary' fill='outline' onClick={prev}>
                  上一步
                </Button>
              )}
            </div>

            <Button
              color='primary'
              fill={isToSubmit ? 'solid' : 'outline'}
              onClick={next}>
              {isToSubmit ? '提 交' : '下一步'}
            </Button>
          </div>
        </div>
      </Card>
      <Footer content={<div className='footer-desc'>{desc}</div>}></Footer>
      <Cascader
        options={options}
        visible={visible}
        defaultValue={type}
        onSelect={onTypeChange}
        onClose={() => {
          setVisible(false);
        }}
      />
      <Confirm
        onSubmit={onSubmit}
        open={confirmVisible}
        setOpen={setConfirmVisible}
      />
    </div>
  );
};