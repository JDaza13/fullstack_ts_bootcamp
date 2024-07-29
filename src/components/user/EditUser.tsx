import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

import "./EditUser.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser } from "../../api/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../types";

const EditUser = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (userData: User) => createUser(userData),
  });

  const { data: user, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id ?? ""),
    enabled: !!id,
  });

  const { register, handleSubmit, reset } = useForm<User>();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  const handleSave = (formUserData: User) => {
    setLoading(true);
    mutate(formUserData, {
      onSuccess: (mutationResult) => {
        console.log({ mutationResult });
      },
      onSettled: () => {
        setLoading(false);
        navigate("/");
      },
    });
  };

  return (
    <div className="edit-user-container">
      <Text fontSize="4xl">Edit User</Text>
      <form className="edit-user-form" onSubmit={handleSubmit(handleSave)}>
        <FormControl>
          <FormLabel>E-Mail</FormLabel>
          <Input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Name"
            {...register("profile.name", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Company</FormLabel>
          <Input
            type="text"
            placeholder="Company"
            {...register("profile.company", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <NumberInput>
            <NumberInputField
              type="number"
              placeholder="Age"
              min={18}
              {...register("profile.age", { required: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button
          colorScheme="teal"
          size="lg"
          type="submit"
          isLoading={loading}
          isDisabled={!!id && userDataLoading}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
