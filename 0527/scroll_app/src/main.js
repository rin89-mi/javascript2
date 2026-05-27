import './style.css'
import { inView, animate, stagger, scroll } from "motion";

//関数式
const showWithExit = function (element) {
  animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 1 });

  // MotionのinView()の仕様：コールバック関数の中で return した関数は、要素が画面外に出たときに実行される
  return () => {
    animate(element, { opacity: 0, y: 40 }, { duration: 0.4 });
  };
};

//inView関数(Motion関数)の実行
inView('.fade-target h2', showWithExit);

// 追記：カード一覧をstaggerで順番にフェードアップ
inView('.cards', () => {
  animate('.card', { opacity: [0, 1], y: [40, 0] }, { duration: 0.5, delay: stagger(0.5) });
});

// 追記：ページのスクロール進捗を progress-bar の scaleX に連動
scroll(animate(".progress-bar", { scaleX: [0, 1] }));

// 追記：.hero のスクロール量に合わせて hero-title を上にフェードアウト
scroll(
  animate(".hero-title", { opacity: [1, 0], y: [0, -200] }),
  {
    target: document.querySelector(".hero"),
    offset: ["start 0.3", "start 0"], // heroの上端が画面の30%〜0%に来る間でアニメーション
  },
);








// import { animate, stagger, inView } from "motion";

// inView(".candidates", () => {
//   animate(".card", { opacity: [0, 1], y: [40, 0] }, { duration: 0.5, delay: stagger(0.1) });
// });

/* // 監視したい要素を取得（fade-target 内の h2 を監視する）
const target = document.querySelector(".fade-target h2");

// 要素の表示状態が変わったときに呼ばれるコールバック関数
function handleIntersect(entries) {
  // entries は監視中の要素の状態を配列で持っている
  entries.forEach((entry) => {
    // 画面内に入ったかどうかを判定
    if (entry.isIntersecting) {
      // クラスを付与して、CSS側でアニメーションを発火させる
      entry.target.classList.add("is-visible");
      // 一度表示したら監視を解除（再度演出させたい場合は外す）
      observer.unobserve(entry.target);
    }
  });/*  */
//}

// IntersectionObserverを生成し、コールバック関数を渡す
//const observer = new IntersectionObserver(handleIntersect);
// 監視対象を登録（複数登録したいときは observe() を繰り返し呼ぶ）
//observer.observe(target);