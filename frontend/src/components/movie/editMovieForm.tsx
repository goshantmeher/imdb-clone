import { Input } from "../ui/input";
import { MovieFormSchema } from "@/utils/schemas/schema";
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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { updateMovieApi } from "@/api/movie/movieApi";
import { getCelebritiesApi } from "@/api/celebrity/celebrityApi";
import { AddCelebrityDialog } from "../celebrity/addCelebrityDialog";
import { ICelebritySearchObject, IMovie } from "@/model/types";

const initialFormState = {
  error: null,
  name: null,
  actor_ids: null,
  avatar: null,
  images: null,
  plot: null,
  producer_id: null,
  year_of_release: null,
};

interface IEditMovieFormProps {
  existingData: IMovie;
  movieActorList: ICelebritySearchObject[];
  movieProducerList: ICelebritySearchObject[];
  postSubmit?: () => void;
}

function EditMovieForm({
  postSubmit,
  existingData,
  movieActorList,
  movieProducerList,
}: IEditMovieFormProps) {
  const formSchema = MovieFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...existingData,
      images: existingData.images || [],
      year_of_release: String(existingData.year_of_release),
    },
  });

  const editMovieAction = async (
    _prevState: unknown,
    data: z.infer<typeof formSchema>
  ) => {
    const {
      actor_ids,
      avatar,
      name,
      plot,
      producer_id,
      year_of_release,
      images,
    } = data;
    const result = await updateMovieApi(existingData._id, {
      name,
      year_of_release: year_of_release
        ? Number(`${year_of_release}`)
        : undefined,
      producer_id,
      actor_ids,
      plot,
      avatar,
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
      toast.success(`Movie updated successfully`);
      if (postSubmit) {
        postSubmit();
      }
    }

    return {
      errors: initialFormState,
    };
  };

  const [state, formAction, pending] = useActionState(editMovieAction, {
    errors: initialFormState,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      formAction(data);
    });
  };

  const searchCelebrity = async (
    value: string,
    type: (typeof CELEBRITY_TYPES)[number]
  ): Promise<Option[]> => {
    return getCelebritiesApi({
      limit: "30",
      page: "1",
      name: value,
      role: type,
    })
      .then((res) => {
        console.log("res", res);
        return res.data.results.map((each) => {
          return {
            label: each.name,
            value: each._id,
          };
        });
      })
      .catch(() => {
        return [];
      });
  };

  const actorOptions = movieActorList.map((each) => {
    return {
      label: each.name,
      value: each._id,
    };
  });
  const producerOptions = movieProducerList.map((each) => {
    return {
      label: each.name,
      value: each._id,
    };
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
                      <Input placeholder={`Name of the Movie`} {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter Plot of the movie`}
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
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Provide movie poster`}
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
                name="actor_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Actors
                      <AddCelebrityDialog type={CELEBRITY_TYPES[0]} />
                    </FormLabel>

                    <MultipleSelector
                      loadingIndicator={
                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                          loading...
                        </p>
                      }
                      onSearch={async (value) => {
                        const res = await searchCelebrity(
                          value,
                          CELEBRITY_TYPES[0]
                        );
                        return res;
                      }}
                      value={actorOptions}
                      onChange={(options: Option[]) => {
                        field.onChange(options.map((option) => option.value));
                      }}
                      placeholder="Select actors"
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
                name="producer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Producer
                      {!field.value && (
                        <AddCelebrityDialog type={CELEBRITY_TYPES[1]} />
                      )}
                    </FormLabel>

                    <MultipleSelector
                      loadingIndicator={
                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                          loading...
                        </p>
                      }
                      value={producerOptions}
                      onSearch={async (value) => {
                        const res = await searchCelebrity(
                          value,
                          CELEBRITY_TYPES[1]
                        );
                        return res;
                      }}
                      onChange={(options: Option[]) => {
                        const optionValue = options.map(
                          (option) => option.value
                        );
                        const optionString =
                          optionValue.length > 0 ? optionValue[0] : "";

                        field.onChange(optionString);
                      }}
                      placeholder="Select Producer"
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
                name="year_of_release"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release year</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter released year`} {...field} />
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
                    <FormLabel>Images Url</FormLabel>
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
                type="submit"
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

export default EditMovieForm;
