import { redirect } from "next/navigation";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getTemplateById } from "@/constants/interview-templates";

interface TemplateInterviewPageProps {
  params: {
    templateId: string;
  };
  searchParams: {
    userId?: string;
  };
}

export default async function TemplateInterviewPage({
  params,
  searchParams,
}: TemplateInterviewPageProps) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  // Get the template
  const template = getTemplateById(params.templateId);

  if (!template) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Interview Header */}
      <div className="card-interview">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`${template.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
          >
            {template.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{template.role} Interview</h1>
            <p className="text-gray-600">
              {template.level} Level • {template.type}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 mb-3">{template.description}</p>
          <div className="flex flex-wrap gap-2">
            {template.techstack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-900 font-medium mb-2">
            📋 Interview Format:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {template.questions.length} prepared questions</li>
            <li>• AI interviewer will ask follow-up questions</li>
            <li>• Speak naturally and take your time</li>
            <li>• You'll receive feedback at the end</li>
          </ul>
        </div>
      </div>

      {/* Agent Component */}
      <Agent
        userName={user.name || "User"}
        userId={user.id}
        interviewId={undefined}
        feedbackId={undefined}
        type="interview"
        questions={template.questions}
        templateId={params.templateId}
      />
    </div>
  );
}
