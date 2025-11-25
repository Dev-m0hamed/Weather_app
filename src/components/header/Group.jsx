import useUnitsStore from "../../store/useUnitsStore";

function Group({ unit, title, options, selected }) {
  const { units, setUnits } = useUnitsStore();
  return (
    <li className="flex flex-col gap-2">
      <span className="pt-1.5 px-2 text-neutral-300 font-medium text-sm leading-[120%]">
        {title}
      </span>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setUnits({ ...units, [unit]: opt.value})}
            className={`py-2.5 px-2 rounded-lg cursor-pointer font-medium text-[16px] leading-[120%] text-neutral-0 flex items-center justify-between transition duration-300
              ${
                selected === opt.value
                  ? "bg-neutral-700"
                  : "hover:bg-neutral-700"
              }
            `}
          >
            {opt.label}
            {selected === opt.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="11"
                fill="none"
                viewBox="0 0 14 11"
              >
                <path
                  fill="#fff"
                  d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </li>
  );
}

export default Group;
