import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaAddressCard } from 'react-icons/fa';
import { MdFamilyRestroom } from 'react-icons/md';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Department } from '@/types/schema';
import AddressDialog from '@/components/ui/addressdialog';
import ParentDialog from '@/components/ui/parentDialog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Column<T> {
  key: keyof T;
  label: string;
  required?: boolean;
  render?: (value: any) => string; // Add the render function here
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
  additionalProps?: {
    departments?: Department[]; // Accept departments prop for 'staff'
  };
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
  additionalProps,
}: CrudTableProps<T>) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Partial<T> & { enrollment_date?: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressItemId, setAddressItemId] = useState<string | null>(null);
  const [isParentDialogOpen, setIsParentDialogOpen] = useState(false);
  const [parentItemId, setParentItemId] = useState<string | null>(null);

  // Get departments from additionalProps or fallback to empty array
  const departments = additionalProps?.departments || [];

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({});
    }
  }, [editingItem]);

  // Helper function to handle form input values
  const handleValue = (column: Column<T>, value: any): string | number | '' => {
    if (value === undefined || value === null) return ''; // Return empty string for undefined or null
    if (typeof value === 'string' || typeof value === 'number') return value; // Return string or number as is
    return ''; // Fallback to empty string for other types
  };

  // Helper function to check if a field is empty
  const isFieldEmpty = (value: any) => {
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    if (value === null || value === undefined) {
      return true;
    }
    return false;
  };

  // Validate the form
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    columns.forEach((column) => {
      const value = formData[column.key as keyof T];

      if (column.required && isFieldEmpty(value)) {
        newErrors[column.key as string] = `${column.label} is required`;
        valid = false;
      }

      if (column.key === 'enrollment_date' && column.required) {
        if (typeof value === 'string') {
          if (!value || !isValidDate(value)) {
            newErrors[column.key as string] = `${column.label} must be a valid date`;
            valid = false;
          }
        } else {
          newErrors[column.key as string] = `${column.label} must be a valid date`;
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // Validate date
  const isValidDate = (value: string) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  };

  // Format datetime for input in "yyyy-MM-ddThh:mm" format
  const formatDatetimeForInput = (datetime: string) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  // Handle form submission (add or edit)
  const handleFormSubmit = async () => {
    if (formData.enrollment_date && typeof formData.enrollment_date === 'string') {
      formData.enrollment_date = new Date(formData.enrollment_date).toISOString();
    }

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
    setEditingItem(null);
    setErrors({});
  };

  // Dialog title based on whether adding or editing
  const dialogTitle = editingItem ? editTitle : addTitle;

  // Open Address Dialog
  const openAddressDialog = (itemId: string) => {
    setAddressItemId(itemId);
    setIsAddressDialogOpen(true);
  };

  // Close Address Dialog
  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
    setAddressItemId(null);
  };

  // Open Parent Dialog
  const openParentDialog = (itemId: string) => {
    setParentItemId(itemId);
    setIsParentDialogOpen(true);
  };

  // Close Parent Dialog
  const closeParentDialog = () => {
    setIsParentDialogOpen(false);
    setParentItemId(null);
  };
  // Open Add New Dialog
  const handleAddNewClick = () => {
    setIsAddOpen(true);
    setFormData({});  // Clear formData when adding a new item
    setEditingItem(null);  // Clear editingItem when adding new item
  };

  // Open Edit Dialog
  const handleEditClick = (item: T) => {
    setEditingItem(item); // Set the item to be edited
    setFormData(item); // Populate formData with the selected item
    setIsEditOpen(true); // Open the edit dialog
  };
  return (
    <div>
      {/* Add New Dialog */}
      <div className="flex justify-center items-center mb-4">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-300 hover:bg-blue-400 ml-auto" 
              onClick={handleAddNewClick}>Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                    value={(() => {
                      const value = formData[column.key as keyof T];
                      if (typeof value === 'string') {
                        return formatDatetimeForInput(value);
                      } else {
                        return '';
                      }
                    })()}
                    onChange={(e) =>
                      setFormData({ ...formData, [column.key]: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : column.key === 'department_id' && entityType === 'staff' ? (
                  departments.length === 0 ? (
                    <p>Loading departments...</p>
                  ) : (
                    <select
                      value={handleValue(column, formData[column.key as keyof T]) || ''} // Use handleValue to return a valid value type
                      onChange={(e) =>
                        setFormData({ ...formData, [column.key]: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id} >
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  )
                  ): column.key === 'department' ? ( // New column input
                    <input
                      type="text"
                      hidden
                    />
                  ) : (
                  <Input
                    placeholder={column.label}
                    value={handleValue(column, formData[column.key as keyof T]) || ''}
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
            {columns
              .filter(column =>column.key !== 'department_id') //hide department_id in header
              .map((column) => (
              <TableHead key={String(column.key)}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns
                .filter(column => column.key !== 'department_id') // Hide the department_id column in the body
                .map((column) => (
                <TableCell key={String(column.key)}>{handleValue(column, item[column.key])}</TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleEditClick(item)}
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

      {/* Parent Dialog */}
      <ParentDialog
        open={isParentDialogOpen}
        onClose={closeParentDialog}
        studentId={parentItemId}
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
                ): column.key === 'department_id' && entityType === 'staff' ? (
                  departments.length === 0 ? (
                    <p>Loading departments...</p>
                  ) : (
                    <select
                      value={handleValue(column, formData[column.key as keyof T]) || ''} // Use handleValue to return a valid value type
                      onChange={(e) =>
                        setFormData({ ...formData, [column.key]: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id} >
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  )
                  ): column.key === 'department' ? ( // New column input
                    <input
                      type="text"
                      hidden
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