import { toast } from "sonner"
import { CheckCircle, AlertCircle } from "lucide-react"
import type { ToastOptions } from "@/types"
import { TOAST_DURATIONS } from "@/constants"

const activeToasts = new Set<string>()

export class ToastService {
  static success(message: string, options?: ToastOptions) {
    const toastKey = `success-${message}`

    if (activeToasts.has(toastKey)) {
      return
    }

    activeToasts.add(toastKey)

    const toastId = toast.success(message, {
      description: options?.description,
      duration: options?.duration || TOAST_DURATIONS.SHORT,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      style: {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        color: "#14532d",
        ...options?.style,
      },
      className: options?.className,
      onDismiss: () => {
        activeToasts.delete(toastKey)
      },
      onAutoClose: () => {
        activeToasts.delete(toastKey)
      },
    })

    return toastId
  }

  static error(message: string, options?: ToastOptions) {
    const toastKey = `error-${message}`
    if (activeToasts.has(toastKey)) {
      return
    }
    activeToasts.add(toastKey)
    const toastId = toast.error(message, {
      description: options?.description,
      duration: options?.duration || TOAST_DURATIONS.MEDIUM,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      style: {
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
        color: "#7f1d1d",
        ...options?.style,
      },
      className: options?.className,
      onDismiss: () => {
        activeToasts.delete(toastKey)
      },
      onAutoClose: () => {
        activeToasts.delete(toastKey)
      },
    })

    return toastId
  }

  static dismiss(toastId?: string | number) {
    if (toastId) {
      toast.dismiss(toastId)
    } else {
      toast.dismiss()
      activeToasts.clear()
    }
  }

  static dismissAll() {
    toast.dismiss()
    activeToasts.clear()
  }
}

export const useToast = () => {
  return {
    success: ToastService.success,
    error: ToastService.error,
    dismiss: ToastService.dismiss,
    dismissAll: ToastService.dismissAll,
  }
}
