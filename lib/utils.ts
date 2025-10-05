import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const times = [
//   { id: '10_to_12', label: '10h à midi' },
//   { id: '12_to_14', label: '12h à 14h' },
//   { id: '14_to_16', label: '14h à 16h' },
//   { id: '16_to_18', label: '16h à 18h' },
//   { id: '18_to_20', label: '18h à 20h' },
//   { id: '20_to_22', label: '20h à 22h' }
// ]

export const formatDate = (stringFromDb:string) => {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(new Date(stringFromDb))
}