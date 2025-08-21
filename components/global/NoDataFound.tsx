import { ReactNode } from "react"
import { FileQuestion, Ghost } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoDataProps {
  icon?: ReactNode
  title?: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const NoDataFound = ({
  icon,
  title = "No Data Found",
  subtitle = "We couldn’t find any records to display here.",
  actionLabel,
  onAction,
  className = "",
}: NoDataProps) => {

  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}
    >
      {/* Icon */}
      <div className="size-32 flex items-center justify-center rounded-full bg-primary mb-4">
        {icon || <Ghost size={50} className="text-secondary dark:text-secondary-foreground" />}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{subtitle}</p>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default NoDataFound
