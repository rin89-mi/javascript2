const STORAGE_KEY = "vote-2026";

import "./style.css";
import { animate, inView, stagger, scroll } from "motion";
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

    const topId = getTopId();
    const topCard = document.querySelector(`[data-id="${topId}"]`);

    setTimeout(() => {
        if (topCard) {
            animate(
                topCard,
                {
                    rotate: [720],
                    scale: [1, 1.2, 1],
                },
                {
                    duration: 1.5,
                }
            );
        }
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

const initialCandidates = [
    { id: 1, votes: 0 },
    { id: 2, votes: 0 },
    { id: 3, votes: 0 },
];

const loadCandidates = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCandidates;
};


//関数の定義(引数付き)
const saveCandidates = (candidates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

//変数(let)の宣言=関数の実行をした結果(return戻り値)
let candidates = loadCandidates();

console.log(candidates);

const updateVoteText = () => {
    candidates.forEach((item) => {
        const card = document.querySelector(`[data-id="${item.id}"]`);

        if (!card) return;

        const voteElement = card.querySelector(".votes");

        if (!voteElement) return;

        voteElement.textContent = `${item.votes}票`;
    });
};

export const vote = (id) => {
    //変数の更新　配列.map((引数)=>{})
    //前についた配列の要素分ループ(今回は3回)
    candidates = candidates.map((c) =>
        //cには各回の要素(オブジェクト)
        //三項(条件)演算子
        //...c = スプレット構文は、id: 1, votes:0に展開
        c.id === id ? { ...c, votes: c.votes + 1 } : c
    );
    //関数の実行 (引数付き)　※candidatesは上書きされている
    saveCandidates(candidates);
    //関数の実行
    updateVoteText();
};


export const getRates = () => {
    const total = candidates.reduce(
        (sum, item) => sum + item.votes,
        0
    );

    return candidates.map((item) => ({
        id: item.id,
        rate:
            total > 0
                ? Math.round((item.votes / total) * 100)
                : 0,
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


// ⬇ 末尾に追加：リセット用にexport
export const resetCandidates = () => {
    localStorage.removeItem(STORAGE_KEY);
    //スプレッド構文(初期値で展開)
    candidates = initialCandidates.map((c) => ({ ...c }));
    updateVoteText();
};

//最新の情報を描写　(レンダリング)
updateVoteText();