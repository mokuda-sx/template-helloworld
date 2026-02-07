export interface LyricLine {
    text: string;
    startFrame: number;
    endFrame: number;
    style: 'standard' | 'glitch' | 'giant' | 'slide' | 'threeD';
}

export const LYRICS_DATA: LyricLine[] = [
    // Verse 1
    { text: "朝から響く", startFrame: 450, endFrame: 540, style: 'standard' },
    { text: "身勝手な宣戦布告", startFrame: 540, endFrame: 660, style: 'glitch' },
    { text: "「ワシがルールだ」", startFrame: 660, endFrame: 750, style: 'giant' },
    { text: "血まみれの嘘に飛び乗る", startFrame: 750, endFrame: 870, style: 'slide' },
    { text: "野菜を投げ捨て", startFrame: 870, endFrame: 930, style: 'standard' },
    { text: "風呂を拒んで", startFrame: 930, endFrame: 990, style: 'standard' },
    { text: "胸を張れ", startFrame: 990, endFrame: 1050, style: 'giant' },
    { text: "またも騙された", startFrame: 1050, endFrame: 1110, style: 'slide' },
    { text: "ノーベル賞への片道切符", startFrame: 1110, endFrame: 1140, style: 'glitch' },

    // Pre-Chorus
    { text: "ブレーキなんて", startFrame: 1140, endFrame: 1230, style: 'standard' },
    { text: "最初から壊れてたんだ", startFrame: 1230, endFrame: 1350, style: 'slide' },
    { text: "赤色の角が", startFrame: 1350, endFrame: 1440, style: 'glitch' },
    { text: "理性を突き刺して笑う", startFrame: 1440, endFrame: 1530, style: 'giant' },
    { text: "加速する視界　もう戻れない", startFrame: 1530, endFrame: 1620, style: 'threeD' },

    // Chorus
    { text: "振り回してくれ", startFrame: 1620, endFrame: 1710, style: 'giant' },
    { text: "スカーレット・ドライブの渦の中で", startFrame: 1710, endFrame: 1860, style: 'threeD' },
    { text: "理屈も倫理も", startFrame: 1860, endFrame: 1950, style: 'slide' },
    { text: "泥だらけのまま吹き飛ばして", startFrame: 1950, endFrame: 2100, style: 'glitch' },
    { text: "最悪のバディ", startFrame: 2100, endFrame: 2190, style: 'giant' },
    { text: "地獄の底まで連れていけ", startFrame: 2190, endFrame: 2340, style: 'threeD' },
    { text: "君のその嘘が", startFrame: 2340, endFrame: 2430, style: 'slide' },
    { text: "唯一の真実だった", startFrame: 2430, endFrame: 2550, style: 'standard' },

    // Verse 2
    { text: "猫一匹に", startFrame: 2550, endFrame: 2640, style: 'standard' },
    { text: "命を懸けて震えてる", startFrame: 2640, endFrame: 2760, style: 'glitch' },
    { text: "Nya-ko!", startFrame: 2760, endFrame: 2850, style: 'giant' },
    { text: "情けない背中", startFrame: 2850, endFrame: 2940, style: 'standard' },
    { text: "不器用に指でなぞった", startFrame: 2940, endFrame: 3060, style: 'slide' },
    { text: "「恩に着るぞ」なんて", startFrame: 3060, endFrame: 3150, style: 'giant' },
    { text: "似合わない言葉はやめろ", startFrame: 3150, endFrame: 3240, style: 'standard' },
    { text: "どうせ明日には　また俺を売るんだろう？", startFrame: 3240, endFrame: 3300, style: 'glitch' },

    // Bridge
    { text: "ゴミ溜めの世界で", startFrame: 4200, endFrame: 4320, style: 'standard' },
    { text: "見つけた欠片", startFrame: 4320, endFrame: 4440, style: 'slide' },
    { text: "恋じゃないけど", startFrame: 4440, endFrame: 4530, style: 'threeD' },
    { text: "愛より少し重いんだ", startFrame: 4530, endFrame: 4650, style: 'glitch' },

    // Final Chorus
    { text: "突き抜けてくれ", startFrame: 4650, endFrame: 4740, style: 'giant' },
    { text: "スカーレット・ドライブのその先へ", startFrame: 4740, endFrame: 4890, style: 'threeD' },
    { text: "血の赤に染まる", startFrame: 4890, endFrame: 4980, style: 'slide' },
    { text: "ジェットコースターの終着点", startFrame: 4980, endFrame: 5130, style: 'glitch' },
    { text: "最悪のバディ", startFrame: 5130, endFrame: 5220, style: 'giant' },
    { text: "永遠に鳴り止まない", startFrame: 5220, endFrame: 5370, style: 'threeD' },
    { text: "君の笑い声が", startFrame: 5370, endFrame: 5460, style: 'slide' },
    { text: "頭から離れない", startFrame: 5460, endFrame: 5550, style: 'standard' },
];
