interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
