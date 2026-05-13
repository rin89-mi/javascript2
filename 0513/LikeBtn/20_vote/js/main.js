import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';
import { vote, getRates, getTopId } from './candidates.js';

// 全カードのバーを得票率に合わせてアニメーション
const animateBars = () => {
    getRates().forEach(({ id, rate }) => {
        const bar = document.querySelector(`[data-id="${id}"] .bar`);

        animate(
            bar,
            { width: `${rate}%` },
            { duration: 0.4, easing: 'ease-out' }
        );
    });
};

// ハート生成
const createHeart = (btn) => {
    const heart = document.createElement('div');

    heart.textContent = '♡';
    heart.classList.add('heart');

    btn.appendChild(heart);

    const randomX = Math.random() * 200 - 100;

    animate(
        heart,
        {
            x: [0, randomX],
            y: [-10, -500],
            opacity: [1, 0],
            scale: [1, 1.8]
        },
        {
            duration: 3,
            easing: 'ease-out'
        }
    );

    setTimeout(() => {
        heart.remove();
    }, 1000);
};

const createBurstHeart = (card) => {

    const heart = document.createElement('div');

    heart.textContent = '♡';
    heart.classList.add('burst-heart');

    card.appendChild(heart);

    // カード内のランダム位置
    const randomX = Math.random() * card.offsetWidth;
    const randomY = Math.random() * 100 + card.offsetHeight - 120;

    heart.style.left = `${randomX}px`;
    heart.style.top = `${randomY}px`;

    animate(
        heart,
        {
            y: [0, -200],
            x: [0, (Math.random() * 100) - 50],
            opacity: [1, 0],
            scale: [1, 2]
        },
        {
            duration: 2,
            easing: 'ease-out'
        }
    );

    setTimeout(() => {
        heart.remove();
    }, 2000);
};

const updateTopCard = () => {

    // 全カードから top-card を外す
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('top-card');
    });

    // 1位のid取得
    const topId = getTopId();

    // 1位カード取得
    const topCard = document.querySelector(`[data-id="${topId}"]`);

    // クラス追加
    topCard.classList.add('top-card');
};

document.querySelectorAll('.card').forEach((card) => {
    const id = Number(card.dataset.id);
    const btn = card.querySelector('.vote-btn');

    btn.addEventListener('click', () => {

        // 投票は1回だけ
        const currentVotes = vote(id);

        animateBars();

        updateTopCard();

        createHeart(btn);

        // 10票ごとだけ大量ハート
        if (currentVotes % 10 === 0) {

            for (let i = 0; i < 10; i++) {

                setTimeout(() => {

                    createBurstHeart(card);

                }, i * 100);

            }

        }

    });
});
