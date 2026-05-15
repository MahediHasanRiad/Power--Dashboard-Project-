interface InputType {
  label: string;
  placeholder: string;
  readonly?: boolean;
}

export function InputField({label, placeholder, readonly = false}: InputType) {
  return (
    <section className="my-2">
      <label
        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${readonly == true ? 'text-gray-700' : 'text-secondary-text-0'}`}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={label}
        type="text"
        readOnly= {readonly}
        placeholder={placeholder}
        className="w-full bg-card-bg-0 border mt-2 border-card-bg-0 border-white rounded-lg px-4 py-4 text-white text-sm focus:outline-none focus:border-[#D4A017]/50 transition-colors"
      />
    </section>
  );
}


