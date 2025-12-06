(()=> {
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
                input += `<input type="checkbox" name="ansinWidget-${area}-checkbox" class="ansinWidget-checkbox" value="${item.price}" id="ansinWidget-${area}-input_${iidx}"></input>`;
                input += label;
            }
            if (obj.type === 3) {
                input += label;
                input = `<input type="number" name="ansinWidget-${area}-number" class="ansinWidget-number" value="0" min="${item.min? item.min: 0}" ${item.max?  "max=" + item.max: ""}  data-price="${item.price}" id="ansinWidget-${area}-number_${iidx}"></input>`;
            }
            return input;
        });
        const select = (() => {
            if (obj.type !== 2) return "";
            const options = obj.items.map((item) => `<option value="${item.price}">${item.name}</option>`);
            return `<select name="ansinWidget-${area}-select" id="ansinWidget-${area}-input_${idx}"><option value="">選択してください</option>${options.join("")}</select>`;
        });
        
        return `<div class="ansinWidget-${area}-inner" ${typeof idx === "undefined"? "": 'data-idx="' + idx + '"'}>${obj.label}${select() || items.join("")}</div>`;
    }