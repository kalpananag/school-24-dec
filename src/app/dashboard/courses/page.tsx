'use client'

import { useState, useEffect } from 'react'

import { Course } from '@/types/schema'
import { CrudTable } from '@/components/crud-table'
//import { supabase } from '@/lib/supabase'
//import { supabase } from '../../../lib/supabase'
import { createClient } from '@supabase/supabase-js'

// Get the Supabase URL and anon key from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


const sampleCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'A foundational course in computer science principles',
    //teacher_id: 'T001',
    credits: 3,
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    description: 'In-depth study of calculus and linear algebra',
    //teacher_id: 'T002',
    credits: 4,
    created_at: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'World History',
    description: 'Comprehensive overview of global historical events',
    //teacher_id: 'T003',
    credits: 3,
    created_at: '2023-01-03T00:00:00Z'
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(sampleCourses)

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      const { data, error } = await supabase.from('course').select('*')
      if (error) throw error
      if (data) setCourses(data)
    } catch (error) {
      console.error('Error loading courses:', error)
      // Fallback to sample data if there's an error
      setCourses(sampleCourses)
    }
  }

  const columns = [
    { key: 'name', label: 'Course Name' },
    { key: 'description', label: 'Description' },
    { key: 'credits', label: 'Credits' },
  ]

  async function handleAdd(course: Partial<Course>) {
    try {
      const { data, error } = await supabase
        .from('course')
        .insert([course])
        .select()
      if (error) throw error
      if (data) loadCourses()
    } catch (error) {
      console.error('Error adding course:', error)
      // Optimistically update UI with new course
      setCourses([...courses, { ...course, id: Date.now().toString(), created_at: new Date().toISOString() } as Course])
    }
  }

  async function handleEdit(id: string, course: Partial<Course>) {
    try {
      const { error } = await supabase
        .from('courses')
        .update(course)
        .eq('id', id)
      if (error) throw error
      loadCourses()
    } catch (error) {
      console.error('Error editing course:', error)
      // Optimistically update UI
      setCourses(courses.map(c => c.id === id ? { ...c, ...course } : c))
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)
      if (error) throw error
      loadCourses()
    } catch (error) {
      console.error('Error deleting course:', error)
      // Optimistically update UI
      setCourses(courses.filter(c => c.id !== id))
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold text-white mb-8">Courses Management</h1>
      <CrudTable
        data={courses}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

