// main.js
import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

const box = document.querySelector('#box');
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    animate(box, { scale: [1, 1.4, 1] }, { duration: 0.4 });
});

animate(box, { rotate: [0, 180, 0] }, { scale: [1, 5, 1] }, { duration: 0.6 });


/* // ① 横に飛ぶ
animate(box, { x: [0, 100, 0] }, { duration: 0.5 });

// ② 消えて現れる
animate(box, { opacity: [1, 0, 1] }, { duration: 0.6 });

// ③ 色が変わる
animate(box, { backgroundColor: ['#4CAF50', '#f44336', '#4CAF50'] }, { duration: 0.5 });

④ 回転する
animate(box, { rotate: [0, 180, 0] }, { duration: 0.6 });

// ⑤ 組み合わせる
animate(box, { scale: [1, 1.3, 1], rotate: [0, 90, 0] }, { duration: 0.5 }); */