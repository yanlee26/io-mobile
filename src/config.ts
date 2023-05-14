export const title = "家庭经济情况统计";
export const desc =
  "说明：为了给您提供更好的服务，请您如实填家庭经济情况，系统将会自动计算出您家庭的各项经济指标是否健康。咨询专业人员，将为您做适合您家庭的理财规划建议。";

function getItems(list: string[]) {
  return list
    .map((li) => ({
      label: li
    }))
    .concat({
      label: "其它"
    });
}

export const ioItems = [
  {
    title: '主动收入',
    items: getItems(['工资', '奖金', '公积金']),
  },
  {
    title: '被动收入',
    items: getItems(['房租', '投资收益', '分红', '利息']),
  },
  // {
  //   title: '其它收入',
  //   items: getItems([]),
  // },
  {
    title: '负债性支出',
    items: getItems(['房贷', '车贷', '信用贷']),
  },
  {
    title: '其它固定支出',
    items: getItems(['保险', '房租']),
  },
  {
    title: '生活开销',
    items: getItems(['吃', '穿', '用']),
  },
  {
    title: '特殊支出',
    items: getItems(['教育', '医疗', '投资性支出', '玩']),
  },
];

export const alItems = [
  {
    title: '自用实物资产',
    items: getItems(['自住房产', '汽车', '车位', '珠宝及收藏品']),
  },
  {
    title: '投资实物资产',
    items: getItems(['投资房产']),
  },
  {
    title: '金融资产',
    items: getItems(['债券', '基金', '期权期货等']),
  },
  {
    title: '流动资产',
    items: getItems(['现金', '银行存款', '货币基金含余额宝等', '玩']),
  },
  {
    title: '其它资产',
    items: getItems(['保险现金价值', '应收款', '公积金', '公司股权']),
  },
  {
    title: '实物抵押贷',
    items: getItems(['房贷', '车贷']),
  },
  {
    title: '金融信用贷',
    items: getItems(['信用贷', '信用卡']),
  },
  {
    title: '其它贷',
    items: getItems(['保险贷款', '其它贷款']),
  },
];


function getFormConfig(step: number, items = 3) {
  const obj = {};

  new Array(items + 1).fill("").forEach((x, i) => {
    obj[`${step}step${i}`] = 0;
  });

  //obj[`stepelse`] = [];
  return obj;
}
export function initialIoFormData() {
  return {
    step0: getFormConfig(0, 3),
    step1: getFormConfig(1, 4),
    step2: getFormConfig(2, 3),
    step3: getFormConfig(3, 3),
    step4: getFormConfig(4, 2),
    step5: getFormConfig(5, 3),
    step6: getFormConfig(6, 4)
  };
}

export function initialAlFormData() {
  return {
    step0: getFormConfig(0, 4),
    step1: getFormConfig(1, 1),
    step2: getFormConfig(2, 4),
    step3: getFormConfig(3, 3),
    step4: getFormConfig(4, 4),
    step5: getFormConfig(5, 2),
    step6: getFormConfig(6, 2),
    step7: getFormConfig(7, 2)
  };
}

export const options = [
  {
    label: "收入支出",
    value: "io"
  },
  {
    label: "资产负债",
    value: "al"
  }
];

export function getConfig(isIo = true) {
  const list = isIo ? ioItems : alItems;

  return {
    list,
    total: list.length,
    initialData: isIo ? initialIoFormData() : initialAlFormData()
  };
}