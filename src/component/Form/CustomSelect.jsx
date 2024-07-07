/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";

const CustomSelect = ({
    name,
    options,
    label,
    required,
    placeholder,
}) => {
    return (
        <div style={{ marginBottom: "10px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <label htmlFor={name}>
                            {label} {required && <span className="text-rose-500 ">*</span>}
                        </label>
                        <select
                            {...field}
                            id={name}
                            className={`w-full px-3 py-2 border border-gray-400 rounded-[2px] outline-none mt-2 ${error ? "focus:border-rose-500" : "focus:border-[#144982]"
                                }`}
                        >
                            <option value="">
                                {placeholder}
                            </option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {error && (
                            <span className="text-rose-600 text-start">{error.message}</span>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default CustomSelect;
