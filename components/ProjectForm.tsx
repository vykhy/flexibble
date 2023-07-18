"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
};

function ProjectForm({ type, session }: Props) {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { token } = await fetchToken();
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChanged("image", result);
    };
  };

  const handleStateChanged = (fieldName: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    category: "",
    liveSiteUrl: "",
  });
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your image"}
        </label>
        <input
          type="file"
          id="image"
          accept="image/"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder={"Flexibble"}
        setState={(value) => handleStateChanged("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder={"Showcase and discover remarkable projects"}
        setState={(value) => handleStateChanged("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder={"https://john.com"}
        setState={(value) => handleStateChanged("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder={"https://github.com/"}
        setState={(value) => handleStateChanged("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChanged("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "./plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

export default ProjectForm;
