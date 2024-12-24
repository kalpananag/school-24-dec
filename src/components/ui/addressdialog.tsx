
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SuccessMessage from '@/components/ui/successMessage'
import {
  insertAddress,
  getAddresses,
} from '@/lib/address-operations'; // Update function names for generalized address operations
import {Tooltip} from 'react-tooltip';
// Define the AddressFormData type for the form input fields
interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
}

// Define the types for the AddressDialogProps
interface AddressDialogProps {
  open: boolean;
  onClose: () => void;
  itemId: string | null;
  entityType: 'teacher' | 'student' | 'staff' | 'course' ; // Extendable if needed
}

// Define the Address structure based on your schema
interface Address {
  address_id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  address_type: 'home' | 'temp' | 'other'; // Fixed type to restrict values to 'home', 'office', or 'other'
}

const AddressDialog: React.FC<AddressDialogProps> = ({ open, onClose, itemId, entityType }) => {
  const [selectedTab, setSelectedTab] = useState<'home' | 'temp' | 'other'>('home');

  const [addressData, setAddressData] = useState<{
    home: AddressFormData;
    temp: AddressFormData;
    other: AddressFormData;
  }>({
    home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
    temp: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
    other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
  });

  const tabDescriptions = {
    home: 'Manage home, student lives with parents.',
    temp: 'Manage temp, student at their relative/guardians location',
    other: 'Other, student on field trip or vacations',
  };

  // Fetch addresses when itemId changes
  useEffect(() => {
    if (itemId) {
      const fetchAddresses = async () => {
        try {
          const addresses = await getAddresses(itemId, entityType); // Fetch addresses based on entity type

          if (addresses && addresses.length > 0) {
            const newAddressData = {
              home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              temp: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
            };

            addresses.forEach((address: Address) => {
              const addressType = address.address_type.toLowerCase() as 'home' | 'temp' | 'other';
              if (addressType in newAddressData) {
                newAddressData[addressType] = {
                  street: address.street || '',
                  city: address.city || '',
                  state: address.state || '',
                  zip_code: address.zip_code || '',
                  phone_number: address.phone_number || '',
                };
              }
            });

            setAddressData(newAddressData);
          } else {
            console.log('No addresses found.');
            setAddressData({
              home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              temp: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
            });
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

      fetchAddresses();
    }
  }, [itemId, entityType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [selectedTab]: {
        ...prevState[selectedTab],
        [name]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemId) {
      alert('Item ID is required to save the address.');
      return;
    }

    try {
      const addressToSave = addressData[selectedTab];
      console.log('Address data to save:', addressToSave);
      await insertAddress(itemId, entityType,addressToSave, selectedTab); // Save based on entity type
      console.log(`Address saved successfully for ${entityType} ${itemId}`); 
      //alert(`Address saved successfully for ${entityType} ${itemId}`);
      const message = `Address saved successfully for ${entityType} ${itemId}`;
      <SuccessMessage message={message} /> 
      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address.');
    }
  };

  const renderFormContent = () => {
    const addressPrefix = selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1);
    const currentAddress = addressData[selectedTab];

    return (
      <div className="space-y-4">
        {['street', 'city', 'state', 'zip_code', 'phone_number'].map((field) => (
          <Input
            key={field}
            placeholder={`${addressPrefix} ${field.replace('_', ' ')}`}
            name={field}
            value={currentAddress[field as keyof AddressFormData]}
            onChange={handleInputChange}
            className="mb-4 w-full"
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Addresses for {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</DialogTitle>
        </DialogHeader>

        {/* <div className="tabs">
          <div className="flex space-x-4 mb-4">
            {['home', 'temp', 'other'].map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? 'default' : 'ghost'}
                onClick={() => setSelectedTab(tab as 'home' | 'temp' | 'other')}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div> */}
       <div className="tabs">
          <div className="flex space-x-4 mb-4">
            {['home', 'temp', 'other'].map((tab) => (
              <div key={tab}>
                <Button
                  id={`tooltip-${tab}`} // Unique ID for each tab
                  variant={selectedTab === tab ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab(tab as 'home' | 'temp' | 'other')}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
                {/* Tooltip Component */}
                <Tooltip anchorId={`tooltip-${tab}`} content={tabDescriptions[tab as 'home' | 'temp' | 'other']} place="top" />
              </div>
            ))}
          </div>
        </div>

        <form className="space-y-4 w-full" onSubmit={handleSave}>
          {renderFormContent()}

          <div className="flex justify-between mt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;





// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface AddressDialogProps {
//   open: boolean;
//   onClose: () => void;
//   itemId: string | null;
// }

// const AddressDialog: React.FC<AddressDialogProps> = ({ open, onClose, itemId }) => {
//   const [selectedTab, setSelectedTab] = useState('home');
//   const [addressFormData, setAddressFormData] = useState({
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     postalCode: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAddressFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Handle saving the address (you can connect to backend here)
//     alert(`Address saved for item ${itemId}: ${JSON.stringify(addressFormData)}`);
//     onClose(); // Close the dialog after saving
//   };

//   const renderFormContent = () => {
//     switch (selectedTab) {
//       case 'home':
//         return (
//           <div>
//             <Input
//               placeholder="Address Line 1"
//               name="addressLine1"
//               value={addressFormData.addressLine1}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Address Line 2 (Optional)"
//               name="addressLine2"
//               value={addressFormData.addressLine2}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="City"
//               name="city"
//               value={addressFormData.city}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Postal Code"
//               name="postalCode"
//               value={addressFormData.postalCode}
//               onChange={handleInputChange}
//             />
//           </div>
//         );
//       case 'office':
//         return (
//           <div>
//             <Input
//               placeholder="Office Address Line 1"
//               name="addressLine1"
//               value={addressFormData.addressLine1}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Office Address Line 2 (Optional)"
//               name="addressLine2"
//               value={addressFormData.addressLine2}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Office City"
//               name="city"
//               value={addressFormData.city}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Office Postal Code"
//               name="postalCode"
//               value={addressFormData.postalCode}
//               onChange={handleInputChange}
//             />
//           </div>
//         );
//       case 'other':
//         return (
//           <div>
//             <Input
//               placeholder="Other Address Line 1"
//               name="addressLine1"
//               value={addressFormData.addressLine1}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Other Address Line 2 (Optional)"
//               name="addressLine2"
//               value={addressFormData.addressLine2}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Other City"
//               name="city"
//               value={addressFormData.city}
//               onChange={handleInputChange}
//             />
//             <Input
//               placeholder="Other Postal Code"
//               name="postalCode"
//               value={addressFormData.postalCode}
//               onChange={handleInputChange}
//             />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Manage Addresses for </DialogTitle>
//         </DialogHeader>

//         <div className="tabs">
//           {/* Tab Buttons */}
//           <div className="flex space-x-4 mb-4">
//             <Button
//               variant={selectedTab === 'home' ? 'default' : 'ghost'}
//               onClick={() => setSelectedTab('home')}
//             >
//               Home
//             </Button>
//             <Button
//               variant={selectedTab === 'office' ? 'default' : 'ghost'}
//               onClick={() => setSelectedTab('office')}
//             >
//               Office
//             </Button>
//             <Button
//               variant={selectedTab === 'other' ? 'default' : 'ghost'}
//               onClick={() => setSelectedTab('other')}
//             >
//               Other
//             </Button>
//           </div>
//         </div>

//         <form className="space-y-4">
//           {renderFormContent()}

//           <div className="flex justify-between mt-4">
//             <Button variant="ghost" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSave}>Save Address</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddressDialog;

