import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormError from "../../components/authForm/FormError";
import * as S from "../../components/authForm/AuthForm_Style";
import { useMutation } from "react-query";
import { REGISTER } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RegisterPage() {
  const { mutate: signup } = useMutation(REGISTER);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm();
  const crntPassword = watch("password", "");
  const onFormSubmit = () => {
    const { email, password, name } = getValues();
    const data = {
      email,
      password,
      name,
    };
    signup(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.data.registerSuccess) {
          navigate("/login");
        } else {
          console.log(res.message);
        }
      },
    });
  };
  const checkPassword = (pw) => {
    if (crntPassword !== pw) {
      return "password not confirmed";
    }
  };

  return (
    <S.AuthPageContainer>
      <S.AuthForm>
        <S.FormTitle>SIGN UP</S.FormTitle>
        <S.Separator></S.Separator>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <S.FormInput>
            <S.Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <FormError text={errors.email?.message} />
            <S.Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormError text={errors.password?.message} />

            <S.Input
              id="password_valid"
              type="password"
              placeholder="Confirm password"
              {...register("password_valid", {
                required: "Password confirmation is required",
                validate: checkPassword,
              })}
            />

            <FormError text={errors.password_valid?.message} />
            <S.Input
              id="name"
              type="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormError text={errors.name?.message} />
          </S.FormInput>
          <S.FormBtn type="submit" disabled={isSubmitting}>
            register
          </S.FormBtn>
        </form>
        <S.FormLinkContainer>
          <S.FormLinkDescription>
            Already have an account?
          </S.FormLinkDescription>
          <S.FormLink to="/login">Login</S.FormLink>
        </S.FormLinkContainer>
      </S.AuthForm>
    </S.AuthPageContainer>
  );
}

export default RegisterPage;
