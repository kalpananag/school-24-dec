export interface Course {
  id: string
  name: string
  description: string
  //teacher_id: string
  credits: number
  created_at: string
}

export interface Student {
  id: string
  first_name: string
  last_name: string
  email: string
  enrollment_date: string
  class: string
}

export interface Teacher {
  id: string
  first_name: string
  last_name: string
  email: string
  department: string
  
  }

  // Define the Department type
  export interface Department {
    id: string;
    name: string;
  }
  
  export interface Staff {
    id: string
    first_name: string
    last_name: string
    email: string
    role: string
    department: string // or you can change it to department_name if you want to keep it
    department_id: string // Add department_id to reference the department table
  }

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
}