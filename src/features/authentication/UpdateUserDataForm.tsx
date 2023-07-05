import React, { useEffect, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDataForm = () => {
  const { user } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.fullName);
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (avatar !== null) updateUser({ fullName, avatar });
  };

  const handleCancel = () => {
    if (user) {
      setFullName(user.user_metadata.fullName);
    }
    setAvatar(null);
  };

  if (!user) {
    return null; // Handle the case when user is not available
  }

  return (
    <Form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
      <FormRow label="Email address">
        <Input id="email" disabled={true} value={email} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setFullName(target.value);
          }}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            if (!target || !target.files) return null;
            setAvatar(target?.files[0]);
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
