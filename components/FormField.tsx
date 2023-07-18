import React from "react";

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder?: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

function FormField({
  type,
  title,
  placeholder,
  state,
  isTextArea,
  setState,
}: Props) {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="title" className="w-full text-gray-100">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required={true}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        ></textarea>
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required={true}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
}

export default FormField;
