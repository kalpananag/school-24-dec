import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaAddressBook } from 'react-icons/fa';
import { GiFamilyHouse } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AddressDialog from '@/components/ui/addressdialog';
import ParentDialog from '@/components/ui/parentDialog';
import { Address } from '@/types/schema'; // Import Address interface
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Column<T> {
  key: keyof T;
  label: string;
  required?: boolean;
}

interface CrudTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onAdd: (item: Partial<T>) => Promise<void>;
  onEdit: (id: string, item: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  addTitle: string;
  editTitle: string;
  showAddressAction?: boolean;
  entityType: 'teacher' | 'student' | 'staff' | 'course';
}

export function CrudTable<T extends { id: string }>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  addTitle,
  editTitle,
  showAddressAction = false,
  entityType,
}: CrudTableProps<T>) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Partial<T> & { enrollment_date?: string }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // For tracking errors

  // Address dialog related states
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressItemId, setAddressItemId] = useState<string | null>(null);

  // Parent dialog related states
  const [isParentDialogOpen, setIsParentDialogOpen] = useState(false);
  const [parentItemId, setParentItemId] = useState<string | null>(null);
  // Effect hook to reset form when editing item changes
  useEffect(() => {
    if (editingItem) {
      // When editingItem is set, reset the form with its data
      setFormData(editingItem);  // This updates the form with the current editingItem data
    } else {
      setFormData({});  // Empty form when adding new
    }
  }, [editingItem]);

  // Utility function to handle form value (casting T[keyof T] to string | number)
  const handleValue = (column: Column<T>, value: any): string | number | '' => {
    if (value === undefined || value === null) return ''; // Return empty string for undefined or null
    if (typeof value === 'string' || typeof value === 'number') return value; // Return string or number as is
    return ''; // Fallback to empty string for other types
  };

  // Function to check if a field is empty based on its type
  const isFieldEmpty = (value: any) => {
    if (typeof value === 'string') {
      // For string values, check for empty or whitespace-only strings
      return value.trim() === '';
    }
    if (value === null || value === undefined) {
      // For null or undefined, the field is considered empty
      return true;
    }
    // If it's a number or other types, treat it as not empty (you can customize this further if needed)
    return false;
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
  
    columns.forEach((column) => {
      const value = formData[column.key as keyof T];
  
      // Check if the field is required and empty or null
      console.log('enrollment date inside validation: ', value);
  
      if (column.required && isFieldEmpty(value)) {
        newErrors[column.key as string] = `${column.label} is required`;
        valid = false;
      }
  
      // Special validation for datetime fields (e.g., enrollment_date)
      if (column.key === 'enrollment_date' && column.required) {
        if (typeof value === 'string') { // Check if the value is a string
          if (!value || !isValidDate(value)) {
            newErrors[column.key as string] = `${column.label} must be a valid date`;
            valid = false;
          }
        } else {
          // Handle case where value is not a string (e.g., undefined, null, etc.)
          newErrors[column.key as string] = `${column.label} must be a valid date`;
          valid = false;
        }
      }
    });
  
    setErrors(newErrors);
    return valid;
  };
  
  
  
  // Helper function to check if the value is a valid date string
  const isValidDate = (value: string) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  };
  

  // Format datetime for input in the "yyyy-MM-ddThh:mm" format
  const formatDatetimeForInput = (datetime: string) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    // Ensure that enrollment_date exists and is a string before trying to convert it
    if (formData.enrollment_date && typeof formData.enrollment_date === 'string') {
      // Manually convert the datetime to ISO string (with timezone 'Z' at the end)
      formData.enrollment_date = new Date(formData.enrollment_date).toISOString();
    }

    // Check if form is valid before submission
    const isValid = validateForm();
    if (!isValid) return;

    if (editingItem) {
      await onEdit(editingItem.id, formData);
      setIsEditOpen(false);
    } else {
      await onAdd(formData);
      setIsAddOpen(false);
    }

    setFormData({});
    setEditingItem(null);  // Reset after submission
    setErrors({}); // Clear errors after submission
  };

  const dialogTitle = editingItem ? editTitle : addTitle;

  // Open address dialog
  const openAddressDialog = (itemId: string) => {
    setAddressItemId(itemId);
    setIsAddressDialogOpen(true);
  };

  // Close address dialog
  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
    setAddressItemId(null);
  };

  const openParentDialog = (itemId: string) => {
    setParentItemId(itemId);
    setIsParentDialogOpen(true);
  };

  const closeParentDialog = () => {
    setIsParentDialogOpen(false);
    setParentItemId(null);
  };

  return (
    <div>
      {/* Add New Dialog */}
      <div className="flex justify-center items-center mb-4">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-300 hover:bg-blue-400 ml-auto">
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="add-item-description">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              {columns.map((column) => (
                <div key={String(column.key)} className="space-y-2">
                  {column.key === 'enrollment_date' ? (
                    <input
                    type="datetime-local"
                    placeholder={column.label}
                    value={
                      // Log the value to see what's going on
                      (() => {
                        const value = formData[column.key as keyof T]; // Get the value from formData
                        console.log('formData[column.key]:', value);  // Log value to inspect
                        console.log('typeof value:', typeof value);   // Log the type
                  
                        // Check if the value is a string before formatting
                        if (typeof value === 'string') {
                          return formatDatetimeForInput(value);  // Format if string
                        } else {
                          // Return empty string if value is undefined or not a string
                          return '';
                        }
                      })()
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, [column.key]: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  
                  ) : (
                    <Input
                      placeholder={column.label}
                      value={handleValue(column, formData[column.key as keyof T])}
                      onChange={(e) =>
                        setFormData({ ...formData, [column.key]: e.target.value })
                      }
                    />
                  )}
                  {errors[column.key as string] && (
                    <p className="text-red-500 text-sm">{errors[column.key as string]}</p>
                  )}
                </div>
              ))}
              <Button type="button" onClick={handleFormSubmit}>Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table with data */}
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
                <TableCell key={String(column.key)}>{handleValue(column, item[column.key])}</TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);  // Populate formData when editing
                    setIsEditOpen(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrashAlt />
                </Button>
                {showAddressAction && (
                  <Button
                    variant="ghost"
                    onClick={() => openAddressDialog(item.id)}
                  >
                    <FaAddressCard />
                  </Button>
                )}
                {entityType.toLowerCase() === 'student' && (
                  <Button variant="ghost" onClick={() => openParentDialog(item.id)}>
                    <MdFamilyRestroom />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Address Dialog */}
      <AddressDialog
        open={isAddressDialogOpen}
        onClose={closeAddressDialog}
        itemId={addressItemId}
        entityType={entityType}
      />

      <ParentDialog
        open={isParentDialogOpen}
        onClose={closeParentDialog}
        studentId={parentItemId}
        //entityType={entityType}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent aria-describedby="edit-item-description">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            {columns.map((column) => (
              <div key={String(column.key)} className="space-y-2">
                {column.key === 'enrollment_date' ? (
                  <input
                  type="datetime-local"
                  placeholder={column.label}
                  value={
                    // Log the value to see what's going on
                    (() => {
                      const value = formData[column.key as keyof T]; // Get the value from formData
                      console.log('formData[column.key]:', value);  // Log value to inspect
                      console.log('typeof value:', typeof value);   // Log the type
                
                      // Check if the value is a string before formatting
                      if (typeof value === 'string') {
                        return formatDatetimeForInput(value);  // Format if string
                      } else {
                        // Return empty string if value is undefined or not a string
                        return '';
                      }
                    })()
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, [column.key]: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                
                ) : (
                  <Input
                    placeholder={column.label}
                    value={handleValue(column, formData[column.key as keyof T])}
                    onChange={(e) =>
                      setFormData({ ...formData, [column.key]: e.target.value })
                    }
                  />
                )}
                {errors[column.key as string] && (
                  <p className="text-red-500 text-sm">{errors[column.key as string]}</p>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleFormSubmit}>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}