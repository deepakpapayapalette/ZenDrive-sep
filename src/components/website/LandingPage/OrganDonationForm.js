import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlertCircle, Upload } from 'lucide-react';
import { MenuItem, Select, TextField } from '@mui/material';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  guardianName: Yup.string().required('Guardian Name is required'),
  relation: Yup.string().required('Relation is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  address: Yup.string().required('Address is required'),
  organSelection: Yup.string().required('Please select organ(s) to donate'),
  pledgeDate: Yup.date().required('Date is required'),
  correspondenceAddress: Yup.string().required('Address for correspondence is required'),
  telephoneNo: Yup.string().required('Telephone Number is required').matches(/^[0-9]{10}$/, 'Must be 10 digits'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  witness1FullName: Yup.string().required('Witness 1 Full Name is required'),
  witness1GuardianName: Yup.string().required('Witness 1 Guardian Name is required'),
  witness1Relation: Yup.string().required('Witness 1 Relation is required'),
  witness1DateOfBirth: Yup.date().required('Witness 1 Date of Birth is required'),
  witness1Address: Yup.string().required('Witness 1 Address is required'),
  witness1MobileNo: Yup.string().required('Witness 1 Mobile Number is required').matches(/^[0-9]{10}$/, 'Must be 10 digits'),
  witness1Email: Yup.string().email('Invalid email').required('Witness 1 Email is required'),
  witness2FullName: Yup.string().required('Witness 2 Full Name is required'),
  witness2GuardianName: Yup.string().required('Witness 2 Guardian Name is required'),
  witness2Relation: Yup.string().required('Witness 2 Relation is required'),
  witness2DateOfBirth: Yup.date().required('Witness 2 Date of Birth is required'),
  witness2Address: Yup.string().required('Witness 2 Address is required'),
  witness2MobileNo: Yup.string().required('Witness 2 Mobile Number is required').matches(/^[0-9]{10}$/, 'Must be 10 digits'),
  witness2Email: Yup.string().email('Invalid email').required('Witness 2 Email is required'),
  place: Yup.string().required('Place is required'),
  date: Yup.date().required('Date is required'),
});

const InputField = ({ label, name, type = 'text', placeholder = '', formik }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <div className="flex flex-col">
      <label className="text-md font-medium text-gray-700 mb-1">{label}</label>
      <TextField

        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`max-w-full px-3 border rounded-md focus:outline-none  focus:ring-primary ${hasError ? 'border-red-500' : 'border-gray-500 p-0'
          }`}

        sx={{

          '& .MuiInputBase-input': { padding: "12px 10px", },
        }}
      />
      {hasError && (
        <span className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {formik.errors[name]}
        </span>
      )}
    </div>
  );
};

const SelectField = ({ label, name, options, formik }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <div className="flex flex-col">
      <label className="text-md font-medium text-gray-700 mb-1">{label}</label>
      <Select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`px-3 max-h-[47px]  border rounded-md focus:outline-none  ${hasError ? 'border-red-500' : 'border-gray-500'
          }`}

        sx={{

          '& .MuiInputBase-input': { padding: "12px 10px" },
        }}
      >
        <MenuItem value="">Choose</MenuItem >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && (
        <span className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {formik.errors[name]}
        </span>
      )}
    </div>
  );
};

export default function OrganDonationForm() {
  const [signatureFile, setSignatureFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      guardianName: '',
      relation: '',
      dateOfBirth: '',
      address: '',
      organSelection: '',
      anyOtherOrgan: '',
      anyIllness: '',
      bloodGroup: '',
      pledgeDate: '',
      correspondenceAddress: '',
      telephoneNo: '',
      email: '',
      witness1FullName: '',
      witness1GuardianName: '',
      witness1Relation: '',
      witness1DateOfBirth: '',
      witness1Address: '',
      witness1MobileNo: '',
      witness1Email: '',
      witness2FullName: '',
      witness2GuardianName: '',
      witness2Relation: '',
      witness2DateOfBirth: '',
      witness2Address: '',
      witness2MobileNo: '',
      witness2Email: '',
      place: '',
      date: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Data:', values);
      console.log('Signature File:', signatureFile);
      alert('Pledge form submitted successfully!');
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignatureFile(file);
    }
  };

  const relationOptions = [
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Other', label: 'Other' },
  ];

  const witnessRelationOptions = [
    { value: 'Friend', label: 'Friend' },
    { value: 'Family', label: 'Family' },
    { value: 'Colleague', label: 'Colleague' },
    { value: 'Other', label: 'Other' },
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const hasOrganError = formik.touched.organSelection && formik.errors.organSelection;

  return (
    <div className="lg:my-10 my-5">
      <div className="container mx-auto bg-white ">
        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-gray-800 mb-1">FORM 7</h1>
          <h2 className="text-lg font-semibold text-gray-800">FOR ORGAN(S) PLEDGING</h2>
          <p className="text-md text-gray-800 font-semibold">(To be filled by individual of age 18 year or above)</p>
          <p className="text-sm text-gray-800 font-semibold mt-1 leading-[1.6]">
            [Refer rule 5(4)(a)]<br />
            ORGAN(S) DONOR FORM<br />
            (To be filled in triplicate)
          </p>
        </div>

        <div onSubmit={formik.handleSubmit}>
          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Full Name" placeholder="Full Name" name="fullName" formik={formik} />
              <InputField label="Guardian Name" name="guardianName" placeholder="Guardian Name" formik={formik} />
              <SelectField label="Relation" name="relation" options={relationOptions} formik={formik} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <InputField label="Enter Your Date Of Birth" name="dateOfBirth" type="date" formik={formik} />
              <InputField label="Enter Your Full Address" name="address" placeholder="Enter Your Full Address" formik={formik} />
            </div>
          </div>

          {/* Authorization Statement */}
          <div className=" px-4  mb-4">
            <p className="text-md font-medium text-gray-700">
              In the presence of persons mentioned below hereby unequivocally authorise the removal of following organ(s) and/or
              tissue(s), from my body after being declared brain stem dead by the board of medical experts and consent to donate the
              same for therapeutic purposes.
            </p>
          </div>

          {/* Organ Selection */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <label className="text-md font-semibold text-primary mb-2 block">Please Choose as applicable</label>
              <div className="flex flex-wrap gap-4">
                {['Heart', 'Lungs', 'Kidneys', 'Liver', 'Pancreas', 'All'].map((organ) => (
                  <label key={organ} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="organSelection"
                      value={organ}
                      checked={formik.values.organSelection === organ}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm semibold text-gray-700">{organ}</span>
                  </label>
                ))}
              </div>
              {hasOrganError && (
                <span className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {formik.errors.organSelection}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Any Other Organ(Pl. specify)" name="anyOtherOrgan" placeholder="Organ Name" formik={formik} />
              <InputField label="Any Illness(Pl. specify)" name="anyIllness" placeholder="Illness Name" formik={formik} />
              <SelectField label="Blood group is (if known)" name="bloodGroup" options={bloodGroupOptions} formik={formik} />
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-md font-semibold text-primary mb-4">Signature of Pledge</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <InputField label="Dated" name="pledgeDate" type="date" formik={formik} />
              <div className="flex flex-col col-span-2">
                <label className="text-md font-medium text-gray-700 mb-1">Upload Signature</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="signature-upload"
                  />
                  <label htmlFor="signature-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <span className="text-sm text-gray-600 hover:text-primary">Upload a Signature of Pledge</span>
                  </label>
                  {signatureFile && (
                    <p className="text-xs text-gray-600 mt-2">{signatureFile.name}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Address for correspondence" name="correspondenceAddress" placeholder="Address for correspondence" formik={formik} />
              <InputField label="Mobile No" name="telephoneNo" placeholder="Mobile No" formik={formik} />
              <InputField label="Email" placeholder="Email" name="email" type="email" formik={formik} />
            </div>
          </div>

          {/* Note */}
          <div className=" px-4  mb-6">
            <p className="text-md text-gray-800 semibold">
              <strong>Note:</strong> In case of online registration of pledge, one copy of the pledge will be retained by pledger, one by the institution where
              pledge is made and a hard copy signed by pledger and two witnesses shall be sent to the nodal networking organisation.
            </p>
          </div>

          {/* Witness 1 */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-md font-semibold text-primary mb-4">(Signature of Witness 1)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <InputField label="Full Name" placeholder="Full Name" name="witness1FullName" formik={formik} />
              <InputField label="Guardian Name" name="witness1GuardianName" placeholder="Guardian Name" formik={formik} />
              <SelectField label="Relation" name="witness1Relation" options={witnessRelationOptions} formik={formik} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Enter Your Date Of Birth" name="witness1DateOfBirth" type="date" formik={formik} />
              <InputField label="Enter Your Full Address" name="witness1Address" placeholder="Enter Your Full Address" formik={formik} />
              <InputField label="Mobile No" name="witness1MobileNo" placeholder="Mobile No" formik={formik} />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Email ID" name="witness1Email" type="email" placeholder="Email" formik={formik} />
            </div>
          </div>

          {/* Witness 2 */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-md font-semibold text-primary mb-4">(Signature of Witness 2)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <InputField label="Full Name " placeholder="Full Name" name="witness2FullName" formik={formik} />
              <InputField label="Guardian Name" name="witness2GuardianName" placeholder="Guardian Name" formik={formik} />
              <SelectField label="Relation" name="witness2Relation" options={witnessRelationOptions} formik={formik} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Enter Your Date Of Birth" name="witness2DateOfBirth" type="date" formik={formik} />
              <InputField label="Enter Your Full Address" name="witness2Address" placeholder="Enter Your Full Address" formik={formik} />
              <InputField label="Mobile No" name="witness2MobileNo" placeholder="Mobile No" formik={formik} />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Email ID" name="witness2Email" type="email" placeholder="Email" formik={formik} />
            </div>
          </div>

          {/* Final Details */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Date" name="date" type="date" formik={formik} />
              <InputField label="Place" name="place" placeholder="Place" formik={formik} />
            </div>
          </div>

          {/* Important Notes */}
          <div className=" px-4 rounded-lg mb-6">
            <h4 className="text-md font-bold text-primary mb-2">Note:</h4>
            <p className="text-sm text-gray-700 mb-2">
              (i) Organ donation is a family decision. Therefore, it is important that you discuss your decision with family members and loved
              ones so that it will be easier for them to follow through with your wishes.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              (ii) One copy of the pledge form/pledge card to be with respective networking organisation, one copy to be retained by
              institution where the pledge is made and one copy to be handed over to the pledger.
            </p>
            <p className="text-sm text-gray-700">
              (iii) The person making the pledge has the option to withdraw the pledge.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="bg-primary hover:bg-[var(--primary2)] text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Complete Your Pledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
