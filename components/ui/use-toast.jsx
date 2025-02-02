// Cambiamos la importación para evitar el conflicto de nombres
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"

// Re-exportamos todo excepto useToast del componente toast
export { Toast, ToastProvider, ToastViewport }

// Creamos y exportamos nuestro propio hook useToast
export function useToast() {
  return {
    toast: ({ title, description, variant }) => {
      // Implementación básica del toast
      console.log("Toast:", { title, description, variant })
    },
  }
}

// Ahora podemos importar y usar nuestro hook en cualquier parte de la aplicación