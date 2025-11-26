// config-simulator.js

const SIMULATOR_CONFIG = [
  {
      id: 'base-service',
      label: '基本サービス項目（必須）',
      type: 'radio',
      price: 50000,
      options: [
          { text: 'スタンダード機能セット', value: 50000 },
          { text: 'プレミアム機能セット', value: 80000 }
      ]
  },
  {
      id: 'option-a',
      label: '追加オプションA：データ連携機能',
      type: 'checkbox',
      price: 15000
  },
  {
      id: 'option-b',
      label: '追加オプションB：デザインカスタム',
      type: 'checkbox',
      price: 25000
  },
  {
      id: 'quantity',
      label: 'ページ数・数量（1ページあたり）',
      type: 'number',
      price: 10000,
      min: 1,
      max: 10
  }
];