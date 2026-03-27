import React, { useState } from "react";

const TITLES = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const MARITAL = ["Single", "Married", "Divorced", "Widowed"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

function Field({ label, required, children }) {
  return (
    <div className="profile-field">
      <label className="profile-field__label">
        {label}{required && <span className="profile-required" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, disabled, type = "text", ...rest }) {
  return (
    <input
      type={type}
      className="profile-input"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...rest}
    />
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select className="profile-select" value={value || ""} onChange={onChange}>
      <option value="">{placeholder || "Select..."}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function AddressBlock({ values, onChange, label }) {
  const handle = (field) => (e) => onChange({ ...values, [field]: e.target.value });
  return (
    <div className="profile-address-block">
      <h4 className="profile-address-title">{label}</h4>
      <div className="profile-grid-2">
        <Field label="Address Line 1">
          <TextInput value={values?.line1} onChange={handle("line1")} placeholder="Street address" />
        </Field>
        <Field label="Address Line 2">
          <TextInput value={values?.line2} onChange={handle("line2")} placeholder="Apt, suite, etc." />
        </Field>
        <Field label="City">
          <TextInput value={values?.city} onChange={handle("city")} placeholder="City" />
        </Field>
        <Field label="State">
          <TextInput value={values?.state} onChange={handle("state")} placeholder="State" />
        </Field>
        <Field label="Country">
          <TextInput value={values?.country} onChange={handle("country")} placeholder="Country" />
        </Field>
        <Field label="Pincode">
          <TextInput value={values?.pincode} onChange={handle("pincode")} placeholder="Pincode" />
        </Field>
      </div>
    </div>
  );
}

export default function StepPersonal({ data, onChange, errors = {} }) {
  const [sameAddress, setSameAddress] = useState(false);
  const set = (field) => (e) => onChange({ [field]: e.target.value });
  const setNested = (field) => (val) => onChange({ [field]: val });

  const handleSameAddress = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      onChange({ permanentAddress: { ...data.presentAddress } });
    }
  };

  return (
    <div className="profile-step">
      <h3 className="profile-step__title">Personal Information</h3>

      <section className="profile-section">
        <h4 className="profile-section__heading">Basic Details</h4>
        <div className="profile-grid-4">
          <Field label="Title">
            <Select value={data.title} onChange={set("title")} options={TITLES} />
          </Field>
          <Field label="First Name" required>
            <TextInput value={data.firstName} onChange={set("firstName")} placeholder="First name" />
            {errors.firstName && <span className="profile-error">{errors.firstName}</span>}
          </Field>
          <Field label="Middle Name">
            <TextInput value={data.middleName} onChange={set("middleName")} placeholder="Middle name" />
          </Field>
          <Field label="Last Name" required>
            <TextInput value={data.lastName} onChange={set("lastName")} placeholder="Last name" />
            {errors.lastName && <span className="profile-error">{errors.lastName}</span>}
          </Field>
        </div>
        <div className="profile-grid-3">
          <Field label="Date of Birth">
            <TextInput type="date" value={data.dob} onChange={set("dob")} />
          </Field>
          <Field label="Gender">
            <Select value={data.gender} onChange={set("gender")} options={GENDERS} />
          </Field>
          <Field label="Nationality">
            <TextInput value={data.nationality} onChange={set("nationality")} placeholder="e.g. Indian" />
          </Field>
          <Field label="Marital Status">
            <Select value={data.maritalStatus} onChange={set("maritalStatus")} options={MARITAL} />
          </Field>
          <Field label="Physically Challenged">
            <Select value={data.physicallyChallenged} onChange={set("physicallyChallenged")} options={["No", "Yes"]} />
          </Field>
          <Field label="Blood Group">
            <Select value={data.bloodGroup} onChange={set("bloodGroup")} options={BLOOD_GROUPS} />
          </Field>
        </div>
      </section>

      <section className="profile-section">
        <h4 className="profile-section__heading">Contact</h4>
        <div className="profile-grid-2">
          <Field label="Email">
            <TextInput value={data.email} disabled />
          </Field>
          <Field label="Mobile (Primary)" required>
            <TextInput type="tel" value={data.mobilePrimary} onChange={set("mobilePrimary")} placeholder="+91 XXXXX XXXXX" />
            {errors.mobilePrimary && <span className="profile-error">{errors.mobilePrimary}</span>}
          </Field>
          <Field label="Mobile (Alternate)">
            <TextInput type="tel" value={data.mobileAlternate} onChange={set("mobileAlternate")} placeholder="+91 XXXXX XXXXX" />
          </Field>
        </div>
      </section>

      <section className="profile-section">
        <AddressBlock
          label="Present Address"
          values={data.presentAddress}
          onChange={setNested("presentAddress")}
        />
        <label className="profile-checkbox-label">
          <input type="checkbox" checked={sameAddress} onChange={handleSameAddress} />
          <span>Permanent address same as present address</span>
        </label>
        {!sameAddress && (
          <AddressBlock
            label="Permanent Address"
            values={data.permanentAddress}
            onChange={setNested("permanentAddress")}
          />
        )}
      </section>

      <section className="profile-section">
        <h4 className="profile-section__heading">Social Media</h4>
        <div className="profile-grid-2">
          <Field label="LinkedIn URL">
            <TextInput value={data.socialMedia?.linkedin} onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/..." />
          </Field>
          <Field label="GitHub URL">
            <TextInput value={data.socialMedia?.github} onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, github: e.target.value } })} placeholder="https://github.com/..." />
          </Field>
          <Field label="Portfolio URL">
            <TextInput value={data.socialMedia?.portfolio} onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, portfolio: e.target.value } })} placeholder="https://yourportfolio.com" />
          </Field>
        </div>
      </section>
    </div>
  );
}
