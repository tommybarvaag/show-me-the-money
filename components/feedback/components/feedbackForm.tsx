import { Button, Fieldset, Flex, Form, Svg, Text, TextArea, TextField } from "@/components/ui";
import * as React from "react";
import { useForm } from "react-hook-form";
import { IoCheckmark, IoChevronForward, IoSyncOutline } from "react-icons/io5";
import FeedbackEmojiSelector from "./feedbackEmojiSelector";

type FeedbackFormProps = {
  compact?: boolean;
};

const FeedbackForm = ({ compact = false }: FeedbackFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      message: "",
      reaction: 0
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    await fetch("/api/user/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    setIsSubmitting(false);
    setIsCompleted(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <TextArea
          id="message"
          label="Your feedback"
          error={errors.message !== undefined}
          helperText="The field is required"
          {...register("message", {
            required: true
          })}
        />
      </Fieldset>
      <Fieldset>
        <TextField id="reaction" label="Reaction" type="hidden" {...register("reaction")} />
      </Fieldset>
      <Flex
        justifyContent="between"
        css={{
          flexDirection: "column",
          gap: "$4",
          "@bp1": {
            flexDirection: compact ? "column" : "row"
          }
        }}
      >
        <FeedbackEmojiSelector onSelected={value => setValue("reaction", value)} />
        <Button type="submit" disabled={isSubmitting || isCompleted}>
          <Text>{isSubmitting ? "Sender..." : isCompleted ? "Sendt" : "Send inn"}</Text>
          <Svg
            as={isSubmitting ? IoSyncOutline : isCompleted ? IoCheckmark : IoChevronForward}
            size="2"
            css={{
              ml: "$2"
            }}
            spin={isSubmitting}
          />
        </Button>
      </Flex>
    </Form>
  );
};

export default FeedbackForm;
