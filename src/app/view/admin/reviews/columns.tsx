import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { CreateApplicationInput } from "@/modules/application/domain/types/application.types";
import { Application } from "@/modules/application/domain/types/application.types";

export type Payment = {
  id: string
  name: string
  amount: number
  status: 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Application>[] = [

  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <div className='font-medium'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'ocupation',
    header: 'Ocupación',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'ingresos',
    header: () => <div className='text-right'>Ingresos</div>,
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue('ingresos'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(monto)

      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
  {
    accessorKey: 'egresos',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue('egresos'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(monto)

      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
  {
    accessorKey: 'monto',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(monto)

      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
    {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string

      const styles = {
        success:
          'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
        failed:
          'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
        processing:
          'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5'
      }[status]

      return <Badge className={(cn('border-none focus-visible:outline-none'), styles)}>{row.getValue('status')}</Badge>
    }
  },
]