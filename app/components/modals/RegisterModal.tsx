'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useState} from "react";
import Modal from "@/app/components/modals/Modal";
import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import Heading from "@/app/components/ui/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/ui/Button";
import toast from "react-hot-toast";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors,}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong!');
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4" >
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input id="email"
                   label="Email"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                   required
            />
            <Input id="name"
                   label="Name"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                   required
            />
            <Input id="password"
                   label="Password"
                   type="password"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                   required
            />
        </div >
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3" >
            <hr />
            <Button outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => console.log('google')}
            />
            <Button outline
                    label="Continue with Github"
                    icon={AiFillGithub}
                    onClick={() => console.log('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light" >
                <p >Already have an account?
                    <span onClick={() => console.log('toggle to sign in')}
                          className="text-neutral-800 cursor-pointer hover:underline" >
                        Log in
                    </span >
                </p >
            </div >
        </div >
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;