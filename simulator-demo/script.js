// IIFE (即時実行関数) でスコープを閉じ、グローバル汚染を防ぐ
(() => {
  const ansinWidgetUtil = {
    // エラーメッセージ用のテキストを定義 (機能追加)
    texts: {
      requiredError: "※必須項目です。いずれかを選択または入力してください。",
      selectionError: "※必須項目が未選択です。",
    },

    // getItemsHTML はユーザー提供のロジックを完全に維持 (変更なし)
    getItemsHTML: (area, obj, idx) => {
      const propIdx = typeof idx === "undefined" ? "" : "_" + idx;
      const items = obj.items.map((item, iidx) => {
        if (obj.type === 2) return "";
        const propIIdx = propIdx + "_" + iidx;
        const label = `<label class="ansinWidget-${area}-name" for="ansinWidget-${area}${propIIdx}">${item.name}</label>`;
        let input = "";
        if (obj.type === 0) {
          input += `<input type="radio" name="ansinWidget-${area}${propIdx}" class="ansinWidget-radio ansinWidget-calc" value="${item.price}" id="ansinWidget-${area}${propIIdx}"></input>`;
          input += label;
        }
        if (obj.type === 1) {
          input += `<input type="checkbox" name="ansinWidget-${area}${propIdx}" class="ansinWidget-checkbox ansinWidget-calc" value="${item.price}" id="ansinWidget-${area}${propIIdx}"></input>`;
          input += label;
        }
        if (obj.type === 3) {
          input += label;
          input += `<input type="number" name="ansinWidget-${area}${propIdx}" class="ansinWidget-number ansinWidget-calc" value="0" min="${
            item.min ? item.min : 0
          }" ${item.max ? "max=" + item.max : ""}  data-price="${
            item.price
          }" id="ansinWidget-${area}${propIIdx}"></input>`;
        }
        return input;
      });
      const select = () => {
        if (obj.type !== 2) return "";
        const options = obj.items.map(
          (item) => `<option value="${item.price}">${item.name}</option>`
        );
        return `<select name="ansinWidget-${area}-select${propIdx}" class="ansinWidget-select ansinWidget-calc" id="ansinWidget-${area}-select_${idx}"><option value="">選択してください</option>${options.join(
          ""
        )}</select></input>`;
      };

      return `<div class="ansinWidget-${area}-inner" ${
        typeof idx === "undefined" ? "" : 'data-idx="' + idx + '"'
      } data-required="${obj.required}">
            <div class="ansinWidget-error"></div>
            <div class="ansinWidget-${area}-label">${obj.label}</div>
            ${select() || items.join("")}
            </div>`;
    },

    /**
     * シミュレーション計算とバリデーション実行。
     * ユーザー操作があった項目のみエラー表示を更新する。
     * @param {Event} e - イベントオブジェクト。初期化時は {currentTarget: widget, type: 'init'} のようなオブジェクトを想定。
     */
    calcSimulation: (e) => {
      const widget = document.getElementById("ansinWidget");
      if (!widget) return;

      // イベントタイプが 'change' の場合のみユーザー操作があったと見なす
      const isUserInteraction = e.type === "change";

      let targetWrapper = null;
      // ユーザー操作があった場合、操作された要素の親である [data-required] wrapper を特定する
      if (isUserInteraction) {
        // e.currentTarget がイベント発生元の要素
        targetWrapper = e.currentTarget.closest("[data-required]");
      }

      const totalPriceElement = widget.querySelector(
        ".ansinWidget-total-price"
      );
      const totalTxtElement = widget.querySelector(".ansinWidget-total-txt");
      const allWrappers = [...widget.querySelectorAll("[data-required]")];

      let total = 0;
      let globalIsValid = true; // 全体のバリデーションフラグ

      // --- 1. 各項目をループして合計金額を計算と【項目ごとのバリデーション】 ---
      allWrappers.forEach((wrapper) => {
        const required = wrapper.dataset.required === "1";
        let isSelected = false; // この項目の「選択済み/入力済み」フラグ
        const errorElement = wrapper.querySelector(".ansinWidget-error");

        // --- 値の取得と「選択済み」判定 ---

        // ラジオボタンの処理 (type 0)
        const radios = [...wrapper.querySelectorAll('input[type="radio"]')];
        if (radios.length > 0) {
          const checkedRadio = radios.find((r) => r.checked);
          if (checkedRadio) {
            total += parseInt(checkedRadio.value);
            isSelected = true;
          }
        }

        // チェックボックスの処理 (type 1)
        const checkboxes = [
          ...wrapper.querySelectorAll('input[type="checkbox"]'),
        ];
        if (checkboxes.length > 0) {
          const checkedCount = checkboxes.filter((cb) => cb.checked).length;
          checkboxes.forEach((cb) => {
            if (cb.checked) {
              total += parseInt(cb.value);
            }
          });
          // 必須項目のチェックボックスは一つでもチェックされていればOK
          if (checkedCount > 0) {
            isSelected = true;
          }
        }

        // プルダウンの処理 (type 2)
        const selectElement = wrapper.querySelector("select");
        if (selectElement) {
          const selectedValue = selectElement.value;
          // value="" の初期値は選択されていないと見なす
          if (selectedValue !== "") {
            total += parseInt(selectedValue);
            isSelected = true;
          }
        }

        // 数値入力の処理 (type 3)
        const numberInput = wrapper.querySelector('input[type="number"]');
        if (numberInput) {
          const pricePerUnit = parseInt(numberInput.dataset.price);
          const count = parseInt(numberInput.value) || 0;
          total += count * pricePerUnit;

          // 必須項目で、入力値がmin(デフォルト0)以上の場合、選択済みと見なす。
          if (required) {
            if (
              count > 0 ||
              (numberInput.min !== null &&
                parseInt(numberInput.min) === 0 &&
                count >= 0)
            ) {
              isSelected = true;
            }
          } else if (count >= 0) {
            // 必須でない項目は0以上であればOK
            isSelected = true;
          }
        }

        // --- 2. 【項目ごとのバリデーション】とエラー表示 ---

        // 必須項目のチェックで globalIsValid を更新 (UI表示とは切り離す)
        if (required && !isSelected) {
          globalIsValid = false;
        }

        // エラーUIの更新は、以下の条件を満たす場合にのみ行う:
        // 1. ユーザー操作時である (isUserInteraction)
        // 2. かつ、現在ループ中の wrapper が操作された項目である (wrapper === targetWrapper)
        if (isUserInteraction && wrapper === targetWrapper) {
          if (required && !isSelected) {
            // 操作した項目がエラーになった場合
            wrapper.classList.add("ansinWidget-error-active");
            if (errorElement)
              errorElement.textContent = ansinWidgetUtil.texts.requiredError;
          } else {
            // 操作した項目が有効になった場合 (エラーを解除)
            wrapper.classList.remove("ansinWidget-error-active");
            if (errorElement) errorElement.textContent = "";
          }
        }

        // NOTE: 初期表示時 および、操作されなかった項目については、
        // エラーUI (classList/textContent) の操作はスキップされます。
      });

      // --- 3. 合計結果の表示 ---
      if (globalIsValid) {
        // 金額をカンマ区切りにフォーマット
        const formattedTotal = total.toLocaleString("ja-JP");
        if (totalTxtElement) totalTxtElement.textContent = "合計金額（税抜）:";
        if (totalPriceElement)
          totalPriceElement.textContent = `¥${formattedTotal} 円`;
      } else {
        // ユーザー操作時のみ、全体エラーメッセージを表示
        if (isUserInteraction) {
          if (totalTxtElement)
            totalTxtElement.textContent = ansinWidgetUtil.texts.selectionError;
        } else {
          // 初期表示時はテキストも価格も空欄にする
          if (totalTxtElement) totalTxtElement.textContent = "";
        }
        if (totalPriceElement) totalPriceElement.textContent = "";
      }

      // CTAボタンの活性化/非活性化
      const ctaButton = widget.querySelector(".ansinWidget-cta-link");
      if (ctaButton) {
        // styleの直接操作で活性/非活性を制御 (globalIsValidに基づいて、すべての項目が有効か確認)
        ctaButton.style.pointerEvents = globalIsValid ? "auto" : "none";
        ctaButton.style.opacity = globalIsValid ? "1" : "0.5";
      }
    },
  };
  const texts = ansinWidgetConfig.info.texts.map(
    (txt, idx) => `<p class="ansinWidget-txt ansinWidget-txt_${idx}">${txt}</p>`
  );
  // CTAのURLが相対パスでも動作するように修正
  const cta = ansinWidgetConfig.cta.use
    ? `<div class="ansinWidget-cta"><a href="${ansinWidgetConfig.cta.url}" class="ansinWidget-cta-link">${ansinWidgetConfig.cta.text}</a></div>`
    : "";
  const base = `<div class="ansinWidget-base">${ansinWidgetUtil.getItemsHTML(
    "base",
    ansinWidgetConfig.base
  )}</div>`;
  const options = ansinWidgetConfig.option.map((op, idx) =>
    ansinWidgetUtil.getItemsHTML("option", op, idx)
  );
  const option = `<div class="ansinWidget-option">${options.join("")}</div>`;

  const html = `<div class="ansinWidget-inner">
    <div class="ansinWidget-title">${ansinWidgetConfig.info.title}</div>
    ${
      ansinWidgetConfig.info.close
        ? '<div class="ansinWidget-close"></div>'
        : ""
    }
    ${base}
    ${option}
    <div class="ansinWidget-total">
        <span class="ansinWidget-total-txt"></span>
        <span class="ansinWidget-total-price"></span>
    </div>
    ${texts.join("")}
    ${cta}
    </div>`;

  const widget = document.getElementById("ansinWidget");

  if (!widget) return;
  widget.innerHTML = html;

  // イベントリスナーのセットアップ
  const calcs = [...widget.querySelectorAll(".ansinWidget-calc")];
  // changeイベントが発生したら、calcSimulationにイベントオブジェクトを渡す
  calcs.forEach((calc) =>
    calc.addEventListener("change", ansinWidgetUtil.calcSimulation)
  );

  // 初期表示時の計算実行 (type: 'init' を渡すことでエラーUI表示を抑制)
  ansinWidgetUtil.calcSimulation({ currentTarget: widget, type: "init" });
})();
