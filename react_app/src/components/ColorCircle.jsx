//書き出される(大文字なので)コンポーネント　引数持ち(props)
export default function ColorCircle({ color }) {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: color,
            }}
        />
    );
}
