/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
const CustomInput = ({
    type,
    name,
    label,
    required,
    placeholder,
}) => {
    return (
        <div style={{ marginBottom: "10px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <div>
                        <label htmlFor={name}>
                            {label} {required && <span className="text-rose-500 ">*</span>}
                        </label>
                        <input
                            {...field}
                            type={type}
                            id={name}
                            className={`w-full  px-3 py-2 border border-gray-400 rounded-[2px] outline-none mt-2 ${error ? "focus:border-rose-500" : "focus:border-[#144982]"
                                }`}
                            placeholder={placeholder}
                        />
                        {error && (
                            <span className="text-rose-600 text-start">{error.message}</span>
                        )}
                    </div>
                )
                }
            />
        </div >
    );
};

export default CustomInput;