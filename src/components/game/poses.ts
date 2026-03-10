// Pose data layer for ForceField AI Movement Game
// Uses MediaPipe Pose landmarks (33 points, normalized 0-1)

export interface AngleSet {
    leftShoulder?: number;  // angle at shoulder: hip→shoulder→elbow
    rightShoulder?: number;
    leftElbow?: number;     // angle at elbow: shoulder→elbow→wrist
    rightElbow?: number;
    leftHip?: number;       // angle at hip: shoulder→hip→knee
    rightHip?: number;
    leftKnee?: number;      // angle at knee: hip→knee→ankle
    rightKnee?: number;
}

// Normalized target positions for the ghost skeleton [x, y]
// Based on a 480×640 canvas scope (x: 0=left, y: 0=top — normalized)
export interface SkeletonPositions {
    nose: [number, number];
    leftShoulder: [number, number]; rightShoulder: [number, number];
    leftElbow: [number, number]; rightElbow: [number, number];
    leftWrist: [number, number]; rightWrist: [number, number];
    leftHip: [number, number]; rightHip: [number, number];
    leftKnee: [number, number]; rightKnee: [number, number];
    leftAnkle: [number, number]; rightAnkle: [number, number];
}

export interface PoseDefinition {
    id: string;
    name: string;
    emoji: string;
    cue: string;
    difficulty: 1 | 2 | 3;
    holdTime: number;        // seconds of green time required
    angles: AngleSet;
    tolerance: number;       // degrees of allowed deviation
    skeleton: SkeletonPositions;
}

// ─── Base (Standing Tall) positions ─────────────────────────────────────────
const BASE: SkeletonPositions = {
    nose: [0.500, 0.088],
    leftShoulder: [0.340, 0.265], rightShoulder: [0.660, 0.265],
    leftElbow: [0.270, 0.420], rightElbow: [0.730, 0.420],
    leftWrist: [0.225, 0.565], rightWrist: [0.775, 0.565],
    leftHip: [0.375, 0.560], rightHip: [0.625, 0.560],
    leftKnee: [0.355, 0.735], rightKnee: [0.645, 0.735],
    leftAnkle: [0.345, 0.910], rightAnkle: [0.655, 0.910],
};

const s = (overrides: Partial<SkeletonPositions>): SkeletonPositions =>
    ({ ...BASE, ...overrides });

// ─── 25 Pose Definitions ────────────────────────────────────────────────────
export const POSES: PoseDefinition[] = [
    // ── EASY (difficulty 1) ─────────────────────────────────────────────────
    {
        id: "standing_tall", name: "Standing Tall", emoji: "🧍", difficulty: 1,
        cue: "Stand straight, shoulders back, arms relaxed at sides",
        holdTime: 4, tolerance: 25,
        angles: { leftShoulder: 15, rightShoulder: 15, leftElbow: 170, rightElbow: 170, leftKnee: 172, rightKnee: 172, leftHip: 172, rightHip: 172 },
        skeleton: s({}),
    },
    {
        id: "t_pose", name: "T-Pose", emoji: "✈️", difficulty: 1,
        cue: "Spread arms straight out to the sides at shoulder height",
        holdTime: 5, tolerance: 22,
        angles: { leftShoulder: 90, rightShoulder: 90, leftElbow: 172, rightElbow: 172, leftKnee: 172, rightKnee: 172 },
        skeleton: s({ leftElbow: [0.170, 0.265], rightElbow: [0.830, 0.265], leftWrist: [0.050, 0.268], rightWrist: [0.950, 0.268] }),
    },
    {
        id: "star", name: "Star", emoji: "⭐", difficulty: 1,
        cue: "Jump stance — arms and legs wide open",
        holdTime: 5, tolerance: 22,
        angles: { leftShoulder: 90, rightShoulder: 90, leftElbow: 172, rightElbow: 172, leftKnee: 162, rightKnee: 162 },
        skeleton: s({ leftElbow: [0.170, 0.265], rightElbow: [0.830, 0.265], leftWrist: [0.050, 0.268], rightWrist: [0.950, 0.268], leftHip: [0.340, 0.555], rightHip: [0.660, 0.555], leftKnee: [0.240, 0.740], rightKnee: [0.760, 0.740], leftAnkle: [0.185, 0.915], rightAnkle: [0.815, 0.915] }),
    },
    {
        id: "arms_up", name: "Both Arms Up", emoji: "🙌", difficulty: 1,
        cue: "Raise both arms straight overhead — reach for the sky!",
        holdTime: 5, tolerance: 22,
        angles: { leftShoulder: 165, rightShoulder: 165, leftElbow: 170, rightElbow: 170, leftKnee: 172, rightKnee: 172 },
        skeleton: s({ leftElbow: [0.290, 0.135], rightElbow: [0.710, 0.135], leftWrist: [0.270, 0.030], rightWrist: [0.730, 0.030] }),
    },
    {
        id: "hands_on_hips", name: "Hands on Hips", emoji: "💪", difficulty: 1,
        cue: "Place both hands firmly on your hips, elbows out",
        holdTime: 4, tolerance: 25,
        angles: { leftShoulder: 35, rightShoulder: 35, leftElbow: 85, rightElbow: 85, leftKnee: 172, rightKnee: 172 },
        skeleton: s({ leftElbow: [0.240, 0.420], rightElbow: [0.760, 0.420], leftWrist: [0.375, 0.560], rightWrist: [0.625, 0.560] }),
    },
    {
        id: "left_wave", name: "Left Wave", emoji: "👋", difficulty: 1,
        cue: "Raise your LEFT arm high — wave to the crowd!",
        holdTime: 4, tolerance: 25,
        angles: { leftShoulder: 165, rightShoulder: 15, leftElbow: 168, rightElbow: 170 },
        skeleton: s({ leftElbow: [0.285, 0.140], leftWrist: [0.265, 0.040] }),
    },
    {
        id: "right_wave", name: "Right Wave", emoji: "👋", difficulty: 1,
        cue: "Raise your RIGHT arm high — now the other side!",
        holdTime: 4, tolerance: 25,
        angles: { leftShoulder: 15, rightShoulder: 165, leftElbow: 170, rightElbow: 168 },
        skeleton: s({ rightElbow: [0.715, 0.140], rightWrist: [0.735, 0.040] }),
    },
    {
        id: "wide_stance", name: "Wide Stance", emoji: "🏉", difficulty: 1,
        cue: "Feet wide apart — rugby ready position, arms at sides",
        holdTime: 5, tolerance: 25,
        angles: { leftShoulder: 15, rightShoulder: 15, leftKnee: 158, rightKnee: 158 },
        skeleton: s({ leftHip: [0.340, 0.555], rightHip: [0.660, 0.555], leftKnee: [0.240, 0.740], rightKnee: [0.760, 0.740], leftAnkle: [0.185, 0.915], rightAnkle: [0.815, 0.915] }),
    },
    // ── MEDIUM (difficulty 2) ────────────────────────────────────────────────
    {
        id: "left_guard", name: "Left Guard", emoji: "🛡️", difficulty: 2,
        cue: "Left arm up in guard — elbow bent, fist facing you",
        holdTime: 5, tolerance: 20,
        angles: { leftShoulder: 75, rightShoulder: 15, leftElbow: 90, rightElbow: 170 },
        skeleton: s({ leftElbow: [0.290, 0.310], leftWrist: [0.340, 0.215] }),
    },
    {
        id: "right_guard", name: "Right Guard", emoji: "🛡️", difficulty: 2,
        cue: "Right arm up in guard — elbow bent, fist facing you",
        holdTime: 5, tolerance: 20,
        angles: { leftShoulder: 15, rightShoulder: 75, leftElbow: 170, rightElbow: 90 },
        skeleton: s({ rightElbow: [0.710, 0.310], rightWrist: [0.660, 0.215] }),
    },
    {
        id: "double_guard", name: "Double Guard", emoji: "🥊", difficulty: 2,
        cue: "Both elbows up — contact sport defensive position!",
        holdTime: 6, tolerance: 20,
        angles: { leftShoulder: 70, rightShoulder: 70, leftElbow: 90, rightElbow: 90 },
        skeleton: s({ leftElbow: [0.300, 0.315], rightElbow: [0.700, 0.315], leftWrist: [0.350, 0.220], rightWrist: [0.650, 0.220] }),
    },
    {
        id: "chair", name: "Chair Pose", emoji: "🪑", difficulty: 2,
        cue: "Squat like you're sitting on an invisible chair — hold!",
        holdTime: 6, tolerance: 20,
        angles: { leftKnee: 100, rightKnee: 100, leftHip: 95, rightHip: 95, leftShoulder: 20, rightShoulder: 20 },
        skeleton: s({ leftHip: [0.350, 0.495], rightHip: [0.650, 0.495], leftKnee: [0.335, 0.675], rightKnee: [0.665, 0.675], leftAnkle: [0.330, 0.865], rightAnkle: [0.670, 0.865], leftShoulder: [0.320, 0.255], rightShoulder: [0.680, 0.255] }),
    },
    {
        id: "y_shape", name: "Y Shape", emoji: "🤸", difficulty: 2,
        cue: "Arms at 45° above horizontal — make a Y with your body!",
        holdTime: 5, tolerance: 22,
        angles: { leftShoulder: 130, rightShoulder: 130, leftElbow: 170, rightElbow: 170 },
        skeleton: s({ leftElbow: [0.215, 0.200], rightElbow: [0.785, 0.200], leftWrist: [0.140, 0.100], rightWrist: [0.860, 0.100] }),
    },
    {
        id: "warrior_left", name: "Warrior Left", emoji: "⚔️", difficulty: 2,
        cue: "Lunge forward on your LEFT foot — arms spread wide",
        holdTime: 6, tolerance: 20,
        angles: { leftKnee: 90, rightKnee: 155, leftShoulder: 90, rightShoulder: 90, leftHip: 82 },
        skeleton: s({ leftKnee: [0.295, 0.685], leftAnkle: [0.265, 0.875], rightKnee: [0.680, 0.760], rightAnkle: [0.720, 0.930], leftElbow: [0.155, 0.265], rightElbow: [0.845, 0.265], leftWrist: [0.050, 0.268], rightWrist: [0.950, 0.268], leftHip: [0.375, 0.530], rightHip: [0.625, 0.530] }),
    },
    {
        id: "warrior_right", name: "Warrior Right", emoji: "⚔️", difficulty: 2,
        cue: "Lunge forward on your RIGHT foot — arms spread wide",
        holdTime: 6, tolerance: 20,
        angles: { leftKnee: 155, rightKnee: 90, leftShoulder: 90, rightShoulder: 90, rightHip: 82 },
        skeleton: s({ rightKnee: [0.705, 0.685], rightAnkle: [0.735, 0.875], leftKnee: [0.320, 0.760], leftAnkle: [0.280, 0.930], leftElbow: [0.155, 0.265], rightElbow: [0.845, 0.265], leftWrist: [0.050, 0.268], rightWrist: [0.950, 0.268], leftHip: [0.375, 0.530], rightHip: [0.625, 0.530] }),
    },
    {
        id: "left_knee_up", name: "Left Knee Up", emoji: "🦵", difficulty: 2,
        cue: "Balance on your right leg — raise LEFT knee to hip height",
        holdTime: 5, tolerance: 22,
        angles: { leftKnee: 85, leftHip: 85, rightKnee: 170 },
        skeleton: s({ leftKnee: [0.385, 0.455], leftAnkle: [0.365, 0.565] }),
    },
    {
        id: "right_knee_up", name: "Right Knee Up", emoji: "🦵", difficulty: 2,
        cue: "Balance on your left leg — raise RIGHT knee to hip height",
        holdTime: 5, tolerance: 22,
        angles: { rightKnee: 85, rightHip: 85, leftKnee: 170 },
        skeleton: s({ rightKnee: [0.615, 0.455], rightAnkle: [0.635, 0.565] }),
    },
    {
        id: "bow", name: "Forward Bow", emoji: "🙇", difficulty: 2,
        cue: "Hinge forward at the hips — hands reach toward knees",
        holdTime: 5, tolerance: 22,
        angles: { leftHip: 85, rightHip: 85, leftKnee: 170, rightKnee: 170, leftShoulder: 30, rightShoulder: 30 },
        skeleton: s({ nose: [0.500, 0.370], leftShoulder: [0.345, 0.430], rightShoulder: [0.655, 0.430], leftElbow: [0.295, 0.530], rightElbow: [0.705, 0.530], leftWrist: [0.330, 0.625], rightWrist: [0.670, 0.625] }),
    },
    // ── HARD (difficulty 3) ──────────────────────────────────────────────────
    {
        id: "diamond", name: "Diamond Overhead", emoji: "💎", difficulty: 3,
        cue: "Arms overhead — fingertips touching in a diamond shape",
        holdTime: 6, tolerance: 18,
        angles: { leftShoulder: 160, rightShoulder: 160, leftElbow: 95, rightElbow: 95 },
        skeleton: s({ leftElbow: [0.390, 0.095], rightElbow: [0.610, 0.095], leftWrist: [0.480, 0.030], rightWrist: [0.520, 0.030] }),
    },
    {
        id: "power_squat", name: "Power Squat", emoji: "🏋️", difficulty: 3,
        cue: "Deep squat, then drive arms overhead — feel the power!",
        holdTime: 6, tolerance: 18,
        angles: { leftKnee: 88, rightKnee: 88, leftHip: 88, rightHip: 88, leftShoulder: 160, rightShoulder: 160 },
        skeleton: s({ leftHip: [0.345, 0.510], rightHip: [0.655, 0.510], leftKnee: [0.325, 0.680], rightKnee: [0.675, 0.680], leftAnkle: [0.320, 0.860], rightAnkle: [0.680, 0.860], leftElbow: [0.290, 0.130], rightElbow: [0.710, 0.130], leftWrist: [0.270, 0.030], rightWrist: [0.730, 0.030], leftShoulder: [0.325, 0.245], rightShoulder: [0.675, 0.245] }),
    },
    {
        id: "lunge_left", name: "Low Lunge Left", emoji: "🧘", difficulty: 3,
        cue: "Step LEFT foot forward into a deep lunge — arms at sides",
        holdTime: 7, tolerance: 18,
        angles: { leftKnee: 90, rightKnee: 148, leftHip: 80, leftShoulder: 15, rightShoulder: 15 },
        skeleton: s({ leftKnee: [0.285, 0.690], leftAnkle: [0.255, 0.880], rightKnee: [0.685, 0.775], rightAnkle: [0.730, 0.940], leftHip: [0.370, 0.530], rightHip: [0.630, 0.530] }),
    },
    {
        id: "lunge_right", name: "Low Lunge Right", emoji: "🧘", difficulty: 3,
        cue: "Step RIGHT foot forward into a deep lunge — arms at sides",
        holdTime: 7, tolerance: 18,
        angles: { rightKnee: 90, leftKnee: 148, rightHip: 80, leftShoulder: 15, rightShoulder: 15 },
        skeleton: s({ rightKnee: [0.715, 0.690], rightAnkle: [0.745, 0.880], leftKnee: [0.315, 0.775], leftAnkle: [0.270, 0.940], leftHip: [0.370, 0.530], rightHip: [0.630, 0.530] }),
    },
    {
        id: "tree_left", name: "Tree Left", emoji: "🌲", difficulty: 3,
        cue: "Balance on RIGHT leg — LEFT foot to inner calf, arms up",
        holdTime: 7, tolerance: 20,
        angles: { rightKnee: 172, leftKnee: 60, leftHip: 55, leftShoulder: 160, rightShoulder: 160 },
        skeleton: s({ leftKnee: [0.450, 0.650], leftAnkle: [0.390, 0.735], leftElbow: [0.295, 0.140], rightElbow: [0.705, 0.140], leftWrist: [0.280, 0.040], rightWrist: [0.720, 0.040] }),
    },
    {
        id: "tree_right", name: "Tree Right", emoji: "🌲", difficulty: 3,
        cue: "Balance on LEFT leg — RIGHT foot to inner calf, arms up",
        holdTime: 7, tolerance: 20,
        angles: { leftKnee: 172, rightKnee: 60, rightHip: 55, leftShoulder: 160, rightShoulder: 160 },
        skeleton: s({ rightKnee: [0.550, 0.650], rightAnkle: [0.610, 0.735], leftElbow: [0.295, 0.140], rightElbow: [0.705, 0.140], leftWrist: [0.280, 0.040], rightWrist: [0.720, 0.040] }),
    },
    {
        id: "airplane_left", name: "Airplane Left", emoji: "🛩️", difficulty: 3,
        cue: "Balance on LEFT leg, lean forward, arms wide like wings!",
        holdTime: 7, tolerance: 20,
        angles: { leftKnee: 162, rightKnee: 170, leftHip: 85, leftShoulder: 90, rightShoulder: 90 },
        skeleton: s({ nose: [0.500, 0.285], leftShoulder: [0.345, 0.360], rightShoulder: [0.655, 0.360], leftElbow: [0.155, 0.365], rightElbow: [0.845, 0.365], leftWrist: [0.040, 0.370], rightWrist: [0.960, 0.370], leftHip: [0.375, 0.510], rightHip: [0.625, 0.510], rightKnee: [0.620, 0.370], rightAnkle: [0.625, 0.230] }),
    },
];

// ─── Skeleton connections (MediaPipe landmark indices) ──────────────────────
export const SKELETON_CONNECTIONS: [number, number][] = [
    [11, 12], [11, 23], [12, 24], [23, 24],
    [11, 13], [13, 15],
    [12, 14], [14, 16],
    [23, 25], [25, 27], [27, 31],
    [24, 26], [26, 28], [28, 32],
    [0, 11], [0, 12],
];

// ─── Joint key → landmark index map ─────────────────────────────────────────
const IDX = { leftShoulder: 11, rightShoulder: 12, leftElbow: 13, rightElbow: 14, leftHip: 23, rightHip: 24, leftKnee: 25, rightKnee: 26, leftAnkle: 27, rightAnkle: 28, leftWrist: 15, rightWrist: 16 };

function computeAngle(
    A: { x: number; y: number },
    B: { x: number; y: number },
    C: { x: number; y: number }
): number {
    const BAx = A.x - B.x, BAy = A.y - B.y;
    const BCx = C.x - B.x, BCy = C.y - B.y;
    const dot = BAx * BCx + BAy * BCy;
    const mag = Math.sqrt(BAx ** 2 + BAy ** 2) * Math.sqrt(BCx ** 2 + BCy ** 2);
    if (mag === 0) return 0;
    return Math.acos(Math.min(1, Math.max(-1, dot / mag))) * (180 / Math.PI);
}

export function extractAngles(lm: Array<{ x: number; y: number; z: number; visibility?: number }>): AngleSet {
    if (!lm || lm.length < 33) return {};
    const g = (i: number) => lm[i];
    return {
        leftShoulder: computeAngle(g(23), g(11), g(13)),
        rightShoulder: computeAngle(g(24), g(12), g(14)),
        leftElbow: computeAngle(g(11), g(13), g(15)),
        rightElbow: computeAngle(g(12), g(14), g(16)),
        leftHip: computeAngle(g(11), g(23), g(25)),
        rightHip: computeAngle(g(12), g(24), g(26)),
        leftKnee: computeAngle(g(23), g(25), g(27)),
        rightKnee: computeAngle(g(24), g(26), g(28)),
    };
}

export function computePoseAccuracy(live: AngleSet, pose: PoseDefinition): number {
    const { angles, tolerance } = pose;
    const keys = Object.keys(angles) as (keyof AngleSet)[];
    if (keys.length === 0) return 0;
    let total = 0, count = 0;
    for (const k of keys) {
        const target = angles[k], measured = live[k];
        if (target === undefined || measured === undefined) continue;
        const diff = Math.abs(measured - target);
        total += Math.max(0, 1 - diff / tolerance);
        count++;
    }
    return count > 0 ? total / count : 0;
}
