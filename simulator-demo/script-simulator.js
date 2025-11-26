// script-simulator.js
document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('calculator-form');
  const totalDisplay = document.getElementById('total-price');

  // === 1. フォームの動的生成 ===
  function renderForm() {
      formContainer.innerHTML = '';
      SIMULATOR_CONFIG.forEach(item => {
          let itemHtml = `<div class="form-group" data-id="${item.id}">`;
          
          if (item.type === 'radio') {
              // ラジオボタンの処理
              itemHtml += `<h5>${item.label}</h5>`;
              item.options.forEach((option, index) => {
                  itemHtml += `
                      <label>
                          <input type="radio" name="${item.id}" value="${option.value}" ${index === 0 ? 'checked' : ''}>
                          ${option.text} (+${option.value.toLocaleString()}円)
                      </label>
                  `;
              });
          } else if (item.type === 'checkbox') {
              // チェックボックスの処理
              itemHtml += `
                  <label>
                      <input type="checkbox" name="${item.id}" value="${item.price}">
                      ${item.label} (+${item.price.toLocaleString()}円)
                  </label>
              `;
          } else if (item.type === 'number') {
              // 数量入力の処理
              itemHtml += `
                  <label>${item.label}</label>
                  <input type="number" name="${item.id}" value="${item.min}" min="${item.min}" max="${item.max}">
              `;
          }

          itemHtml += `</div>`;
          formContainer.innerHTML += itemHtml;
      });

      // フォーム生成後、イベントリスナーを設定
      formContainer.addEventListener('change', calculateTotal);
      formContainer.addEventListener('input', calculateTotal);
      calculateTotal(); // 初期表示
  }

  // === 2. 合計金額の計算 ===
  function calculateTotal() {
      let total = 0;
      
      SIMULATOR_CONFIG.forEach(item => {
          const elements = formContainer.querySelectorAll(`[name="${item.id}"]`);
          
          if (item.type === 'radio') {
              const selected = formContainer.querySelector(`input[name="${item.id}"]:checked`);
              if (selected) {
                  total += parseInt(selected.value);
              }
          } else if (item.type === 'checkbox') {
              elements.forEach(el => {
                  if (el.checked) {
                      total += parseInt(el.value);
                  }
              });
          } else if (item.type === 'number') {
              elements.forEach(el => {
                  const quantity = parseInt(el.value);
                  if (quantity >= item.min) {
                      total += item.price * quantity;
                  }
              });
          }
      });

      totalDisplay.textContent = total.toLocaleString() + ' 円';
  }

  renderForm();
});