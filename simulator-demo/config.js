// config.js
const ansinWidgetConfig = {
    info: {
        close: 0,
        title: "タイトル",
        texts: [
            "ここはテキスト1です",
            "ここはテキスト2です",
            "ここはテキスト3です",
        ],
    },
    cta: {
        use: 1,
        text: "お見積もりはこちら",
        url: "google.com"
    },
    base: {
        label: "基本サービス項目（必須）",
        type: 0, // 0: radio, 1: checkbox, 2: pulldown
        items: [
            {
                name: "スタンダード機能セット (+50,000円) ",
                price: 50000
            },
            {
                name: "プレミアム機能セット (+80,000円)", 
                price: 80000
            }
        ]
    },
    option: [
        {
        label: "基本サービス項目チェックボックス（必須）",
        type: 1, // 0: radio, 1: checkbox, 2: pulldown, 3: number
        items: [
            {
                name: "追加オプションA：データ連携機能 (+15,000円)",
                price: 15000
            },
            {
                name: "追加オプションB：デザインカスタム (+25,000円)", 
                price: 25000
            }
        ]
        },
        {
            label: "基本サービス項目プルダウン（必須）",
            type: 2, // 0: radio, 1: checkbox, 2: pulldown, 3: number
            items: [
                {
                    name: "追加オプションA：データ連携機能 (+15,000円)",
                    price: 15000
                },
                {
                    name: "追加オプションB：デザインカスタム (+25,000円)", 
                    price: 25000
                }
            ]
        },
        {
            label: "基本サービス項目テキスト（必須）",
            type: 3, // 0: radio, 1: checkbox, 2: pulldown, 3: number
            items: [
                {
                    name: "ページ1枚 (+10,000円)",
                    price: 10000,
                    min: 0,
                    max: 10
                }
            ]
        }
    ]
};