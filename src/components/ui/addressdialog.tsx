import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
//import { Address } from '@/types/schema';  // Import Address interface
import { insertTeacherAddress, getTeacherAddresses } from '@/lib/address-operations'; // Ensure these functions are typed properly

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
  entityType: 'teacher' | 'student' | 'staff' | 'course'; // Extendable if needed
}

// Define the Address structure based on your schema
interface Address {
  address_id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  address_type: 'home' | 'office' | 'other'; // Fixed type to restrict values to 'home', 'office', or 'other'
}

const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  onClose,
  itemId,
  entityType,
}) => {
  const [selectedTab, setSelectedTab] = useState<'home' | 'office' | 'other'>('home');

  // State to hold the address data for each tab
  const [addressData, setAddressData] = useState<{
    home: AddressFormData;
    office: AddressFormData;
    other: AddressFormData;
  }>({
    home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
    office: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
    other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
  });

  // Fetch addresses when itemId changes
  useEffect(() => {
    if (itemId) {
      const fetchAddresses = async () => {
        try {
          const addresses = await getTeacherAddresses(itemId);  // Fetch the addresses from Supabase

          if (addresses && addresses.length > 0) {
            // Initialize the address data structure for home, office, and other with empty fields
            const newAddressData: {
              home: AddressFormData;
              office: AddressFormData;
              other: AddressFormData;
            } = {
              home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              office: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
            };

            // Iterate over the fetched addresses and populate the correct type
            addresses.forEach((address: Address) => {
              const addressType = address.address_type.toLowerCase() as 'home' | 'office' | 'other'; // Normalize address type

              // Only map valid types (home, office, or other)
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

            // Update the state with the mapped address data
            setAddressData(newAddressData);
          } else {
            console.log('No addresses found or the addresses are null.');
            setAddressData({
              home: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              office: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
              other: { street: '', city: '', state: '', zip_code: '', phone_number: '' },
            });
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

      fetchAddresses();
    }
  }, [itemId]);

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
    e.preventDefault(); // Prevent default form submission behavior

    if (!itemId) {
      alert('Item ID is required to save the address.');
      return;
    }

    try {
      const addressToSave = addressData[selectedTab]; // Use the address data for the selected tab
      // Call the insertTeacherAddress function to save the address for the specific entity
      console.log('Address data to save:', addressToSave);
      console.log('selectedTab data to save:', selectedTab);
      await insertTeacherAddress(itemId, addressToSave, selectedTab);
      alert(`Address saved successfully for ${entityType} ${itemId}`);
      onClose(); // Close the dialog after saving
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address.');
    }
  };

  const renderFormContent = () => {
    const addressPrefix = selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1);
    const currentAddress = addressData[selectedTab]; // Get the address data for the selected tab

    return (
      <div className="space-y-4">
        <Input
          placeholder={`${addressPrefix} Street`}
          name="street"
          value={currentAddress.street}
          onChange={handleInputChange}
          className="mb-4 w-full"
        />
        <Input
          placeholder={`${addressPrefix} City`}
          name="city"
          value={currentAddress.city}
          onChange={handleInputChange}
          className="mb-4 w-full"
        />
        <Input
          placeholder={`${addressPrefix} State`}
          name="state"
          value={currentAddress.state}
          onChange={handleInputChange}
          className="mb-4 w-full"
        />
        <Input
          placeholder={`${addressPrefix} Zip Code`}
          name="zip_code"
          value={currentAddress.zip_code}
          onChange={handleInputChange}
          className="mb-4 w-full"
        />
        <Input
          placeholder={`${addressPrefix} Phone Number`}
          name="phone_number"
          value={currentAddress.phone_number}
          onChange={handleInputChange}
          className="mb-4 w-full"
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Addresses for {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</DialogTitle>
        </DialogHeader>

        <div className="tabs">
          {/* Tab Buttons */}
          <div className="flex space-x-4 mb-4">
            <Button
              variant={selectedTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('home')}
            >
              Home
            </Button>
            <Button
              variant={selectedTab === 'office' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('office')}
            >
              Office
            </Button>
            <Button
              variant={selectedTab === 'other' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('other')}
            >
              Other
            </Button>
          </div>
        </div>

        {/* Updated form with onSubmit handler */}
        <form className="space-y-4 w-full" onSubmit={handleSave}>
          {renderFormContent()}

          <div className="flex justify-between mt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Address</Button> {/* Button type set to "submit" */}
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

