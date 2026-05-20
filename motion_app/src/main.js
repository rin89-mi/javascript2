import { animate } from "motion";
//nodemodulesからmotionを読み込んでいる

const btn = document.querySelector("#copyBtn");
//btn (id = "copyBtn")の中の要素を取得する。
const icon = btn.querySelector(".copy-icon");
const label = btn.querySelector(".copy-label");
//letで書かれているということは、後で値が変わる可能性がある。
//フラグ treu <=>flse
let isCopying = false;

// コピー後の状態に切り替える
//普通の関数の定義
function showCopied() {
  icon.textContent = "✅";
  label.textContent = "コピーしました";
  btn.classList.add("copied");
  animate(btn, { scale: [1, 1.08, 1] }, { duration: 0.25 });
}

// 元の状態に戻す
//関数式の関数の定義
const resetButton = function () {
  icon.textContent = "📋";
  label.textContent = "コピー";
  btn.classList.remove("copied");
  isCopying = false;
};

//アロー関数
btn.addEventListener("click", () => {
  //if (true)だったらreturn
  //returnが出てきたら、そのあとは実行しない。
  if (isCopying) return;
  isCopying = true;

  //関数の実行
  showCopied();
  //関数名だけ　＝　関数の定義
  //setTimeoutは、javascriptが持っている関数　＝　組み込み関数;
  setTimeout(resetButton, 2000);
});



//リップルボタン用のhavascript
const rippleButton = document.querySelector("#rippleBtn");
//定数を定義する場合は、大文字のスネーク記法で記述するのか慣例
const RIPPLE_SIZE = 80; // CSSのwidthと合わせる

// 左下・右下のうちクリック位置に近い方を返す
//アロー関数の関数式で定義
const getNearestCorner = (rect, x, y) => {
  //オブジェクトの配列
  const corners = [
    { x: 0, y: rect.height },
    { x: rect.width, y: rect.height },
  ];
  //reduce全部をたす
  return corners.reduce((a, b) => {
    const da = (a.x - x) ** 2 + (a.y - y) ** 2;
    const db = (b.x - x) ** 2 + (b.y - y) ** 2;
    //三項演算子　（もし、da<dbがtureだったらa、じゃなかったらb）
    return da < db ? a : b;
  });
};

// 指定位置に波紋要素を生成して追加する
//関数(波紋を作る)の定義　＋　引数つき
function createRipple(parent, x, y, size) {
  //creatElementは、要素を創る
  //要素は、<span>~</span>
  const ripple = document.createElement("span");
  //作った<span class="ripple"></span>
  ripple.classList.add("ripple");
  //<span class="ripple" style="left:???"></span>
  //potionで動く要素、波紋の出所を調節しています。
  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  //親要素の追加する（append）
  parent.appendChild(ripple);
  return ripple;
}

// 波紋を広げて消すアニメーション
//関数式の関数の定義＋引数付き
const playRipple = function (ripple) {
  //戻り値、animateなので、アニメーションの設定が戻る
  //thenは、直訳すると「それから」、この書き方をpromise「約束」という
  //Ajaxのfetch()に出てきた
  return animate(
    ripple,
    { scale: [0, 5], opacity: [1, 0] },
    { duration: 0.8, ease: [0.2, 0, 0.4, 1] },
  ).then(() => ripple.remove());
  //remove()は、motionのアニメーションを外す関数
};

rippleButton.addEventListener("click", (e) => {
  //eの引数を設定すると、clickしたElement（要素）
  console.log(e);
  //要素のサイズとブラウザ画面上での位置を取得するため、javascriptメソッド
  const rect = rippleButton.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  //関数の実行した値が変数に入る
  const nearest = getNearestCorner(rect, cx, cy);
  //入った変数の値を更に関数に入れて、戻ってきた値がripple
  const ripple = createRipple(rippleButton, nearest.x, nearest.y, RIPPLE_SIZE);
  //rippleでアニメーションさせる関数を実行
  playRipple(ripple);
});



//チルトカード
const tiltCard = document.querySelector("#tiltCard");

// カード内でのマウス位置を -0.5〜0.5 の範囲に正規化する
//関数の定義＋引数付き
function getNormalizedPosition(rect, clientX, clientY) {
  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;
  return { x, y };
}

// カードを傾ける
//①function 関数名
//②const　関数名　= function(){} ※関数式
//③関数名()=>{}　※アロー関数
//④const 関数名　= (){} ※アロー関数を使った関数式
//関数の定義
const tilt = function (card, x, y) {
  //montionの設定が引数の値で変化する
  animate(
    card,
    { rotateX: -y * 40, rotateY: x * 40, scale: 1.1 },
    { duration: 0.1, ease: "linear" },
  );
};

// カードを元に戻す
//関数定義（アロー関数を使った関数式）
const resetTilt = (card) => {
  animate(
    card,
    { rotateX: 0, rotateY: 0, scale: 1 },
    { duration: 0.4, ease: "ease-out" },
  );
};

//イベントの設定　（マウスを乗せた時）
tiltCard.addEventListener("mousemove", (e) => {
  //対象となるElement
  const rect = tiltCard.getBoundingClientRect();
  //この関数は、要素の中でのマウス位置を[-0.5 ~ 0.5]の範囲に変換します。
  const { x, y } = getNormalizedPosition(rect, e.clientX, e.clientY);
  //関数の実行
  tilt(tiltCard, x, y);
});

//イベントの設定で、マウスを外した時に
tiltCard.addEventListener("mouseleave", () => {
  //リセットする関数の実行
  resetTilt(tiltCard);
});
