// CrudTable.tsx
import { useState } from 'react';
import { FaEdit, FaTrashAlt, FaAddressBook } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AddressDialog from '@/components/ui/addressdialog';
import { Address } from '@/types/schema'; // Import Address interface

export interface Column<T> {
  key: keyof T;
  label: string;
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
  entityType: 'teacher' | 'student' | 'staff' | 'course';  // Accept entityType as a prop
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
  entityType,  // Receive entityType as a prop
}: CrudTableProps<T>) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});
  
  // Address dialog related states
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressItemId, setAddressItemId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      await onEdit(editingItem.id, formData);
      setIsEditOpen(false);
    } else {
      await onAdd(formData);
      setIsAddOpen(false);
    }
    setFormData({});
    setEditingItem(null);  // Reset form and item after submission
  };

  const dialogTitle = editingItem ? editTitle : addTitle;

  // Open address dialog
  const openAddressDialog = (itemId: string) => {
    setAddressItemId(itemId);  // Set the item ID for address dialog
    setIsAddressDialogOpen(true);
  };

  // Close address dialog
  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
    setAddressItemId(null);
  };

  // Insert address logic (now using Address interface)
  const insertAddress = async (entityType: string, itemId: string, addressData: Address) => {
    if (entityType === 'teacher') {
      console.log(`Inserting address for teacher ${itemId}`, addressData);
    } else if (entityType === 'student') {
      console.log(`Inserting address for student ${itemId}`, addressData);
    } else if (entityType === 'staff') {
      console.log(`Inserting address for staff ${itemId}`, addressData);
    }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {columns.map((column) => (
                <div key={String(column.key)}>
                  <Input
                    placeholder={column.label}
                    value={String(formData[column.key] ?? '')}
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
                <TableCell key={String(column.key)}>{String(item[column.key])}</TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(item); // Set the item being edited
                    setFormData(item);  // Populate the form with current item data
                    setIsEditOpen(true);  // Open edit dialog
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => onDelete(item.id)} // Delete action
                >
                  <FaTrashAlt />
                </Button>
                {showAddressAction && (
                  <Button
                    variant="ghost"
                    onClick={() => openAddressDialog(item.id)}  // Open address dialog on icon click
                  >
                    <FaAddressBook />
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
        entityType={entityType}  // Pass entityType to AddressDialog
        //insertAddress={insertAddress} // Pass insertAddress function
      />

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent aria-describedby="edit-item-description">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {columns.map((column) => (
              <div key={String(column.key)}>
                <Input
                  placeholder={column.label}
                  value={String(formData[column.key] ?? '')}
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
  );
}




// import { useState } from 'react';
// import { FaEdit,FaTrashAlt,FaAddressBook} from 'react-icons/fa';
// import { FcHome } from "react-icons/fc";
// import ReactTooltip  from 'react-tooltip'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';

// export interface Column<T> {
//   key: keyof T;
//   label: string;
// }

// interface CrudTableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   onAdd: (item: Partial<T>) => Promise<void>;
//   onEdit: (id: string, item: Partial<T>) => Promise<void>;
//   onDelete: (id: string) => Promise<void>;
//   addTitle: string;  // Title for adding new items
//   editTitle: string; // Title for editing existing items
//   showAddressAction?: boolean; // Prop to control visibility of the "Address" action
// }

// export function CrudTable<T extends { id: string }>({
//   data,
//   columns,
//   onAdd,
//   onEdit,
//   onDelete,
//   addTitle,
//   editTitle,
//   showAddressAction= false,
// }: CrudTableProps<T>) {
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<T | null>(null);
//   const [formData, setFormData] = useState<Partial<T>>({});

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingItem) {
//       await onEdit(editingItem.id, formData);  // Handle editing an item
//       setIsEditOpen(false);
//     } else {
//       await onAdd(formData);  // Handle adding a new item
//       setIsAddOpen(false);
//     }
//     setFormData({});
//     setEditingItem(null);  // Reset form and item after submission
//   };

//   // Determine the correct dialog title based on whether editing or adding
//   const dialogTitle = editingItem ? editTitle : addTitle;

//   return (
//     <div>
//       {/* <ReactTooltip place="top" type="dark" effect="solid" /> */}
//       <div className="flex justify-center items-center mb-4">
//         {/* Add New Dialog */}
//         <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-blue-300 hover:bg-blue-400 ml-auto">
//               Add New
//             </Button>
//           </DialogTrigger>
//           <DialogContent aria-describedby="add-item-description">
//             <DialogHeader>
//               <DialogTitle>{dialogTitle}</DialogTitle>  {/* Display the correct title */}
//             </DialogHeader>
//             <div id="add-item-description" className="sr-only">
//               Fill out the fields below to add a new item.
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {columns.map((column) => (
//                 <div key={String(column.key)}>
//                   <Input
//                     placeholder={column.label}
//                     value={String(formData[column.key] ?? '')}
//                     onChange={(e) =>
//                       setFormData({ ...formData, [column.key]: e.target.value })
//                     }
//                   />
//                 </div>
//               ))}
//               <Button type="submit">Save</Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Table with data */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {columns.map((column) => (
//               <TableHead key={String(column.key)}>{column.label}</TableHead>
//             ))}
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item) => (
//             <TableRow key={item.id}>
//               {columns.map((column) => (
//                 <TableCell key={String(column.key)}>
//                   {String(item[column.key])}
//                 </TableCell>
//               ))}
//               <TableCell>
//                 <Button
//                   variant="ghost"
//                   onClick={() => {
//                     setEditingItem(item); // Set the item being edited
//                     setFormData(item);  // Populate the form with current item data
//                     setIsEditOpen(true);  // Open edit dialog
//                   }}
//                   data-tip="Edit information"
//                 >
//                   <FaEdit />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="text-red-500"
//                   onClick={() => onDelete(item.id)} // Delete action
//                   data-tip="Delete"
//                 >
                  
//                   <FaTrashAlt /> {/* For example, a trash can icon for delete */}
//                 </Button>
//                 {/* Conditionally render the "Address" action */}
//                 {showAddressAction && (
//                   <Button
//                     variant="ghost"
//                     onClick={() => alert(`Address action clicked for ${item.id}`)} // You can define what the action does
//                     data-tip="Address & Contacts"
//                   >
//                   <FaAddressBook />
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

                  
//       {/* Edit Dialog */}
//       <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//         <DialogContent aria-describedby="edit-item-description">
//           <DialogHeader>
//             <DialogTitle>{dialogTitle}</DialogTitle>  {/* Title changes depending on Add or Edit */}
//           </DialogHeader>
//           <div id="edit-item-description" className="sr-only">
//             Update the fields below to modify the item details.
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {columns.map((column) => (
//               <div key={String(column.key)}>
//                 <Input
//                   placeholder={column.label}
//                   value={String(formData[column.key] ?? '')}
//                   onChange={(e) =>
//                     setFormData({ ...formData, [column.key]: e.target.value })
//                   }
//                 />
//               </div>
//             ))}
//             <Button type="submit">Save</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
      
//     </div>
//   );
// }
