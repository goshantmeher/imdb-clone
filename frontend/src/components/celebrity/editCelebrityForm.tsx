import { Input } from "../ui/input";
import { CelebrityFormSchema } from "@/utils/schemas/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { startTransition, useActionState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { updateCelebrityApi } from "@/api/celebrity/celebrityApi";
import { useSearchParams } from "react-router";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import MultipleSelector, { Option } from "../ui/multiple-selector";

const initialFormState = {
  error: null,
  name: null,
  bio: null,
  roles: null,
  avatar: null,
  images: null,
  dob: null,
};

interface IEditCelebrityFormProps {
  postSubmit: () => void;
  existingData: {
    _id: string;
    name: string;
    dob: string;
    bio: string;
    roles: string[];
    avatar: string;
    images: string[];
  };
}

function EditCelebrityForm({
  postSubmit,
  existingData,
}: IEditCelebrityFormProps) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const formSchema = CelebrityFormSchema();
  const dob = new Date(existingData.dob);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...existingData,
      dob: `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dob.getDate()).padStart(2, "0")}`,
    },
  });

  const editCelebrityAction = async (
    _prevState: unknown,
    data: z.infer<typeof formSchema>
  ) => {
    const { avatar, bio, dob, name, roles, images } = data;
    const result = await updateCelebrityApi(existingData?._id as string, {
      avatar,
      bio,
      dob,
      name,
      roles,
      images: images || [],
    });
    if (!result.success && result.status !== 200) {
      return {
        errors: {
          ...initialFormState,
          error: result.message,
        },
      };
    }
    if (result.success) {
      form.reset();
      toast.success(`${type} edit successfully`);
      if (postSubmit) {
        postSubmit();
      }
    }

    return {
      errors: initialFormState,
    };
  };

  const [state, formAction, pending] = useActionState(editCelebrityAction, {
    errors: initialFormState,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      formAction(data);
    });
  };

  const OPTIONS: Option[] = CELEBRITY_TYPES.map(
    (type) =>
      ({
        label: type,
        value: type,
      } as Option)
  );

  const selectedRolesOptions = OPTIONS.filter((option) => {
    return existingData.roles.includes(option.value);
  });

  return (
    <>
      <div className="grid gap-4 py-4  w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={`Name of the ${type}`} {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter date of Birth`} {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder={`Bio`} {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>

                    <MultipleSelector
                      options={OPTIONS}
                      defaultOptions={OPTIONS}
                      onChange={(options: Option[]) => {
                        field.onChange(options.map((option) => option.value));
                      }}
                      value={selectedRolesOptions}
                      placeholder="Select Celebrity Role"
                      hidePlaceholderWhenSelected
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar Url</FormLabel>
                    <FormControl>
                      <Input placeholder={`Provide an avatar Url`} {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar Url</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Provide images with (,) separated`}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormMessage>
                {!pending && state.errors && state.errors.error && (
                  <span className="text-red-500">{state.errors.error}</span>
                )}
              </FormMessage>
              <Button
                type="submit"
                className="w-full bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800"
                disabled={pending}
              >
                {!pending && "Update"}
                {pending && (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default EditCelebrityForm;
