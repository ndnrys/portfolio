// config.js
const ansinWidgetConfig = {
    info: {
        close: 0,
        title: "Webサイト制作/システム開発 費用シミュレーション",
        texts: [
            "お客様のサイトになじむデザインを設定いたします",
            "このメッセージは各行お好きな位置に移動することができます",
            "他項目の表示順、表示位置（この項目は横並びにして等）は、ご調整いたします",
            "※複雑なカスタマイズは有料オプションで承ります",
        ],
    },
    cta: {
        use: 1,
        text: "お見積もりはこちら",
        url: "#"
    },
    base: {
        label: "基本サービス項目",
        required: 1,
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
        label: "基本サービス項目チェックボックス",
        required: 1,
        type: 1, // 0: radio, 1: checkbox, 2: pulldown, 3: number
        items: [
            {
                name: "追加オプションA：不要 (+0円)",
                price: 0
            },
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
            label: "基本サービス項目プルダウン",
            required: 0,
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
            label: "基本サービス項目テキスト",
            required: 0,
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