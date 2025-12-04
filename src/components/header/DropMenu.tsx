import { motion } from "motion/react";
import { Fragment } from "react";
import Group from "./Group";
import type { Units } from "../../store/useUnitsStore";
import useUnitsStore from "../../store/useUnitsStore";

function Dropdown() {
  const metric: Units = { temp: "C", speed: "kmh", precipitation: "mm" };
  const imperial: Units = { temp: "F", speed: "mph", precipitation: "inch" };

  const unitSetting: {
    key: keyof Units;
    title: string;
    options: { label: string; value: Units[keyof Units] }[];
  }[] = [
    {
      key: "temp",
      title: "Wind Temperature",
      options: [
        { label: "Celsius (°C)", value: "C" },
        { label: "Fahrenheit (°F)", value: "F" },
      ],
    },
    {
      key: "speed",
      title: "Wind Speed",
      options: [
        { label: "km/h", value: "kmh" },
        { label: "mph", value: "mph" },
      ],
    },
    {
      key: "precipitation",
      title: "Precipitation",
      options: [
        { label: "Millimeters (mm)", value: "mm" },
        { label: "Inches (in)", value: "inch" },
      ],
    },
  ];

  const { units, setUnits } = useUnitsStore();

  const isMetric =
    units.temp === "C" && units.speed === "kmh" && units.precipitation === "mm";

  return (
    <motion.ul
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute right-0 top-full translate-y-2 z-50 py-1.5 px-2 cursor-default flex flex-col gap-1 rounded-xl bg-neutral-800 border border-neutral-600 w-[214px]"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <li>
        <button
          className="py-2.5 px-2 text-neutral-0 rounded-lg cursor-pointer font-medium text-[16px] leading-[120%] w-full text-left hover:bg-neutral-700 transition duration-300"
          onClick={() => setUnits(isMetric ? imperial : metric)}
        >
          {isMetric ? "Switch to Imperial" : "Switch to Metric"}
        </button>
      </li>
      {unitSetting.map((unit, i) => (
        <Fragment key={unit.key}>
          <Group
            unit={unit.key}
            title={unit.title}
            options={unit.options}
            selected={units[unit.key]}
          />
          {i < unitSetting.length - 1 && (
            <hr className="text-neutral-600 h-px" />
          )}
        </Fragment>
      ))}
    </motion.ul>
  );
}

export default Dropdown;
