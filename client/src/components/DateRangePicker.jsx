import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/data";
import { toKey, fromKey, daysBetween } from "../utils/dates";

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const formatLabel = (key) =>
  key
    ? fromKey(key).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : null;

const DateRangePicker = ({ pickUp, dropOff, onChange, variant = "card" }) => {
  const todayKey = toKey(new Date());
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("pickUp"); // which field the next click fills
  const [hovered, setHovered] = useState(null);
  const [month, setMonth] = useState(() => {
    const base = pickUp ? fromKey(pickUp) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openFor = (field) => {
    setActive(field === "dropOff" && !pickUp ? "pickUp" : field);
    setOpen(true);
  };

  const selectDay = (key) => {
    if (active === "pickUp" || !pickUp || key < pickUp) {
      onChange({ pickUp: key, dropOff: dropOff && dropOff > key ? dropOff : null });
      setActive("dropOff");
    } else {
      onChange({ pickUp, dropOff: key === pickUp ? null : key });
      if (key !== pickUp) setOpen(false);
    }
  };

  // Build a Monday-first grid for the visible month
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toKey(new Date(month.getFullYear(), month.getMonth(), i + 1))),
  ];
  const rangeEnd = dropOff || (active === "dropOff" && pickUp && hovered > pickUp ? hovered : null);
  const isPrevDisabled = toKey(new Date(month.getFullYear(), month.getMonth(), 0)) < todayKey;
  const nights = daysBetween(pickUp, dropOff);

  const field = (name, label, value) => {
    const isActive = open && active === name;
    return (
      <button
        type="button"
        onClick={() => openFor(name)}
        className={`flex flex-col items-start w-full text-left rounded-xl px-4 py-2.5 transition border ${
          isActive ? "border-solid bg-white ring-4 ring-solid/10" : "border-transparent bg-white hover:border-solid/30"
        } ${variant === "hero" ? "!bg-primary" : ""}`}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-50">
          <img src={assets.calendar} alt="" width={14} /> {label}
        </span>
        <span className={`mt-0.5 text-sm font-semibold ${value ? "text-black" : "text-slate-400"}`}>
          {formatLabel(value) || "Add date"}
        </span>
      </button>
    );
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="grid grid-cols-2 gap-3">
        {field("pickUp", "Pick Up", pickUp)}
        {field("dropOff", "Drop Off", dropOff)}
      </div>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-[320px] max-w-[calc(100vw-2rem)] card !shadow-lift p-4 fade-up">
          {/* Month navigation */}
          <div className="flexBetween mb-3">
            <button
              type="button"
              disabled={isPrevDisabled}
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              className="h-8 w-8 flexCenter rounded-full hover:bg-primaryOne disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous month"
            >
              ‹
            </button>
            <h5 className="text-sm">
              {month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </h5>
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              className="h-8 w-8 flexCenter rounded-full hover:bg-primaryOne cursor-pointer"
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <p className="text-xs text-center mb-2 font-semibold text-solid">
            {active === "pickUp" ? "Select pick-up date" : "Select drop-off date"}
          </p>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {WEEK_DAYS.map((d) => (
              <span key={d} className="text-[11px] font-bold text-slate-400 py-1">{d}</span>
            ))}
            {cells.map((key, i) => {
              if (!key) return <span key={`e${i}`} />;
              const disabled = key < todayKey;
              const isStart = key === pickUp;
              const isEnd = key === rangeEnd;
              const inRange = pickUp && rangeEnd && key > pickUp && key < rangeEnd;
              return (
                <div
                  key={key}
                  className={`relative ${inRange ? "bg-primaryOne" : ""} ${
                    isStart && rangeEnd ? "bg-gradient-to-r from-transparent from-50% to-primaryOne to-50%" : ""
                  } ${isEnd && pickUp ? "bg-gradient-to-l from-transparent from-50% to-primaryOne to-50%" : ""}`}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => selectDay(key)}
                    onMouseEnter={() => setHovered(key)}
                    className={`h-9 w-9 mx-auto flexCenter rounded-full text-sm font-semibold transition ${
                      isStart || isEnd
                        ? "bg-solid text-white shadow-md shadow-solid/30"
                        : disabled
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-textColor hover:bg-solid/10 cursor-pointer"
                    } ${key === todayKey && !isStart && !isEnd ? "ring-1 ring-solid/40" : ""}`}
                  >
                    {fromKey(key).getDate()}
                  </button>
                </div>
              );
            })}
          </div>
          {/* Footer */}
          <div className="flexBetween mt-4 pt-3 border-t border-slate-900/5">
            <p className="text-xs font-semibold">
              {nights ? `${nights} day${nights > 1 ? "s" : ""} selected` : "Choose your dates"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { onChange({ pickUp: null, dropOff: null }); setActive("pickUp"); }}
                className="text-xs font-semibold text-gray-50 hover:text-black px-2 cursor-pointer"
              >
                Clear
              </button>
              <button type="button" onClick={() => setOpen(false)} className="btn-solid !py-1.5 !px-4 !text-xs">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
