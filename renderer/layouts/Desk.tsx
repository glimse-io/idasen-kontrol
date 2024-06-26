import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faChevronDown,
  faChevronUp,
  faFloppyDisk,
  faMinus,
  faPowerOff,
  faStop,
  faToggleOff,
  faToggleOn,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useController } from "../components/DeskController/useController";
import { posToCm } from "../components/DeskController/helpers";
import { twMerge } from "tailwind-merge";

export const Desk = () => {
  const {
    state: { device, currentPosition, slots, autoMove, slotSaving },
    actions: { setSlot, removeSlot, toggleAutoMove, setSlotSaving, onDisconnect },
    desk,
  } = useController();
  if (device === null) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-2  max-w-xl w-full mx-auto">
      <div className="flex justify-between items-end">
        <h1 className="text-5xl text-white font-extralight leading-none">
          {posToCm(currentPosition)}
          <small className="font-semibold text-2xl px-1 text-zinc-400">
            CM
          </small>
        </h1>
        <h1 className="text-xl font-light text-blue-500 bg-blue-900/30 px-2 rounded">
          {device.name}
        </h1>
      </div>
      <div className="grid grid-cols-32 gap-2">
        {Array.from(slots).map(([slot, value]) => (
          <Button
            key={`slot-${slot}`}
            className={twMerge(
              "col-span-7 relative",
              slotSaving
                ? "border-indigo-500 animate-pulse"
                : value
                ? "text-white"
                : "",
              "hover:animate-none"
            )}
            onClick={() => {
              if (slotSaving) {
                setSlot(slot);
              } else {
                desk.moveTo(value);
              }
            }}
            disabled={slotSaving ? false : value === null}
          >
            {value ? (
              <button
                className="bg-red-500 text-white absolute top-0 right-0 z-10 h-4 w-4 translate-x-1/2 -translate-y-1/3 rounded-full flex items-center justify-center"
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeSlot(slot);
                }}
              >
                <FontAwesomeIcon icon={faMinus} className="text-[.68rem]" />
              </button>
            ) : null}
            <span
              className={twMerge(
                value && "text-sm font-semibold text-zinc-300"
              )}
            >
              {value ? `${posToCm(value)} CM` : `#${Number(slot) + 1}`}
            </span>
          </Button>
        ))}
        <Button
          className="col-span-4 hover:bg-yellow-900/30 hover:text-yellow-500 hover:ring-yellow-500/25 hover:shadow-yellow-800/20"
          onClick={() => {
            setSlotSaving(!slotSaving);
          }}
        >
          <FontAwesomeIcon icon={slotSaving ? faX : faFloppyDisk} />
        </Button>

        <Button
          className="col-span-6 text-red-500 hover:bg-red-900/30 hover:text-red-500 hover:ring-red-500/25 hover:shadow-red-800/20"
          onClick={() => onDisconnect()}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </Button>
        <Button className="col-span-4" onClick={() => desk.stop()}>
          <FontAwesomeIcon icon={faStop} />
        </Button>
        <Button className="col-span-4" onClick={() => desk.moveUp()}>
          <FontAwesomeIcon icon={faChevronUp} />
        </Button>
        <Button className="col-span-4" onClick={() => desk.moveDown()}>
          <FontAwesomeIcon icon={faChevronDown} />
        </Button>
        <Button className="col-span-4" onClick={() => desk.longMoveUp()}>
          <FontAwesomeIcon icon={faAnglesUp} />
        </Button>
        <Button className="col-span-4" onClick={() => desk.longMoveDown()}>
          <FontAwesomeIcon icon={faAnglesDown} />
        </Button>
        <Button
          className={twMerge(
            "col-span-6 hover:bg-emerald-900/30 hover:text-emerald-500 hover:ring-emerald-500/25 hover:shadow-emerald-800/20",
            autoMove
              ? "bg-emerald-500/25 ring-emerald-500/25 text-white hover:bg-emerald-500/30"
              : ""
          )}
          onClick={() => toggleAutoMove()}
        >
          <FontAwesomeIcon icon={autoMove ? faToggleOn : faToggleOff} />
        </Button>
      </div>
    </div>
  );
};
