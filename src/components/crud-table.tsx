'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export interface Column<T> {
  key: keyof T
  label: string
}

interface CrudTableProps<T> {
  data: T[];
  columns: Column<T>[];
  // columns: {
  //   key: keyof T;
  //   label: string
  // }[];
  onAdd: (item: Partial<T>) => Promise<void>;
  onEdit: (id: string, item: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CrudTable<T extends { id: string }>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState<Partial<T>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      await onEdit(editingItem.id, formData)
      setIsEditOpen(false)
    } else {
      await onAdd(formData)
      setIsAddOpen(false)
    }
    setFormData({})
    setEditingItem(null)
  }

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600">Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {columns.map((column) => (
                <div key={String(column.key)}>
                  <Input
                    placeholder={column.label}
                    value={String(formData[column.key] ?? '')}
                    //value={formData[column.key] as string || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [column.key]: e.target.value })
                    }
                  />
                </div>
              ))}
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {String(item[column.key])}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(item)
                    setFormData(item)
                    setIsEditOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {columns.map((column) => (
              <div key={String(column.key)}>
                <Input
                  placeholder={column.label}
                  value={String(formData[column.key] ?? '')}
                  //value={typeof formData[column.key] === 'string' ? formData[column.key] : ''} 
                  //value={formData[column.key] as string || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, [column.key]: e.target.value })
                  }
                />
              </div>
            ))}
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

