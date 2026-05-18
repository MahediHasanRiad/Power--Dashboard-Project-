interface ButtonFieldType {
    handleSubmit: any;
    text: string;
}

function ButtonField({handleSubmit, text}: ButtonFieldType) {
  return (
    <button
      onClick={handleSubmit}
      className="bg-secondary-0 hover:bg-secondary-0 text-black text-[12px] px-2 py-1.5 md:text-sm font-bold md:px-8 md:py-3 rounded-lg transition-transform active:scale-95"
    >
      {text}
    </button>
  );
}

export default ButtonField;
