import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { insertParents, getParents } from '@/lib/parent-operations'; // Import the functions
import { Tooltip } from 'react-tooltip';

// Define Parent form data structure
interface ParentFormData {
  first_name: string;
  last_name: string;
  email: string | null;  // email can be string or null
  phone_number: string | null;  // phone_number can be string or null
  relationship: string; // Ensure this is not nullable
}

interface Parent {
  parent_type: 'Father' | 'Mother' | 'Guardian';
  first_name: string;
  last_name: string;
  email: string | null;  // email can be string or null
  phone_number: string | null;  // phone_number can be string or null
  relationship: string; // relationship should not be nullable
}

// Define ParentDialog props interface
interface ParentDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string | null;
}

const ParentDialog: React.FC<ParentDialogProps> = ({ open, onClose, studentId }) => {
  const [selectedTab, setSelectedTab] = useState<'Father' | 'Mother' | 'Guardian'>('Father');
  const [parentData, setParentData] = useState<{
    Father: ParentFormData;
    Mother: ParentFormData;
    Guardian: ParentFormData;
  }>({
    Father: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Father' },
    Mother: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Mother' },
    Guardian: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Guardian' },
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (studentId) {
      const fetchParents = async () => {
        const parents = await getParents(studentId);
        if (parents && parents.length > 0) {
          const newParentData: { [key in 'Father' | 'Mother' | 'Guardian']: ParentFormData } = {
            Father: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Father' },
            Mother: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Mother' },
            Guardian: { first_name: '', last_name: '', email: null, phone_number: null, relationship: 'Guardian' },
          };

          parents.forEach((parent: Parent) => {
            const parentType = parent.parent_type as 'Father' | 'Mother' | 'Guardian';
          
            if (parentType in newParentData) {
              newParentData[parentType] = {
                first_name: parent.first_name || '',
                last_name: parent.last_name || '',
                // Ensure email and phone_number are treated as string or null
                email: parent.email !== undefined && parent.email !== null ? parent.email : null,
                phone_number: parent.phone_number !== undefined && parent.phone_number !== null ? parent.phone_number : null,
                relationship: parent.relationship || parentType,
              };
            }
          });
          
          setParentData(newParentData);
        }
      };

      fetchParents();
    }
  }, [studentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (value === '' || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setEmailError(null);
      } else {
        setEmailError('Please enter a valid email address');
      }
    }

    if (name === 'phone_number') {
      const phoneRegex = /^\+(\d{1,3})-(\d{1,4})-(\d{1,4})-(\d{4})$/;
      if (value === '' || phoneRegex.test(value)) {
        setPhoneError(null);
      } else {
        setPhoneError('Phone number must be in the format: +<CountryCode>-<AreaCode>-<LocalNumber>');
      }
    }

    setParentData((prevState) => ({
      ...prevState,
      [selectedTab]: {
        ...prevState[selectedTab],
        [name]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId) {
      alert('Student ID is required to save the parent data.');
      return;
    }

    const parentDataToSave = {
      Father: parentData.Father,
      Mother: parentData.Mother,
      Guardian: parentData.Guardian,
    };

    try {
      await insertParents(studentId, parentDataToSave);
      console.log(`All parent data saved successfully for student ${studentId}`);
      onClose();
    } catch (error) {
      console.error('Error saving parent data:', error);
      alert('Failed to save parent data.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Parent for Student</DialogTitle>
        </DialogHeader>
        <div className="tabs">
          <div className="flex space-x-4 mb-4">
            {['Father', 'Mother', 'Guardian'].map((tab) => (
              <div key={tab}>
                <Button
                  variant={selectedTab === tab ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab(tab as 'Father' | 'Mother' | 'Guardian')}
                >
                  {tab}
                </Button>
                <Tooltip anchorId={`tooltip-${tab}`} content={`Manage ${tab}`} place="top" />
              </div>
            ))}
          </div>
        </div>
        <form className="space-y-4 w-full" onSubmit={handleSave}>
          {['first_name', 'last_name', 'relationship'].map((field) => (
            <Input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={parentData[selectedTab][field as keyof ParentFormData] || ''}
              onChange={handleInputChange}
              className="mb-4 w-full"
              disabled={field === 'relationship' && (selectedTab === 'Father' || selectedTab === 'Mother')}
            />
          ))}
          <Input
            placeholder="Email"
            name="email"
            value={parentData[selectedTab].email || ''}
            onChange={handleInputChange}
            className="mb-4 w-full"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <Input
            placeholder="Phone Number"
            name="phone_number"
            value={parentData[selectedTab].phone_number || ''}
            onChange={handleInputChange}
            className="mb-4 w-full"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          <div className="flex justify-between mt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!!emailError || !!phoneError}>
              Save Parent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParentDialog;
