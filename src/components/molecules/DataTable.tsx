'use client'

import { useState } from 'react'

import { DownloadIcon, FileTextIcon, FileSpreadsheetIcon } from 'lucide-react'

import Papa from 'papaparse'
import * as XLSX from 'xlsx'

import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
}

const DataTable = <TData,>({ data, columns }: DataTableProps<TData>) => {

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const [globalFilter, setGlobalFilter] = useState('')

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: 'includesString',
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter
		}
	})

	const exportToCSV = () => {
		const selectedRows = table.getSelectedRowModel().rows

		const dataToExport =
			selectedRows.length > 0
				? selectedRows.map(row => row.original)
				: table.getFilteredRowModel().rows.map(row => row.original)

		const csv = Papa.unparse(dataToExport, {
			header: true
		})

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const link = document.createElement('a')
		const url = URL.createObjectURL(blob)

		link.setAttribute('href', url)
		link.setAttribute('download', `applications-export-${new Date().toISOString().split('T')[0]}.csv`)
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const exportToExcel = () => {
		const selectedRows = table.getSelectedRowModel().rows

		const dataToExport =
			selectedRows.length > 0
				? selectedRows.map(row => row.original)
				: table.getFilteredRowModel().rows.map(row => row.original)

		const worksheet = XLSX.utils.json_to_sheet(dataToExport)
		const workbook = XLSX.utils.book_new()

		XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications')

		const cols = [{ wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 }]

		worksheet['!cols'] = cols

		XLSX.writeFile(workbook, `applications-export-${new Date().toISOString().split('T')[0]}.xlsx`)
	}

	const exportToJSON = () => {
		const selectedRows = table.getSelectedRowModel().rows

		const dataToExport =
			selectedRows.length > 0
				? selectedRows.map(row => row.original)
				: table.getFilteredRowModel().rows.map(row => row.original)

		const json = JSON.stringify(dataToExport, null, 2)
		const blob = new Blob([json], { type: 'application/json' })
		const link = document.createElement('a')
		const url = URL.createObjectURL(blob)

		link.setAttribute('href', url)
		link.setAttribute('download', `applications-export-${new Date().toISOString().split('T')[0]}.json`)
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className='w-full'>
			<div className='flex justify-between gap-2 pb-4 max-sm:flex-col sm:items-center'>
				<div className='flex items-center space-x-2'>
					<Input
						placeholder='Buscar...'
						value={globalFilter ?? ''}
						onChange={event => setGlobalFilter(String(event.target.value))}
						className='max-w-sm'
					/>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='text-muted-foreground text-sm'>
						{table.getSelectedRowModel().rows.length > 0 && (
							<span className='mr-2'>
								{table.getSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
							</span>
						)}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm'>
								<DownloadIcon className='mr-2' />
								Exportar
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={exportToCSV}>
								<FileTextIcon className='mr-2 size-4' />
								Export as CSV
							</DropdownMenuItem>
							<DropdownMenuItem onClick={exportToExcel}>
								<FileSpreadsheetIcon className='mr-2 size-4' />
								Export as Excel
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={exportToJSON}>
								<FileTextIcon className='mr-2 size-4' />
								Export as JSON
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id} className="text-center">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

		</div>
	)
}

export default DataTable
