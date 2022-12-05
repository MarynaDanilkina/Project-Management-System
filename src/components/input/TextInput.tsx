import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<DataT extends FieldValues> = {
  register: UseFormRegister<DataT>;
  name: Path<DataT>;
  error: FieldError | undefined;
  label: string;
  type?: string;
  defaultValue?: string;
};

const TextInput = <DataT extends FieldValues>({
  register,
  name,
  error,
  label,
  defaultValue,
  type = 'text',
}: TextInputProps<DataT>) => {
  return (
    <div className="profile__form">
      <label>
        <p className="profile__form-name">{label}:</p>
        <input
          type={type}
          defaultValue={defaultValue}
          id={`${name}-input`}
          className="profile__form-info"
          {...register(name, {
            required: `${name} should not be empty`,
            minLength: { value: 3, message: 'enter at least 3 characters' },
          })}
        ></input>
      </label>
      {error && <p className="profile__form-error">{error.message}</p>}
    </div>
  );
};

export default TextInput;
