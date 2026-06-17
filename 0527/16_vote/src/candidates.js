// candidates.js
import './style.css';

import { animate, inView, stagger, scroll } from "motion";


// h2
inView("h2", () => {
    animate(
        "h2",
        {
            opacity: [0, 1],
            y: [100, 0],
        },
        {
            duration: 1.2,
            easing: "ease-out",
        }
    );
});


// カード

const cards = document.querySelectorAll(".card");

inView("#voteList", () => {

    animate(
        cards,
        {
            opacity: [0, 1],
            y: [600, 0],
        },
        {
            duration: 1.5,
            delay: stagger(0.6),
            easing: "ease-out",
        }
    );

    // 1位カード取得
    const topId = getTopId();
    const topCard = document.querySelector(`[data-id="${topId}"]`);

    // カードが出終わった頃に回転
    setTimeout(() => {
        animate(
            topCard,
            {
                rotate: [720],
                scale: [1, 1.2, 1]
            },
            {
                duration: 1.5
            }
        );
    }, 2000);

    return () => {
        animate(
            cards,
            {
                opacity: 0,
                y: 100,
            },
            {
                duration: 0.2,
            }
        );
    };
});


const voteList = document.querySelector("#voteList");

scroll(
    animate(
        voteList,
        {
            opacity: [1, 0],
            y: [0, -150],
        },
        {
            easing: "linear",
        }
    ),
    {
        target: voteList,
        offset: ["end 1", "end 0.5"],
    }
);



// 自分のテーマに合わせて書き直してください。
const candidates = JSON.parse(
    localStorage.getItem("candidates")
) || [
        { id: 1, votes: 0 },
        { id: 2, votes: 0 },
        { id: 3, votes: 0 },
    ];

// 票数テキストを更新する関数
const updateVoteText = () => {
    candidates.forEach((item) => {
        const card = document.querySelector(`[data-id="${item.id}"]`);
        card.querySelector('.votes').textContent = `${item.votes}票`;
    });
};
updateVoteText();

// 各候補の得票率を返す関数
export const vote = (id) => {
    const target = candidates.find((item) => item.id === id);
    if (!target) return 0;
    target.votes++;
    localStorage.setItem(
        "candidates",
        JSON.stringify(candidates)
    );
    updateVoteText();
    return target.votes;
};

export const getRates = () => {
    const total = candidates.reduce((sum, item) => sum + item.votes, 0);

    return candidates.map((item) => ({
        id: item.id,
        rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
    }));
};

export const getTopId = () => {
    let top = candidates[0];
    candidates.forEach((item) => {
        if (item.votes > top.votes) {
            top = item;
        }
    });
    return top.id;
};
