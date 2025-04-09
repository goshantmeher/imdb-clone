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
import { createCelebrityApi } from "@/api/celebrity/celebrityApi";
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

function AddCelebrityForm({
  postSubmit,
  celebrityType,
}: {
  postSubmit?: () => void;
  celebrityType?: string;
}) {
  const [searchParams] = useSearchParams();
  const type = celebrityType || searchParams.get("type");
  const formSchema = CelebrityFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      bio: "",
      roles: [],
      avatar: "",
      images: [],
    },
  });

  const addCelebrityAction = async (
    _prevState: unknown,
    data: z.infer<typeof formSchema>
  ) => {
    const { avatar, bio, dob, name, roles, images } = data;
    const result = await createCelebrityApi({
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
      toast.success(`${type} added successfully`);
      if (postSubmit) {
        postSubmit();
      }
    }

    return {
      errors: initialFormState,
    };
  };

  const [state, formAction, pending] = useActionState(addCelebrityAction, {
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

  return (
    <>
      <div className="grid gap-4 py-4 w-full ">
        <Form {...form}>
          <form>
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
                      <Input
                        placeholder={`Enter date of Birth 1965-10-19`}
                        {...field}
                      />
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
                    <FormLabel>Avatar Url (Optional)</FormLabel>
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
                  <p className="text-red-500">{state.errors.error}</p>
                )}
              </FormMessage>
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
                className="w-full bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800"
                disabled={pending}
              >
                {!pending && "Add"}
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

export default AddCelebrityForm;
