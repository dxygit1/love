import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "你的欲望组成图 - 测测你内心的真实欲望比重",
    description: "通过12道趣味情景题，测试你内心深处对不同事物的渴望程度。探索食物、金钱、权力、名望、自由、感情、色性、外貌八大欲望维度，生成专属于你的欲望比重饼图。完全免费，即刻出结果！",
    openGraph: {
        title: "你的欲望组成图 - 测测你内心的真实欲望比重",
        description: "通过12道趣味情景题，测试你内心深处的欲望比重。探索八大欲望维度，生成专属饼图！",
    },
};

export default function DesireTestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
