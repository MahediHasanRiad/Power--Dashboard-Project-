
function ButtonField({text}: {text: string}) {
  return (
    <button className="bg-[#D4A017] hover:bg-[#B88A14] text-black text-xs font-black uppercase tracking-widest px-10 py-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-[#D4A017]/10">
      {text}
    </button>
  );
}

export default ButtonField;
