import { type projects } from "@/server/db/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ProjectCardProps {
  project: typeof projects.$inferSelect;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/${project.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold truncate">{project.name}</h3>
            {project.logoUrl && (
              <img
                src={project.logoUrl}
                alt={`${project.name} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {formatDistanceToNow(project.createdAt, { addSuffix: true })}
                </span>
              </div>
              {project.url && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="truncate max-w-[150px]">{project.url}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
