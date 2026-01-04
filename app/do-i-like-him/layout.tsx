import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "测测你到底有多喜欢他？ | Do I Like Him Quiz",
    description: "你对他的感情到底只是一时的小火花，还是持久绚烂的烟火？回答15个问题，揭晓你对他的真实感情。",
    keywords: ["喜欢他", "恋爱测试", "爱情测试", "心理测试", "暗恋测试"],
};

export default function DoILikeHimLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
