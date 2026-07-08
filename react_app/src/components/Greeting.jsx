// src/components/Greeting.jsx
//exportしている、関数宣言(大文字なのでコンポーネントで使う)引数持ち
//コンポーネントの引数をpropという。{}で囲みます。※ルール
export default function Greeting({ name }) {
    return <p>こんにちは、{name}さん！</p>;
}
