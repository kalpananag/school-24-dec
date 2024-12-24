'use client'

import { useState, useEffect } from 'react'
import { Course } from '@/types/schema'
import { CrudTable, Column } from '@/components/crud-table'
//import { createClient } from '@supabase/supabase-js'
import {supabase} from '@/lib/supabase'
// Get the Supabase URL and anon key from environment variables
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// // Initialize the Supabase client
// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error("Supabase URL or anonymous key is not defined.")
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const sampleCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'A foundational course in computer science principles',
    credits: 3,
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    description: 'In-depth study of calculus and linear algebra',
    credits: 4,
    created_at: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'World History',
    description: 'Comprehensive overview of global historical events',
    credits: 3,
    created_at: '2023-01-03T00:00:00Z'
  }
  // Add more sample courses here for testing
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]); // Initialize courses state
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [loading, setLoading] = useState<boolean>(false); // Loading state for operations
  const [loadingAction, setLoadingAction] = useState<string>(''); // Track which action is loading
  const [totalCourses, setTotalCourses] = useState<number>(0); // Total courses for pagination

  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    loadCourses()
  }, [currentPage])

  // Function to load courses
  async function loadCourses() {
    setLoading(true); // Set loading state to true
    setLoadingAction('loading'); // Set the action to "loading"
    try {
      const { data, error, count } = await supabase
        .from('course')
        .select('*', { count: 'exact' }) // Fetch total count for pagination
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1) // Paginate based on current page
      if (error) throw error
      if (data) {
        setCourses(data)
        setTotalCourses(count || 0) // Update total courses count
      }
    } catch (error) {
      console.error('Error loading courses:', error)
      setCourses(sampleCourses) // Fallback to sample data if there's an error
      setTotalCourses(sampleCourses.length) // Use sample data length as the total
    } finally {
      setLoading(false); // Reset loading state
      setLoadingAction(''); // Reset the action state
    }
  }

  // Define columns for the CrudTable
  const columns: Column<Course>[] = [
    { key: 'name', label: 'Course Name' },
    { key: 'description', label: 'Description' },
    { key: 'credits', label: 'Credits' },
  ]

  // Handle adding a new course
  async function handleAdd(course: Partial<Course>) {
    setLoading(true);
    setLoadingAction('adding'); // Set action as adding
    try {
      const { data, error } = await supabase
        .from('course')
        .insert([course])
        .select()
      if (error) throw error
      if (data) loadCourses()
    } catch (error) {
      console.error('Error adding course:', error)
      setCourses([...courses, { ...course, id: Date.now().toString(), created_at: new Date().toISOString() } as Course])
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }

  // Handle editing a course
  async function handleEdit(id: string, course: Partial<Course>) {
    setLoading(true);
    setLoadingAction('editing'); // Set action as editing
    try {
      const { error } = await supabase
        .from('course')
        .update(course)
        .eq('id', id)
      if (error) throw error
      loadCourses()
    } catch (error) {
      console.error('Error editing course:', error)
      setCourses(courses.map(c => c.id === id ? { ...c, ...course } : c))
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }

  // Handle deleting a course
  async function handleDelete(id: string) {
    setLoading(true);
    setLoadingAction('deleting'); // Set action as deleting
    try {
      const { error } = await supabase
        .from('course')
        .delete()
        .eq('id', id)
      if (error) throw error
      loadCourses()
    } catch (error) {
      console.error('Error deleting course:', error)
      setCourses(courses.filter(c => c.id !== id))
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }

  // Determine if the UI should show a loading spinner for a specific action
  function renderLoading() {
    if (loading) {
      switch (loadingAction) {
        case 'loading':
          return <p className="text-center text-lg">Loading courses...</p>;
        case 'adding':
          return <p className="text-center text-lg">Adding course...</p>;
        case 'editing':
          return <p className="text-center text-lg">Editing course...</p>;
        case 'deleting':
          return <p className="text-center text-lg">Deleting course...</p>;
        default:
          return null;
      }
    }
    return null;
  }

  // Pagination logic
  const totalPages = Math.ceil(totalCourses / itemsPerPage); // Calculate total pages

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Courses Management</h1>
        
        {/* Render loading state */}
        {renderLoading()}

       

        {/* Card for Course List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <CrudTable<Course>
            data={courses}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addTitle="Add New Course"  //{/* Title for Add dialog */}
            editTitle="Update Course"  //{/* Title for Edit dialog */}
            entityType="course"  // Set entityType as "teacher" for TeacherPage
          />
        </div>

        {/* Pagination Controls */}
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
    </div>
  )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import { Course } from '@/types/schema'
// import { CrudTable, Column } from '@/components/crud-table'
// import { createClient } from '@supabase/supabase-js'

// // Get the Supabase URL and anon key from environment variables
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// // Initialize the Supabase client
// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   throw new Error("Supabase URL or anonymous key is not defined.")
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// const sampleCourses: Course[] = [
//   {
//     id: '1',
//     name: 'Introduction to Computer Science',
//     description: 'A foundational course in computer science principles',
//     credits: 3,
//     created_at: '2023-01-01T00:00:00Z'
//   },
//   {
//     id: '2',
//     name: 'Advanced Mathematics',
//     description: 'In-depth study of calculus and linear algebra',
//     credits: 4,
//     created_at: '2023-01-02T00:00:00Z'
//   },
//   {
//     id: '3',
//     name: 'World History',
//     description: 'Comprehensive overview of global historical events',
//     credits: 3,
//     created_at: '2023-01-03T00:00:00Z'
//   }
// ]

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]); // Initialize courses state
//   const [loading, setLoading] = useState<boolean>(false); // Loading state for operations
//   const [loadingAction, setLoadingAction] = useState<string>(''); // Track which action is loading

//   useEffect(() => {
//     loadCourses()
//   }, [])

//   // Function to load courses
//   async function loadCourses() {
//     setLoading(true); // Set loading state to true
//     setLoadingAction('loading'); // Set the action to "loading"
//     try {
//       const { data, error } = await supabase.from('course').select('*')
//       if (error) throw error
//       if (data) setCourses(data)
//     } catch (error) {
//       console.error('Error loading courses:', error)
//       setCourses(sampleCourses) // Fallback to sample data if there's an error
//     } finally {
//       setLoading(false); // Reset loading state
//       setLoadingAction(''); // Reset the action state
//     }
//   }

//   // Define columns for the CrudTable
//   const columns: Column<Course>[] = [
//     { key: 'name', label: 'Course Name' },
//     { key: 'description', label: 'Description' },
//     { key: 'credits', label: 'Credits' },
//   ]

//   // Handle adding a new course
//   async function handleAdd(course: Partial<Course>) {
//     setLoading(true);
//     setLoadingAction('adding'); // Set action as adding
//     try {
//       const { data, error } = await supabase
//         .from('course')
//         .insert([course])
//         .select()
//       if (error) throw error
//       if (data) loadCourses()
//     } catch (error) {
//       console.error('Error adding course:', error)
//       setCourses([...courses, { ...course, id: Date.now().toString(), created_at: new Date().toISOString() } as Course])
//     } finally {
//       setLoading(false);
//       setLoadingAction('');
//     }
//   }

//   // Handle editing a course
//   async function handleEdit(id: string, course: Partial<Course>) {
//     setLoading(true);
//     setLoadingAction('editing'); // Set action as editing
//     try {
//       const { error } = await supabase
//         .from('course')
//         .update(course)
//         .eq('id', id)
//       if (error) throw error
//       loadCourses()
//     } catch (error) {
//       console.error('Error editing course:', error)
//       setCourses(courses.map(c => c.id === id ? { ...c, ...course } : c))
//     } finally {
//       setLoading(false);
//       setLoadingAction('');
//     }
//   }

//   // Handle deleting a course
//   async function handleDelete(id: string) {
//     setLoading(true);
//     setLoadingAction('deleting'); // Set action as deleting
//     try {
//       const { error } = await supabase
//         .from('course')
//         .delete()
//         .eq('id', id)
//       if (error) throw error
//       loadCourses()
//     } catch (error) {
//       console.error('Error deleting course:', error)
//       setCourses(courses.filter(c => c.id !== id))
//     } finally {
//       setLoading(false);
//       setLoadingAction('');
//     }
//   }

//   // Determine if the UI should show a loading spinner for a specific action
//   function renderLoading() {
//     if (loading) {
//       switch (loadingAction) {
//         case 'loading':
//           return <p className="text-center text-lg">Loading courses...</p>;
//         case 'adding':
//           return <p className="text-center text-lg">Adding course...</p>;
//         case 'editing':
//           return <p className="text-center text-lg">Editing course...</p>;
//         case 'deleting':
//           return <p className="text-center text-lg">Deleting course...</p>;
//         default:
//           return null;
//       }
//     }
//     return null;
//   }

//   return (
//     <div className="container mx-auto py-8 px-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
//         <h1 className="text-4xl font-semibold text-gray-800 mb-6">Courses Management</h1>
        
//         {/* Render loading state */}
//         {renderLoading()}

//         {/* Card for Course List */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <CrudTable<Course>
//             data={courses}
//             columns={columns}
//             onAdd={handleAdd}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

