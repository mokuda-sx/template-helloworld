export interface LyricLine {
    text: string;
    startFrame: number;
    endFrame: number;
    style: 'standard' | 'glitch' | 'giant' | 'slide' | 'threeD';
}

/** 
 * 精密タイミング管理 (LYRICS_DATA):
 * 歌いだし（20秒付近）に合わせ、startFrame を各行ごとに手動で調整可能です。
 * この値が「カメラがその文字を通過する瞬間」になります。
 */
export const LYRICS_DATA: LyricLine[] = [
    // Verse 1 (ボーカル開始 20s 〜 21s に合わせて再設定)
    { text: "朝から響く", startFrame: 660, endFrame: 750, style: 'standard' },
    { text: "身勝手な宣戦布告", startFrame: 750, endFrame: 870, style: 'glitch' },
    { text: "「ワシがルールだ」", startFrame: 870, endFrame: 960, style: 'giant' },
    { text: "血まみれの嘘に飛び乗る", startFrame: 960, endFrame: 1080, style: 'slide' },
    { text: "野菜を投げ捨て", startFrame: 1080, endFrame: 1140, style: 'standard' },
    { text: "風呂を拒んで", startFrame: 1140, endFrame: 1200, style: 'standard' },
    { text: "胸を張れ", startFrame: 1200, endFrame: 1260, style: 'giant' },
    { text: "またも騙された", startFrame: 1260, endFrame: 1320, style: 'slide' },
    { text: "ノーベル賞への片道切符", startFrame: 1320, endFrame: 1350, style: 'glitch' },

    // Pre-Chorus (46秒周辺はこのエリア)
    { text: "ブレーキなんて", startFrame: 1350, endFrame: 1440, style: 'standard' },
    { text: "最初から壊れてたんだ", startFrame: 1440, endFrame: 1560, style: 'slide' },
    { text: "赤色の角が", startFrame: 1560, endFrame: 1650, style: 'glitch' },
    { text: "理性を突き刺して笑う", startFrame: 1650, endFrame: 1740, style: 'giant' },
    { text: "加速する視界　もう戻れない", startFrame: 1740, endFrame: 1830, style: 'threeD' },

    // Chorus
    { text: "振り回してくれ", startFrame: 1830, endFrame: 1920, style: 'giant' },
    { text: "スカーレット・ドライブの渦の中で", startFrame: 1920, endFrame: 2070, style: 'threeD' },
    { text: "理屈も倫理も", startFrame: 2070, endFrame: 2160, style: 'slide' },
    { text: "泥だらけのまま吹き飛ばして", startFrame: 2160, endFrame: 2310, style: 'glitch' },
    // ... 続きも startFrame を直接編集することで追い込み可能です。
];
