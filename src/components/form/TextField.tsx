type TextFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
};

const TextField = ({
  label,
  value,
  placeholder,
  onChange,
  ...rest
}: TextFieldProps) => {
  return (
    <div className="py-2 px-6 pb-4 flex flex-col">
      <label htmlFor={placeholder} className="text-sm py-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        className="border-2 border-black w-full rounded-sm py-2 px-1 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
        {...rest}
      />
    </div>
  );
};

export default TextField;
