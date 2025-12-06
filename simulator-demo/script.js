(()=> {
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
                required: 1,
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
                required: 1,
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
    const texts = ansinWidgetConfig.info.texts.map((txt, idx) => `<p class="ansinWidget-txt ansinWidget-txt_${idx}">${txt}</p>`);
    const cta = ansinWidgetConfig.cta.use? `<div class="ansinWidget-cta"><a href="${ansinWidgetConfig.cta.url}" class="ansinWidget-cta-link">${ansinWidgetConfig.cta.text}</a></div>`: "";
    const base = `<div class="ansinWidget-base">${getItemsHTML("base", ansinWidgetConfig.base)}</div>`;
    const options = ansinWidgetConfig.option.map((op, idx) => getItemsHTML("option", op, idx));
    const option = `<div class="ansinWidget-option">${options.join("")}</div>`;
    
    const html = `<div class="ansinWidget-inner">
    <div class="ansinWidget-title">${ansinWidgetConfig.info.title}</div>
    ${ansinWidgetConfig.info.close? '<div class="ansinWidget-close"></div>': ''}
    ${base}
    ${option}
    <div class="ansinWidget-total">
        <span class="ansinWidget-total-txt"></span>
        <span class="ansinWidget-total-price"></span>
    </div>
    ${texts.join("")}
    ${cta}
    </div>
    </div>`;
    const target = document.getElementById("ansinWidget");
    target.innerHTML = html;
    })();
    function getItemsHTML(area, obj, idx) {
        const items = obj.items.map((item, iidx) => {
            if (obj.type === 2) return "";
            let input = "";
            const label = `<label class="ansinWidget-${area}-name" for="ansinWidget-${area}-input_${iidx}">${item.name}</label>`;
            if (obj.type === 0) {
                input += `<input type="radio" name="ansinWidget-${area}-radio" class="ansinWidget-radio" value="${item.price}" id="ansinWidget-${area}-input_${iidx}"></input>`;
                input += label;
            }
            if (obj.type === 1) {
                input += `<input type="checkbox" name="ansinWidget-${area}-checkbox" class="ansinWidget-checkbox" value="${item.price}" id="ansinWidget-${area}-input_${iidx}"></input></input>`;
                input += label;
            }
            if (obj.type === 3) {
                input += label;
                input = `<input type="number" name="ansinWidget-${area}-number" class="ansinWidget-number" value="0" min="${item.min? item.min: 0}" ${item.max?  "max=" + item.max: ""}  data-price="${item.price}" id="ansinWidget-${area}-number_${iidx}"></input></input>`;
            }
            return input;
        });
        const select = (() => {
            if (obj.type !== 2) return "";
            const options = obj.items.map((item) => `<option value="${item.price}">${item.name}</option>`);
            return `<select name="ansinWidget-${area}-select" id="ansinWidget-${area}-input_${idx}"><option value="">選択してください</option>${options.join("")}</select></input></div>`;
        });
        
        return `<div class="ansinWidget-${area}-inner" ${typeof idx === "undefined"? "": 'data-idx="' + idx + '"'} data-required="${obj.required}"><div class="ansinWidget-error"></div><div class="ansinWidget-${area}-label">${obj.label}</div>${select() || items.join("")}</div>`;
    }