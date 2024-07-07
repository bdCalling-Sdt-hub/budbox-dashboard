/* eslint-disable react/prop-types */
import { FormProvider, useForm } from 'react-hook-form';

const CustomForm = ({
    onSubmit,
    children,
    defaultValues,
    resolver,
}) => {
    const formConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    if (resolver) {
        formConfig['resolver'] = resolver;
    }
    const methods = useForm(formConfig);

    const { handleSubmit } = methods;

    const submit = (data) => {
        onSubmit(data);
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)} className='w-full'>{children}</form>
        </FormProvider>
    );
};

export default CustomForm;
