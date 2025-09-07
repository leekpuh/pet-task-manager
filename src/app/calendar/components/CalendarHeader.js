import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/react";

export default function CalendarHeader({
    year,
    setYear,
    month,
    incrementMonth,
    decrementMonth,
    currentDate,
}) {
    const getYearList = () => {
        let arr = [];
        for (
            let i = currentDate.getFullYear() - 20;
            i <= currentDate.getFullYear() + 20;
            i++
        ) {
            arr.push(i);
        }
        return arr;
    };
    const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const yearsList = getYearList();

    return (
        <div className="flex justify-between">
            <div className="flex px-10 my-5 gap-5">
                <Listbox value={year} onChange={setYear}>
                    <ListboxButton className="bg-gray-100 w-25 text-lg rounded-lg text-center p-1 outline-none cursor-pointer border-r-2 border-b-2 border-gray-300 hover:bg-gray-200">
                        {year}
                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom"
                        transition
                        className="bg-gray-100 w-25 rounded-lg text-center outline-none mt-2 shadow-2xl h-55
                                    transition duration-200 ease-in data-leave:data-closed:opacity-0"
                    >
                        {yearsList.map((item, idx) => (
                            <ListboxOption
                                key={idx}
                                value={item}
                                className="mt-2 cursor-pointer rounded-lg text-lg data-focus:bg-gray-300"
                            >
                                {item}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center self-center text-lg bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200/75 size-10 border-r-2 border-b-2 border-gray-300 "
                        onClick={decrementMonth}
                    >
                        {"<"}
                    </button>
                    <div className="flex items-center justify-center text-lg border-r-2 border-b-2 border-gray-300 p-1 bg-blue-100 rounded-xl px-5 w-35">
                        {monthNames[month]}
                    </div>

                    <button
                        className="flex items-center justify-center self-center text-lg  bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200/75 size-10 border-r-2 border-b-2 border-gray-300 "
                        onClick={incrementMonth}
                    >
                        {">"}
                    </button>
                </div>
            </div>
          
        </div>
    );
}
