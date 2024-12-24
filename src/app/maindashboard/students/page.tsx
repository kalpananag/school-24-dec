'use client'

import { useState, useEffect } from 'react'
import { supabase }  from '@/lib/supabase'
import { CrudTable, Column } from '@/components/crud-table'
import { Student } from '@/types/schema'
import DeleteConfirmationModal from '@/components/ui/deleteConfirmationModal'

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error("Supabase URL or anonymous key is not defined.")
// }

//const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sample student data with the updated interface
const sampleStudents: Student[] = [
  {
    id: '1',
    first_name: 'Rani',
    last_name: 'Verma',
    email: 'rverma@example.com',
    enrollment_date: '2023-08-15',
    class: '7th'
  },
  {
    id: '2',
    first_name: 'Sumit',
    last_name: 'Sharma',
    email: 'ssharma@example.com',
    enrollment_date: '2022-01-10',
    class: '8th'
  },
  {
    id: '3',
    first_name: 'Sunita',
    last_name: 'Singh',
    email: 'ssingh@example.com',
    enrollment_date: '2023-05-25',
    class: '6th'
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingAction, setLoadingAction] = useState<string>('')
  const [totalStudents, setTotalStudents] = useState<number>(0)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)

  const itemsPerPage = 10

  useEffect(() => {
    loadStudents()
  }, [currentPage])

  // Function to load students with pagination
  async function loadStudents() {
    setLoading(true)
    setLoadingAction('loading')
    try {
      const { data, error } = await supabase
        .rpc('load_students', { page_number: currentPage, items_per_page: itemsPerPage })
      if (error) throw error
      if (data) {
        setStudents(data)
        setTotalStudents(data.length)
      }
    } catch (error) {
      console.error('Error loading students:', error)
      setStudents(sampleStudents)
      setTotalStudents(sampleStudents.length)
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  // Define columns for the CrudTable
  const columns: Column<Student>[] = [
    { key: 'first_name', label: 'First Name', required:true},
    { key: 'last_name', label: 'Last Name', required: true  },
    { key: 'email', label: 'Email' },
    { key: 'enrollment_date', label: 'Enrollment Date', required: true  },
    { key: 'class', label: 'Class', required: true }
  ]
  // const columns: Column<YourDataType>[] = [
  //   { key: 'name', label: 'Name', required: true },
  //   { key: 'email', label: 'Email', required: true },
  //   { key: 'age', label: 'Age', defaultValue: 18 },
  //   { key: 'enrollment_date', label: 'Enrollment Date' },
  // ];

  // Handle adding a new student
  function formatDateToPostgres(dateValue: Date) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');  // getMonth() is 0-indexed
    const day = String(dateValue.getDate()).padStart(2, '0');
    const hours = String(dateValue.getHours()).padStart(2, '0');
    const minutes = String(dateValue.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  async function handleAdd(student: Partial<Student>) {
    setLoading(true)
    setLoadingAction('adding')
    if(!student.enrollment_date){
      const now = new Date();
      const formattedDate = now.toISOString().slice(0,16)//formatDateToPostgres(now);
      student.enrollment_date=formattedDate;
      console.log('Student enrollment date:', student.enrollment_date);  
    }
    else{
      //const formattedDate = formatDateToPostgres(student.enrollment_date);
      //student.enrollment_date=formattedDate;
    }
    if(!student.email){
      student.email=' ';
    }
    console.log('Student data to send:', student);
    try {
        const { error } = await supabase
          .rpc('add_student', {
            p_first_name: student.first_name,
            p_last_name: student.last_name,
            p_email: student.email,
            p_enrollment_date: student.enrollment_date,
            p_class: student.class
          })
      if (error) throw error
      loadStudents()
    } catch (error) {
      console.error('Error adding student:', error)
      setStudents([...students, {
        ...student,
        id: Date.now().toString(),
      } as Student])
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  // Handle editing a student
  async function handleEdit(id: string, student: Partial<Student>) {
    setLoading(true)
    setLoadingAction('editing')
    console.log('student.enrollment_date: ',student.enrollment_date)
    try {
      const { error } = await supabase
        .rpc('edit_student', {
          p_id: id,
          p_first_name: student.first_name,
          p_last_name: student.last_name,
          p_email: student.email,
          p_enrollment_date: student.enrollment_date,
          p_class: student.class
        })
      if (error) throw error
      loadStudents()
    } catch (error) {
      console.error('Error editing student:', error)
      setStudents(students.map(s => s.id === id ? { ...s, ...student } : s))
    } finally {
      setLoading(false)
      setLoadingAction('')
    }
  }

  // Handle deleting a student
  async function handleDeleteClick(id: string) {
    setStudentToDelete(id)
    setShowDeleteConfirm(true)
  }

  async function handleDelete() {
    if (studentToDelete) {
      setLoading(true)
      setLoadingAction('deleting')
      try {
        console.log('studentToDelete: ',studentToDelete)
        const { error } = await supabase
          .rpc('delete_student', { p_id: studentToDelete })
        if (error) throw error
        loadStudents()
      } catch (error) {
        console.error('Error deleting student:', error)
        setStudents(students.filter(s => s.id !== studentToDelete))
      } finally {
        setLoading(false)
        setLoadingAction('')
        setShowDeleteConfirm(false)
      }
    }
  }

  // Render loading indicator
  function renderLoading() {
    if (loading) {
      switch (loadingAction) {
        case 'loading':
          return <p className="text-center text-lg">Loading students...</p>
        case 'adding':
          return <p className="text-center text-lg">Adding student...</p>
        case 'editing':
          return <p className="text-center text-lg">Editing student...</p>
        case 'deleting':
          return <p className="text-center text-lg">Deleting student...</p>
        default:
          return null
      }
    }
    return null
  }

  const totalPages = Math.ceil(totalStudents / itemsPerPage)

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Students Management</h1>

        {renderLoading()}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <CrudTable<Student>
            data={students}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            addTitle="Add New Student"
            editTitle="Edit Student"
            showAddressAction={true}
            entityType="student"
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
        message="You are about to delete this student record. This action cannot be undone."
      />
    </div>
  )
}
