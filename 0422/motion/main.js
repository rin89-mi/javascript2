import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

//対象となる要素を取得
const box = document.querySelector('#box');
//const box = document.getElementById("box");

//引数は３つ。一番目はアニメーションさせる要素、２番目はアニメーションの内容、3番目はオプション(時間とかeasingの設定とか)
animate(box, { opacity: [0, 1] }, { duration: 3 });

// 大きさが変わる
animate(element, { scale: [1, 1.3, 1] }, { duration: 1, repeat: Infinity });

// 横に動く
animate(element, { x: [0, 100, 0] }, { duration: 5 });

// フェードイン
animate(element, { opacity: [0, 1] }, { duration: 3 });

// 色が変わる（背景色）
animate(element, { backgroundColor: ['#fff', '#f00'] }, { duration: 0.3 });