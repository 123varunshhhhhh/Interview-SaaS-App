"use client";

import Link from "next/link";
import { InterviewTemplate } from "@/constants/interview-templates";
import { Button } from "@/components/ui/button";

interface InterviewTemplateCardProps {
  template: InterviewTemplate;
  userId: string;
}

export default function InterviewTemplateCard({
  template,
  userId,
}: InterviewTemplateCardProps) {
  return (
    <div className="card-interview group hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`${template.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0`}
        >
          {template.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-lg">{template.role}</h3>
              <p className="text-sm text-gray-600">{template.level} Level</p>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full whitespace-nowrap">
              {template.type}
            </span>
          </div>

          <p className="text-sm text-gray-700 mb-3">{template.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-3">
            {template.techstack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
              >
                {tech}
              </span>
            ))}
            {template.techstack.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded">
                +{template.techstack.length - 4} more
              </span>
            )}
          </div>

          {/* Questions Count */}
          <p className="text-xs text-gray-500 mb-3">
            {template.questions.length} questions prepared
          </p>

          {/* Action Button */}
          <Button asChild className="btn-primary w-full">
            <Link href={`/interview/template/${template.id}?userId=${userId}`}>
              Start Interview →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
