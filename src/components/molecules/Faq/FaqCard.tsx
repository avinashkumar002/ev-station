"use client";

import ChevronDown from "@/assets/svgs/ChevronDown";
import Typography from "@/components/Typography/Typograpghy";

interface FaqCardProps {
    question: string;
    answer: string;
    points?: string[];
    isActive: boolean;
    onToggle: () => void;
}

export default function FaqCard({ question, answer, points, isActive, onToggle }: FaqCardProps) {
    return (
        <div
            className={`single-faq flex flex-col transition-all duration-300
                border-[1.2px] py-[18px] px-5 md:p-6 rounded-2xl w-full cursor-pointer
                ${isActive ? "border-[#8EC7FF]" : "border-[#D0D0D0]"}
            `}
            onClick={onToggle}
        >
            {/* Question Row */}
            <div className="question flex justify-between items-center">
                <Typography
                    variant="h4"
                    weight={500}
                    className={`${isActive ? "text-blue-700" : "text-black-700"} leading-6 md:leading-7!`}
                >
                    {question}
                </Typography>

                <div
                    className={`transition-all duration-300 
                        ${isActive ? "rotate-180 text-[#144DE1]" : "rotate-0 text-black-700"} 
                        h-4 md:h-6 w-4 md:w-6 flex items-center 
                    `}
                >
                    <ChevronDown />
                </div>
            </div>

            {/* Answer */}
            <div
                className={`answer overflow-hidden transition-all duration-300 
                    ${isActive ? "mt-3 max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <Typography
                    variant="para"
                    weight={400}
                    className="text-black-500 leading-[22px]! md:leading-[26px]!"
                >
                    {answer}
                </Typography>

                {/* Bullet Points */}
                {points && points.length > 0 && (
                    <ul className="mt-3 list-disc list-inside space-y-1 text-black-500">
                        {points.map((item, idx) => (
                            <li
                                key={idx}
                                className="text-sm md:text-base leading-[22px] md:leading-[26px]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
