'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CrudTable, Column } from '@/components/crud-table';
import { Department, Staff } from '@/types/schema';
import DeleteConfirmationModal from '@/components/ui/deleteConfirmationModal';
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '@/components/utils/toastUtils';

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    console.log('Fetching departments...');
    loadDepartments();
    loadStaff();
  }, [currentPage]);

  // Load department data
  async function loadDepartments() {
    try {
      console.log('Loading departments from database...');
      const { data, error } = await supabase.from('department').select('id, name');
      if (error) throw error;
      console.log('Fetched departments: ', data);
      setDepartments(data || []);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  }

  // Load staff data
  async function loadStaff() {
    setLoading(true);
    setLoadingAction('loading');
    try {
      console.log('Loading staff from database...');
      const { data, error } = await supabase.rpc('load_staff', {
        page_number: currentPage,
        items_per_page: itemsPerPage,
      });
      if (error) throw error;
      if (data) {
        console.log('Fetched staff: ', data);  // Check data structure
      }
      if (data) {
        console.log('Fetched staff: ', data[0].department);
        setStaff(data.map((item: any) => ({
          ...item,
          department: item.department, // Ensure the department name is available
        })));
        setTotalStaff(data.length || 0); // Get total staff count from the response
      }
      
    } catch (error) {
      console.error('Error loading staff:', error);
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }
  interface ColumnWithStyle<T> extends Column<T> {
    style?: React.CSSProperties; // Add style property
  }
  // Columns definition for staff table
  const columns: ColumnWithStyle<Staff>[] = [
    { key: 'first_name', label: 'First Name', required: true },
    { key: 'last_name', label: 'Last Name', required: true },
    { key: 'email', label: 'Email', required: true },
    { key: 'role', label: 'Role', required: true },
    {
      key: 'department',
      label: 'Department',
      required: false,
      render: (value) => value || 'Unknown',
      // render: (value) => {
      //   const department = departments.find((d) => d.id === value);
      //   return department ? department.name : 'Unknown';
      // },
    },
    {
      key: 'department_id',
      label: 'Department ID',
      required: true, // Not required since it's hidden
      render: () => "", // Return an empty string instead of null
      style: { display: 'none' }, // Optionally hide the column
    },
  ];

  async function handleAdd(newStaff: Partial<Staff>) {
    setLoading(true);
    setLoadingAction('adding');
    try {
      console.log('Adding new staff: ', newStaff);
      const { error } = await supabase.rpc('add_staff', {
        p_first_name: newStaff.first_name,
        p_last_name: newStaff.last_name,
        p_email: newStaff.email,
        p_role: newStaff.role,
        p_department_id: newStaff.department_id,
      });
      if (error) throw error;
      showSuccessToast('New staff information added successfully.');
      loadStaff();
    } catch (error) {
      showErrorToast('Error adding staff');
      console.error('Error adding staff:', error);
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }

  async function handleEdit(id: string, updatedStaff: Partial<Staff>) {
    setLoading(true);
    setLoadingAction('editing');
    try {
      console.log('Editing staff with ID: ', id, 'New Data: ', updatedStaff);
      const { error } = await supabase.rpc('edit_staff', {
        p_id: id,
        p_first_name: updatedStaff.first_name,
        p_last_name: updatedStaff.last_name,
        p_email: updatedStaff.email,
        p_role: updatedStaff.role,
        p_department_id: updatedStaff.department_id,
      });
      if (error) throw error;
      showSuccessToast('Staff information updated successfully.');
      loadStaff();
    } catch (error) {
      showErrorToast('Error editing staff');
      console.error('Error editing staff:', error);
    } finally {
      setLoading(false);
      setLoadingAction('');
    }
  }

  async function handleDeleteClick(id: string) {
    console.log('Preparing to delete staff with ID: ', id);
    setStaffToDelete(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete() {
    if (staffToDelete) {
      setLoading(true);
      setLoadingAction('deleting');
      try {
        console.log('Deleting staff with ID: ', staffToDelete);
        const { error } = await supabase.rpc('delete_staff', { p_id: staffToDelete });
        if (error) throw error;
        showSuccessToast('Staff deleted successfully.');
        loadStaff();
      } catch (error) {
        showErrorToast('Error deleting staff');
        console.error('Error deleting staff:', error);
      } finally {
        setLoading(false);
        setLoadingAction('');
        setShowDeleteConfirm(false);
      }
    }
  }

  const totalPages = Math.ceil(totalStaff / itemsPerPage);

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Staff Management</h1>
  
        {loading && <p className="text-center text-lg">{loadingAction}...</p>}
  
        {/* Check if departments are available */}
        {departments && departments.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <CrudTable<Staff>
              data={staff}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              addTitle="Add New Staff"
              editTitle="Edit Staff"
              entityType="staff"
              additionalProps={{ departments }}  // Pass departments when available
            />
          </div>
        ) : (
          <p className="text-center text-lg text-red-500">No departments available. Please check your data source.</p>
        )}
  
        {/* Pagination and other components */}
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
  
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        message="You are about to delete this staff record. This action cannot be undone."
      />
    </div>
  );
  
}
