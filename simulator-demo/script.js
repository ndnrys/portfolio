
const texts = ansinWidgetConfig.info.texts.map((txt, idx) => `<p class="ansinWidget-txt ansinWidget-txt_${idx}">${txt}</p>`);
const cta = ansinWidgetConfig.info.cta.use? `<div class="ansinWidget-cta"><a href="${ansinWidgetConfig.info.cta.url}" class="ansinWidget-cta-link">${ansinWidgetConfig.info.cta.text}</a></div>`: "";
const baseItems = getItemsHTML("base", ansinWidgetConfig.base);
const base = `<div class="ansinWidget-base"</div>`;
const option = `<div class="ansinWidget-base"><div class="ansinWidget-base-label">${ansinWidgetConfig.base.label}</div></div>`;

const html = `<div class="ansinWidget-inner">
<div class="ansinWidget-title">${ansinWidgetConfig.info.title}</div>
${ansinWidgetConfig.info.close? '<div class="ansinWidget-close"></div>': ''}
<div class="ansinWidget-base">${base}</div>
<div class="ansinWidget-option">${option}</div>
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

function getItemsHTML(area, obj) {
    const items = obj.items.map((item, idx) => {
        let input = "";
        if (item.type === 0) {
            input = `<input type="radio" class="ansinWidget-text" value="${item.price}"></input>`
        }
        return `<div class="ansinWidget-${area}-item" data-idx="${idx}">
        <label class="ansinWidget-${area}-name" for="ansinWidget-${area}-input-${idx}">
        ${item.name}
        </label>
        <div class="ansinWidget-${area}-input" id="ansinWidget-${area}-input-${idx}">
            ${input}
        </div>
        </div>`;
    });
    return `<div class="ansinWidget-${area}-inner"><div class="ansinWidget-${area}-label">${obj.label}</div>${items.join("")}</div>`;
}