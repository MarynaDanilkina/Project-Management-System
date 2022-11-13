import { UserUpDate } from 'interface/interface';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type TextInputProps = {
  register: UseFormRegister<UserUpDate>;
  name: keyof UserUpDate;
  error: FieldError | undefined;
  label: string;
  type?: string;
};

const TextInput = ({ register, name, error, label, type = 'text' }: TextInputProps) => {
  return (
    <div className="profile__form">
      <label>
        <p className="profile__form-name">{label}:</p>
        <input
          type={type}
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
