//main.js
//import　＝　呼び出し
//分割代入 (greet=関数の定義、schoolName=変数(文字列))
import { greet, schoolName } from "./message.js";

//関数の実行　（関数名＋（））;
console.log(greet("田中"));
console.log(schoolName);
//こんにちは、田中さん
//トライデント

//htmlにmapと（関数の定義）＝関数名を使って挿入
const target = document.querySelector("#workList");
target.innerHTML = works.map(createWorkItem).join("");