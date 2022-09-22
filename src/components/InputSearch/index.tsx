import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import {IoIosArrowDown} from 'react-icons/io'

type InputFieldProps = {
    options: any
    valueKey: string
    labelKey: string
    required: UseFormRegister<FieldValues>
    name: string
    id: string
    type?: "search" | "select"
    placeholder?: string
    classInput: string
    classLabel: string
}

export function InputSearch(props: InputFieldProps) {
    const [inputValue, setInputValue] = React.useState('');
    const [focus, setFocus] = React.useState(false);

    const {
        options, labelKey, valueKey, required, name, id, type, placeholder, classInput, classLabel
    } = props;
    const optionsAdpter: any[] = options.map((op: any) => ({ ...op, label: op[labelKey], value: op[valueKey] })).filter((op: any) => op.label.toUpperCase().includes(inputValue.toUpperCase()));
    const optionsAdpterSelect = options.map((op: any) => ({ ...op, label: op[labelKey], value: op[valueKey] }))
    return (
        <div
            onBlur={() => {
                setTimeout(() => {
                    setFocus(false);
                }, 200);
            }}
            className="w-[500px] flex flex-col gap-2"
        >
            <input
                type="text"
                value={type === "select" && inputValue === "" ? '' : inputValue}
                onClick={() => setFocus(!focus)}
                onChange={(e) => {
                    if(type === "search") {
                        setInputValue(e.target.value)
                    }
                }}
                placeholder={placeholder}
                className={classInput ? classInput : `${type === "select" && 'cursor-pointer'} w-full shadow focus:border-gray-3 rounded-lg focus:outline-none text-lg border border-gray-2 p-2`}
            />
            
            {type=== "search"  && focus && optionsAdpter.length !== 0
                && (
                    <div className="flex flex-col gap-1 rounded-lg bg-white text-lg border border-gray-2 overflow-y-auto max-h-[250px]">
                        {optionsAdpter
                            .map((op: any) => (
                                <div key={`${id}_${op.label}`} className="flex flex-col" onClick={() => setInputValue(op.label)}>
                                    <input
                                        id={`${id}_${op.label}`}
                                        type="radio"
                                        {...required(name,
                                            {
                                                onChange: (e) => {
                                                    setFocus(false);
                                                },
                                            })}
                                        value={op.value}
                                        className="hidden"
                                    />
                                    <label className={classLabel ? classLabel : "cursor-pointer text-lg p-2 hover:bg-blue-100"} htmlFor={`${id}_${op.label}`}>{op.label}</label>
                                </div>
                            ))}
                    </div>
                )}
            {type=== "select"  && focus
                && (
                    <div className="flex flex-col gap-1 rounded-lg bg-white text-lg border border-gray-2 overflow-y-auto max-h-[250px]">
                        {optionsAdpterSelect
                            .map((op: any) => (
                                <div key={`${id}_${op.label}`} className="flex flex-col" onClick={() => setInputValue(op.label)}>
                                    <input
                                        id={`${id}_${op.label}`}
                                        type="radio"
                                        {...required(name,
                                            {
                                                onChange: (e) => {
                                                    setFocus(false);
                                                },
                                            })}
                                        value={op.value}
                                        className="hidden"
                                    />
                                    <label className={classLabel ? classLabel : "cursor-pointer text-lg p-2 hover:bg-blue-100"} htmlFor={`${id}_${op.label}`}>{op.label}</label>
                                </div>
                            ))}
                    </div>
                )}
                {
                    type === "select" && 
                <span onClick={() => setFocus(!focus)} className={`cursor-pointer absolute left-[500px] top-[50px] ${focus && 'rotate-180'}`} ><IoIosArrowDown size={30}/></span>
                }
        </div>
    );
}
