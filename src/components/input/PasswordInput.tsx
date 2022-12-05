import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type PasswordInputProps<DataT extends FieldValues> = {
  register: UseFormRegister<DataT>;
  name: Path<DataT>;
  error: FieldError | undefined;
  label: string;
};

const PasswordInput = <DataT extends FieldValues>({
  register,
  name,
  error,
  label,
}: PasswordInputProps<DataT>) => {
  return (
    <div className="profile__form">
      <label>
        <p className="profile__form-name">{label}:</p>
        <input
          type="password"
          className="profile__form-info"
          {...register(name, {
            required: 'Password should not be empty',
            minLength: { value: 3, message: 'enter at least 3 characters' },
          })}
          autoComplete="on"
        ></input>
      </label>
      {error && <p className="profile__form-error">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
