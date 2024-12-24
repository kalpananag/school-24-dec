'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { CrudTable, Column } from '@/components/crud-table'
import { Teacher } from '@/types/schema'
import DeleteConfirmationModal from '@/components/ui/deleteConfirmationModal'

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error("Supabase URL or anonymous key is not defined.")
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const sampleTeachers: Teacher[] = [
  {
    id: '1',
    first_name: 'Amrita',
    last_name: 'Nag',
    email: 'amnag@example.com',
    department: 'Computer Science'
  },
  {
    id: '2',
    first_name: 'Apoorva',
    last_name: 'Nag',
    email: 'apnag@example.com',
    department: 'Mathematics'
  },
  {
    id: '3',
    first_name: 'Atula',
    last_name: 'Nag',
    email: 'atinag@example.com',
    department: 'History'
  },
]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])  
  const [currentPage, setCurrentPage] = useState<number>(1)  
  const [loading, setLoading] = useState<boolean>(false)  
  const [loadingAction, setLoadingAction] = useState<string>('')  
  const [totalTeachers, setTotalTeachers] = useState<number>(0)  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null)

  const itemsPerPage = 10  

  useEffect(() => {
    loadTeachers()
  }, [currentPage])

  async function loadTeachers() {
    setLoading(true)
    setLoadingAction('loading')
    try {
      const { data, error } = await supabase
        .rpc('load_teachers', { page_number: currentPage, items_per_page: itemsPerPage })
      if (error) throw error
      if (data) {
        setTeachers(data)
        setTotalTeachers(data.length)  
      }
    } catch (error) {
      console.error('Error loading teachers:', error)
      setTeachers(sampleTeachers)
      setTotalTeachers(sampleTeachers.length)  
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  const columns: Column<Teacher>[] = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
  ]

  async function handleAdd(teacher: Partial<Teacher>) {
    setLoading(true)
    setLoadingAction('adding')
    try {
      const { error } = await supabase
        .rpc('add_teacher', {
          p_first_name: teacher.first_name,
          p_last_name: teacher.last_name,
          p_email: teacher.email,
          p_department: teacher.department
        })
      if (error) throw error
      loadTeachers()
    } catch (error) {
      console.error('Error adding teacher:', error)
      setTeachers([...teachers, {
        ...teacher,
        id: Date.now().toString(),
      } as Teacher])
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  async function handleEdit(id: string, teacher: Partial<Teacher>) {
    setLoading(true)
    setLoadingAction('editing')
    try {
      const { error } = await supabase
        .rpc('edit_teacher', {
          p_id: id,
          p_first_name: teacher.first_name,
          p_last_name: teacher.last_name,
          p_email: teacher.email,
          p_department: teacher.department
        })
      if (error) throw error
      loadTeachers()
    } catch (error) {
      console.error('Error editing teacher:', error)
      setTeachers(teachers.map(t => t.id === id ? { ...t, ...teacher } : t))
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  async function handleDeleteClick(id: string) {
    setTeacherToDelete(id)
    setShowDeleteConfirm(true)
  }

  async function handleDelete() {
    if (teacherToDelete) {
      setLoading(true)
      setLoadingAction('deleting')
      try {
        const { error } = await supabase
          .rpc('delete_teacher', { p_id: teacherToDelete })
        if (error) throw error
        loadTeachers()
      } catch (error) {
        console.error('Error deleting teacher:', error)
        setTeachers(teachers.filter(t => t.id !== teacherToDelete))
      } finally {
        setLoading(false)
        setLoadingAction('')
        setShowDeleteConfirm(false)
      }
    }
  }

  function renderLoading() {
    if (loading) {
      switch (loadingAction) {
        case 'loading':
          return <p className="text-center text-lg">Loading teachers...</p>
        case 'adding':
          return <p className="text-center text-lg">Adding teacher...</p>
        case 'editing':
          return <p className="text-center text-lg">Editing teacher...</p>
        case 'deleting':
          return <p className="text-center text-lg">Deleting teacher...</p>
        default:
          return null
      }
    }
    return null
  }

  const totalPages = Math.ceil(totalTeachers / itemsPerPage)

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Teachers Management</h1>

        {renderLoading()}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <CrudTable<Teacher>
            data={teachers}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            addTitle="Add New Teacher"
            editTitle="Edit Teacher"
            showAddressAction={true}
            entityType="teacher"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-lg text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        message="You are about to delete this teacher record. This action cannot be undone."
      />
    </div>
  )
}
